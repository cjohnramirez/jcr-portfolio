/**
 * Renders the portrait as ASCII into lib/ascii-art.ts.
 *
 * Generated once and committed, like the image manifest, so the page ships
 * plain text rather than doing image work in the browser. To use art made in
 * another tool (ascii-magic.com exports plain text), paste it into the
 * generated file's `portrait` lines instead.
 *
 *   node scripts/build-ascii.mjs
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "public/portfolio/profile-image.png");
const OUTPUT = path.join(ROOT, "lib/ascii-art.ts");

const COLS = 64;
// Dark to light. Dense glyphs carry the dark pixels on the paper ground.
const RAMP = " .,:;-=+*#%@";
// Monospace cells are about twice as tall as they are wide.
const CELL_ASPECT = 0.5;

const meta = await sharp(SOURCE).metadata();
const crop = {
  left: Math.round(meta.width * 0.22),
  top: Math.round(meta.height * 0.12),
  width: Math.round(meta.width * 0.56),
  height: Math.round(meta.height * 0.7),
};
const rows = Math.round((COLS * crop.height * CELL_ASPECT) / crop.width);

const { data } = await sharp(SOURCE)
  .extract(crop)
  .grayscale()
  .linear(1.6, -60)
  .blur(0.6)
  .resize(COLS, rows, { fit: "fill" })
  .raw()
  .toBuffer({ resolveWithObject: true });

const lines = [];
for (let y = 0; y < rows; y += 1) {
  let line = "";
  for (let x = 0; x < COLS; x += 1) {
    const value = data[y * COLS + x] / 255;
    line += RAMP[Math.min(RAMP.length - 1, Math.floor((1 - value) * RAMP.length))];
  }
  lines.push(line.replace(/\s+$/, ""));
}

await writeFile(
  OUTPUT,
  `// GENERATED FILE — do not edit by hand, except to paste replacement art.
// Regenerate with: node scripts/build-ascii.mjs

/** Character ramp, dark to light, used for the scramble glyphs too. */
export const ASCII_RAMP = ${JSON.stringify(RAMP)};

export const portrait: string[] = ${JSON.stringify(lines, null, 2)};
`,
  "utf8",
);

console.log(`ascii: ${COLS}x${rows} -> lib/ascii-art.ts`);
