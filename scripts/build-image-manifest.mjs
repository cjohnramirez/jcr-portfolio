/**
 * Generates lib/image-manifest.ts from the files in public/portfolio.
 *
 * One artifact solves three problems at once:
 *
 *   1. Intrinsic dimensions, so every image can declare width/height and
 *      reserve its box. Without this, CLS is unavoidable.
 *   2. A base64 LQIP for `placeholder="blur"`, so something meaningful paints
 *      immediately instead of an empty frame.
 *   3. It works identically on the Cloudinary path and the local /public
 *      fallback, because it is keyed by public id.
 *
 * Committed to git, so builds need neither network nor sharp.
 *
 *   node scripts/build-image-manifest.mjs            # write the manifest
 *   node scripts/build-image-manifest.mjs --compress # also re-encode sources
 */

import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Do not hold decoded images (or their file handles) between operations.
sharp.cache(false);

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const SOURCE_DIR = path.join(PUBLIC_DIR, "portfolio");
const OUTPUT = path.join(ROOT, "lib", "image-manifest.ts");

const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const COMPRESS = process.argv.includes("--compress");

/** Re-encode anything above this; below it the win is not worth the quality. */
const COMPRESS_THRESHOLD_BYTES = 500 * 1024;
const MAX_EDGE = 2400;
const QUALITY = 80;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function compress(file) {
  const before = (await stat(file)).size;
  if (before <= COMPRESS_THRESHOLD_BYTES) return { before, after: before };

  const ext = path.extname(file).toLowerCase();
  // Read into a buffer first. Passing the path keeps sharp's handle open, and
  // Windows then refuses the write-back to that same path with EUNKNOWN.
  const input = await readFile(file);
  const pipeline = sharp(input, { failOn: "none" }).resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  });

  const buffer =
    ext === ".png"
      ? await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toBuffer()
      : await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();

  // Only keep the re-encode if it actually helped.
  if (buffer.byteLength < before) {
    await writeFile(file, buffer);
    return { before, after: buffer.byteLength };
  }
  return { before, after: before };
}

async function describe(file) {
  const buffer = await readFile(file);
  const image = sharp(buffer, { failOn: "none" });
  const { width, height } = await image.metadata();

  // 16px wide is enough to read as colour and mass once blurred, and keeps the
  // data URI small enough that inlining it costs less than a request would.
  const lqip = await sharp(buffer, { failOn: "none" })
    .resize(16, null, { fit: "inside" })
    .webp({ quality: 30 })
    .toBuffer();

  return {
    width: width ?? 0,
    height: height ?? 0,
    blurDataURL: `data:image/webp;base64,${lqip.toString("base64")}`,
  };
}

function toPublicId(file) {
  return path.relative(PUBLIC_DIR, file).split(path.sep).join("/");
}

const entries = [];
let savedBefore = 0;
let savedAfter = 0;

for await (const file of walk(SOURCE_DIR)) {
  if (!RASTER.has(path.extname(file).toLowerCase())) continue;

  if (COMPRESS) {
    const { before, after } = await compress(file);
    savedBefore += before;
    savedAfter += after;
  }

  entries.push([toPublicId(file), await describe(file)]);
}

entries.sort(([a], [b]) => a.localeCompare(b));

const body = entries
  .map(
    ([id, meta]) =>
      `  ${JSON.stringify(id)}: {\n` +
      `    width: ${meta.width},\n` +
      `    height: ${meta.height},\n` +
      `    blurDataURL:\n      ${JSON.stringify(meta.blurDataURL)},\n` +
      `  },`,
  )
  .join("\n");

const hash = createHash("sha1")
  .update(entries.map(([id]) => id).join("|"))
  .digest("hex")
  .slice(0, 8);

await writeFile(
  OUTPUT,
  `// GENERATED FILE — do not edit by hand.
// Regenerate with: node scripts/build-image-manifest.mjs
// Source: public/portfolio (${entries.length} images, set ${hash})

export type ImageMeta = {
  width: number;
  height: number;
  /** Tiny inline WebP used as placeholder="blur". */
  blurDataURL: string;
};

export const imageManifest: Record<string, ImageMeta> = {
${body}
};

/**
 * Looks up metadata by Cloudinary public id or /public path. Both forms appear
 * in lib/portfolio-data.ts depending on whether the asset goes through the CDN.
 */
export function getImageMeta(src: string): ImageMeta | undefined {
  const key = src.replace(/^\\/?(cloudinary\\/)?/, "");
  return imageManifest[key];
}
`,
  "utf8",
);

const mb = (n) => `${(n / 1_048_576).toFixed(2)} MB`;
console.log(`manifest: ${entries.length} images -> lib/image-manifest.ts`);
if (COMPRESS) {
  console.log(
    `compressed: ${mb(savedBefore)} -> ${mb(savedAfter)} ` +
      `(saved ${mb(savedBefore - savedAfter)})`,
  );
}
