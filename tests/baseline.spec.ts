import { expect, test } from "@playwright/test";
import {
  formatMB,
  scrollThroughPage,
  settle,
  trackImages,
  waitForImagesDecoded,
} from "./helpers/network";

/**
 * Guards behaviour that must hold throughout the redesign, and records image
 * weight so Step 8's improvement can be proven rather than asserted.
 *
 * Two assertions were retired when Step 2 landed, deliberately:
 *
 *  - "every section anchor the nav points at exists" — the single page was
 *    split into 13 routes, so `#about`, `#services`, and the rest no longer
 *    live on `/`. The replacement is the route coverage in redesign.spec.ts.
 *  - "known defect: no navigation is reachable at 375px" — fixed in Step 2.
 *    The positive assertion now lives in redesign.spec.ts.
 *
 * Note: no .env.local is present, so images resolve through the local
 * /public fallback rather than Cloudinary. That is the heavier path.
 */

const ROUTES = [
  "/",
  "/work/trailventure",
  "/work/steady",
  "/work/fresco-grow-lab",
  "/work/agriova",
  "/designs/kingmaker",
  "/designs/barangai",
];

/** The index routes that became sections of the one-page home. */
const RETIRED = [
  ["/about", "about"],
  ["/work", "work"],
  ["/designs", "brand"],
  ["/archive", "experience"],
  ["/contact", "contact"],
] as const;

