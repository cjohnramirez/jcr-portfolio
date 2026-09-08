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
  "/about",
  "/work",
  "/work/gcs-system",
  "/designs",
  "/designs/kingmaker",
  "/archive",
  "/contact",
];

test.describe("baseline — structural guarantees", () => {
  for (const path of ROUTES) {
    test(`${path} responds 200 with exactly one h1`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }

  test("the primary navigation links to every plate from any route", async ({
    page,
  }) => {
    await page.goto("/archive");

    // Deliberately a DOM locator, not getByRole: one nav is desktop-only and
    // the other mobile-only, so at any viewport one of them is display:none
    // and therefore absent from the accessibility tree. Whether the *visible*
    // nav is usable is asserted in redesign.spec.ts.
    for (const href of ["/about", "/work", "/designs", "/archive", "/contact"]) {
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

    for (const path of ["/", "/work/gcs-system", "/archive"]) {
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
