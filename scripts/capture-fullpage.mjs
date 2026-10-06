/**
 * Captures each live project's home page top to bottom and slices it for the
 * website split view on the detail pages.
 *
 * One very tall image hits browser and GPU texture limits and blocks first
 * paint, so the capture is cut into slices of at most SLICE px that stack
 * seamlessly and lazy-load one after another.
 *
 *   node scripts/capture-fullpage.mjs            # all sites
 *   node scripts/capture-fullpage.mjs steady     # one site
 *
 * Also slices the two designed pages that only exist as tall images.
 */

import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public/portfolio");
const WIDTH = 1440;
const SLICE = 2400;

const LIVE = {
  trailventure: { url: "https://trailventure.jcrdev.me", out: "projects/trailventure/fullpage" },
  steady: { url: "https://steady-system.jcrdev.me", out: "projects/steady/fullpage" },
  "fresco-grow-lab": { url: "https://fresco-grow-lab.jcrdev.me", out: "projects/fresco-grow-lab/fullpage" },
};

const STATIC = {
  "cs-website": { src: "designs/cs-website/cs-website-full.webp", out: "designs/cs-website/fullpage" },
  barangai: { src: "designs/barangai/barangai-wireframe.webp", out: "designs/barangai/fullpage" },
};

async function slice(buffer, outDir, name) {
  const dir = path.join(PUBLIC, outDir);
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });

  const image = sharp(buffer, { failOn: "none", limitInputPixels: false });
  const { width, height } = await image.metadata();
  const scale = Math.min(1, WIDTH / width);
  const resized = await sharp(buffer, { limitInputPixels: false })
    .resize(Math.round(width * scale))
    .toBuffer();
  const h = Math.round(height * scale);

  const files = [];
  for (let top = 0, index = 1; top < h; top += SLICE, index += 1) {
    const file = path.join(dir, `${name}-${String(index).padStart(2, "0")}.webp`);
    await sharp(resized, { limitInputPixels: false })
      .extract({ left: 0, top, width: Math.round(width * scale), height: Math.min(SLICE, h - top) })
      .webp({ quality: 80 })
      .toFile(file);
    files.push(path.relative(PUBLIC, file));
  }
  console.log(`${name}: ${files.length} slices, ${h}px tall`);
}

async function scrollToEnd(page) {
  // Reveal-on-scroll content and lazy images only render once seen.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 800));
  });
}

const only = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: WIDTH, height: 900 }, colorScheme: "light" });

for (const [name, site] of Object.entries(LIVE)) {
  if (only && only !== name) continue;
  await page.goto(site.url, { waitUntil: "networkidle", timeout: 60_000 });
  await scrollToEnd(page);
  const buffer = await page.screenshot({ fullPage: true, type: "png" });
  await slice(buffer, site.out, name);
}
await browser.close();

for (const [name, item] of Object.entries(STATIC)) {
  if (only && only !== name) continue;
  const source = path.join(PUBLIC, item.src);
  await slice(await sharp(source).toBuffer(), item.out, name);
}

console.log((await readdir(path.join(PUBLIC, "projects/trailventure/fullpage")).catch(() => [])).join(", "));