test.describe("baseline — structural guarantees", () => {
  for (const path of ROUTES) {
    test(`${path} responds 200 with exactly one h1`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }

  test("the primary navigation links to every section from any route", async ({
    page,
  }) => {
    await page.goto("/work/steady");

    // Deliberately a DOM locator, not getByRole: one nav is desktop-only and
    // the other mobile-only, so at any viewport one of them is display:none
    // and therefore absent from the accessibility tree. Whether the *visible*
    // nav is usable is asserted in redesign.spec.ts.
    for (const href of ["/#work", "/#brand", "/#about", "/#contact"]) {
      await expect(
        page.locator(`a[href="${href}"]`).first(),
        `no navigation link to ${href}`,
      ).toBeAttached();
    }
  });

  test("records image weight per route", async ({ page }, testInfo) => {
    // Walks three routes, each with a full scroll and image-decode wait.
    // That is legitimately slower than the 30s default, especially at 375px
    // where the stacked layout is several viewports tall.
    test.setTimeout(120_000);

    const rows: string[] = [];

    for (const path of ["/", "/work/steady", "/designs/xplore"]) {
      const tally = trackImages(page);
      await page.goto(path, { waitUntil: "load" });
      await waitForImagesDecoded(page);
      await settle(tally);
      const initial = tally.totalBytes;

      await scrollThroughPage(page);
      await settle(tally);

      const oversized = tally.requests.filter(
        (r) => r.requestedWidth !== null && r.requestedWidth >= 1920,
      ).length;

      rows.push(
        `${path.padEnd(20)} initial ${formatMB(initial).padStart(8)} · ` +
          `scrolled ${formatMB(tally.totalBytes).padStart(8)} · ` +
          `${tally.count} imgs · ${oversized} at >=1920px`,
      );
    }

    const summary = [`viewport ${testInfo.project.name}`, ...rows].join("\n");
    await testInfo.attach("image-weight", {
      body: summary,
      contentType: "text/plain",
    });
    console.log(`\n[image weight]\n${summary}\n`);

    expect(rows).toHaveLength(3);
  });
});

test.describe("one-page home", () => {
  for (const [path, section] of RETIRED) {
    test(`${path} redirects to the ${section} section`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(new RegExp(`/#${section}$`));
      await expect(page.locator(`#${section}`)).toBeAttached();
    });
  }

  test("every section the navigation points at exists, numbered 01 to 06", async ({
    page,
  }) => {
    await page.goto("/");
    const ids = ["work", "brand", "services", "experience", "about", "contact"];
    for (const [index, id] of ids.entries()) {
      const section = page.locator(`section#${id}`);
      await expect(section).toBeAttached();
      await expect(section.locator("p > span").first()).toHaveText(
        String(index + 1).padStart(2, "0"),
      );
      await expect(section.locator("h2").first()).not.toBeEmpty();
    }
  });

  test("the header marks the section in view as current", async ({ page }) => {
    test.skip(test.info().project.name !== "desktop", "desktop nav only");
    await page.goto("/");
    await page.locator('nav[aria-label="Primary"] a[href="/#brand"]').click();
    await expect(
      page.locator('nav[aria-label="Primary"] a[href="/#brand"]'),
    ).toHaveAttribute("aria-current", "location");
  });

  test("the home page shows four projects and all four identity systems", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator('#work a[href^="/work/"]')).toHaveCount(4);
    for (const slug of ["kingmaker", "xplore", "al-bab", "snap-engineering"]) {
      await expect(page.locator(`#brand a[href="/designs/${slug}"]`)).toHaveCount(1);
    }
    await expect(page.locator('#brand a[href="/work/enduro-branding"]')).toHaveCount(1);
  });

  test("brand tabs work from the keyboard", async ({ page }) => {
    await page.goto("/");
    const brand = page.locator("#brand");
    const panel = brand.locator('[role="tabpanel"]:not([hidden])');

    await expect(brand.getByRole("tab", { name: /identity/i })).toHaveAttribute("aria-selected", "true");
    await expect(panel.locator("li")).toHaveCount(5);

    await brand.getByRole("tab", { name: /identity/i }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(brand.getByRole("tab", { name: /motion/i })).toBeFocused();
    await expect(brand.getByRole("tab", { name: /motion/i })).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("End");
    await expect(brand.getByRole("tab", { name: /interface/i })).toHaveAttribute("aria-selected", "true");

    await brand.getByRole("tab", { name: /motion/i }).click();
    await expect(panel.locator("li")).toHaveCount(6);
  });

  test("no video downloads until a motion piece is opened", async ({ page }) => {
    const videos: string[] = [];
    page.on("request", (request) => {
      if (/\.(mp4|webm)(\?|$)/.test(request.url())) videos.push(request.url());
    });
    await page.goto("/", { waitUntil: "load" });
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(500);
    expect(videos).toEqual([]);
    await expect(page.locator("video")).toHaveCount(0);
  });

  test("a motion dialog opens, closes on Escape and returns focus", async ({ page }) => {
    await page.goto("/");
    await page.locator("#brand").getByRole("tab", { name: /motion/i }).click();
    const card = page.getByRole("button", { name: /play wildflower/i });
    await card.click();
    const dialog = page.getByRole("dialog", { name: "Wildflower" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(card).toBeFocused();
  });

  test("no visible copy uses an em dash or an unfinished placeholder", async ({ page }) => {
    // Four full page loads; the default 30s is tight when the suite runs in parallel.
    test.setTimeout(60_000);
    for (const path of ["/", "/designs/barangai", "/designs/pronote", "/designs/cs-website"]) {
      await page.goto(path);
      const text = await page.locator("body").innerText();
      expect(text, path).not.toContain("\u2014");
      expect(text, path).not.toMatch(/\bTODO\b/);
    }
  });
});

test.describe("detail pages", () => {
  const ALL = [
    "/work/trailventure",
    "/work/steady",
    "/work/fresco-grow-lab",
    "/work/agriova",
    "/work/road-restoration",
    "/work/enduro-branding",
    "/designs/kingmaker",
    "/designs/xplore",
    "/designs/al-bab",
    "/designs/snap-engineering",
    "/designs/barangai",
    "/designs/pronote",
    "/designs/cs-website",
  ];

  test("every detail page links to the next one", async ({ page }) => {
    test.setTimeout(90_000);
    for (const path of ALL) {
      await page.goto(path);
      const next = page.locator("main").getByRole("link", { name: /^next/i }).first();
      await expect(next, path).toBeVisible();
      const href = await next.getAttribute("href");
      expect(href, path).toMatch(/^\/(work|designs)\//);
      expect(href, path).not.toBe(path);
    }
  });

  test("the website split fills one viewport and only the frame scrolls", async ({ page }) => {
    test.skip(test.info().project.name !== "desktop", "desktop layout");
    await page.goto("/work/trailventure");
    const section = page.locator("main section").first();
    const box = await section.boundingBox();
    const viewport = page.viewportSize();
    expect(Math.round(box?.height ?? 0)).toBe((viewport?.height ?? 0) - 88);

    const frame = page.getByRole("region", { name: /scroll to see the full page/i });
    await frame.focus();
    await page.keyboard.press("PageDown");
    await expect.poll(() => frame.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
  });

  test("technical notes open, close on Escape and return focus", async ({ page }) => {
    test.skip(test.info().project.name !== "desktop", "dialog on desktop, accordion on mobile");
    await page.goto("/work/steady");
    const button = page.getByRole("button", { name: /technical notes/i }).first();
    await button.click();
    const dialog = page.getByRole("dialog", { name: "Steady" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Confidentiality")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(button).toBeFocused();
  });

  test("website pages stack without horizontal scroll on phones", async ({ page }) => {
    test.skip(test.info().project.name !== "mobile", "mobile layout");
    for (const path of ["/work/trailventure", "/designs/cs-website"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
      await expect(page.getByRole("region", { name: /scroll to see the full page/i })).toBeVisible();
    }
  });
});
