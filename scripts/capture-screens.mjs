/**
 * Captures each carousel screen of the live projects at full length, from a
 * 1440×1080 window, so every screen is at least 1080px of real page and
 * scrolls in the website carousel instead of being cropped to fit.
 *
 * Signed-in screens use the seeded demo accounts on Steady, and John's own
 * account on TrailVenture, read from the environment so it never lands in the
 * repo. Screens behind a hardware dialog are not reachable this way and keep
 * their existing images.
 *
 *   node scripts/capture-screens.mjs           # all
 *   node scripts/capture-screens.mjs steady    # one project
 *
 *   TRAILVENTURE_EMAIL=… TRAILVENTURE_PASSWORD=… node scripts/capture-screens.mjs trailventure
 */

import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public/portfolio/projects");
const VIEWPORT = { width: 1440, height: 1080 };
const SLICE = 2400;
const STEADY = "https://steady-system.jcrdev.me";
const TRAILVENTURE = "https://trailventure.jcrdev.me";
const PASSWORD = "Password123!";

const steadyLogin = (role, email) => ({
  url: `${STEADY}/auth/login/${role}`,
  email: ["#email", email],
  password: ["#password", PASSWORD],
  submit: "Log in",
  done: (url) => !url.pathname.startsWith("/auth/"),
});

const trailventureLogin = {
  url: `${TRAILVENTURE}/login`,
  email: ["#login-email", process.env.TRAILVENTURE_EMAIL],
  password: ["#login-password", process.env.TRAILVENTURE_PASSWORD],
  submit: "Login",
  done: (url) => !url.pathname.startsWith("/login"),
};

// A start date two weeks out, so the review page always has a bookable date.
const start = new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10);

const JOBS = {
  trailventure: [
    { name: "search", url: `${TRAILVENTURE}/search?destination=palawan` },
    { name: "package", url: `${TRAILVENTURE}/package/palawan-island-paradise` },
    // The review page only previews the booking; nothing is created until checkout.
    {
      name: "booking",
      url: `${TRAILVENTURE}/booking/palawan-island-paradise?tier=5&guests=2&start=${start}`,
      login: trailventureLogin,
    },
    {
      name: "success",
      url: `${TRAILVENTURE}/booking/success/913bce4a-d9a2-4249-8e18-a7f0131333ab`,
      login: trailventureLogin,
    },
    { name: "account", url: `${TRAILVENTURE}/account`, login: trailventureLogin },
  ],
  steady: [
    { name: "portal", url: `${STEADY}/portal` },
    { name: "signup", url: `${STEADY}/auth/signup/student` },
    { name: "student", url: `${STEADY}/student`, login: steadyLogin("student", "student@steady.test") },
    { name: "admin-dashboard", url: `${STEADY}/admin/dashboard`, login: steadyLogin("admin", "admin@steady.test") },
    { name: "admin-accounts", url: `${STEADY}/admin/accounts`, login: steadyLogin("admin", "admin@steady.test") },
  ],
  // The sidebar is fixed and one window tall, so it is pinned to the page and
  // stretched to its full height first; otherwise it paints over the first
  // screen only and its footer floats partway down the capture.
  "fresco-grow-lab": [
    { name: "dashboard", url: "https://fresco-grow-lab.jcrdev.me/", stretch: ".fixed.h-svh" },
    { name: "monitor", url: "https://fresco-grow-lab.jcrdev.me/", click: "Monitor", stretch: ".fixed.h-svh" },
    { name: "analytics", url: "https://fresco-grow-lab.jcrdev.me/", click: "Analytics", stretch: ".fixed.h-svh" },
    { name: "docs", url: "https://fresco-grow-lab.jcrdev.me/", click: "Project Docs", stretch: ".fixed.h-svh" },
  ],
};

async function settle(page) {
  // Reveal-on-scroll content and lazy images only render once seen.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 900));
  });
}

async function save(buffer, slug, name) {
  const dir = path.join(PUBLIC, slug, "screens");
  await mkdir(dir, { recursive: true });
  const { width, height } = await sharp(buffer).metadata();
  let count = 0;
  for (let top = 0; top < height; top += SLICE) {
    count += 1;
    await sharp(buffer)
      .extract({ left: 0, top, width, height: Math.min(SLICE, height - top) })
      .webp({ quality: 80 })
      .toFile(path.join(dir, `${name}-${String(count).padStart(2, "0")}.webp`));
  }
  console.log(`${slug}/${name}: ${count} slice(s), ${height}px`);
}

const only = process.argv[2];
const browser = await chromium.launch();

for (const [slug, jobs] of Object.entries(JOBS)) {
  if (only && only !== slug) continue;
  await rm(path.join(PUBLIC, slug, "screens"), { recursive: true, force: true });
  let context = await browser.newContext({ viewport: VIEWPORT, colorScheme: "light" });
  let signedInAs = null;

  for (const job of jobs) {
    if (job.login && signedInAs !== job.login.email[1]) {
      if (!job.login.email[1] || !job.login.password[1]) throw new Error(`${slug}/${job.name}: missing login credentials`);
      await context.close();
      context = await browser.newContext({ viewport: VIEWPORT, colorScheme: "light" });
      const login = await context.newPage();
      await login.goto(job.login.url, { waitUntil: "networkidle" });
      await login.fill(...job.login.email);
      await login.fill(...job.login.password);
      await login.getByRole("button", { name: job.login.submit, exact: true }).click();
      await login.waitForURL(job.login.done, { timeout: 30_000 });
      await login.close();
      signedInAs = job.login.email[1];
    }

    const page = await context.newPage();
    await page.goto(job.url, { waitUntil: "networkidle", timeout: 60_000 });
    if (job.click) {
      await page.getByRole("button", { name: job.click, exact: true }).first().click();
      await page.waitForTimeout(2500);
    }
    await settle(page);
    if (job.stretch) {
      // A stylesheet rule rather than inline styles, which a re-render drops.
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      await page.addStyleTag({
        content: `${job.stretch} { position: absolute !important; height: ${height}px !important; }`,
      });
      await page.waitForTimeout(600);
    }
    await save(await page.screenshot({ fullPage: true, type: "png" }), slug, job.name);
    await page.close();
  }
  await context.close();
}

await browser.close();
