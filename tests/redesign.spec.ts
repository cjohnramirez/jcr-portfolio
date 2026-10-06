import { expect, test } from "@playwright/test";
import {
  formatMB,
  scrollThroughPage,
  settle,
  trackImages,
  waitForImagesDecoded,
} from "./helpers/network";

/**
 * The target specification for "The Manual" redesign.
 *
 * Every test here is expected to FAIL until the corresponding step lands —
 * that is the point. This file is the contract; the implementation chases it.
 * Run with `pnpm test:redesign`. It is excluded from `pnpm test` so the
 * default run stays green and meaningful.
 *
 * See C:\Users\JOHN CARL RAMIREZ\.claude\plans\enumerated-imagining-pnueli.md
 */

const ROUTES = [
  { path: "/", plate: "Home" },
  { path: "/work/trailventure", plate: "01.1" },
  { path: "/work/steady", plate: "01.2" },
  { path: "/work/fresco-grow-lab", plate: "01.3" },
  { path: "/work/agriova", plate: "01.4" },
  { path: "/work/road-restoration", plate: "01.5" },
  { path: "/work/enduro-branding", plate: "01.6" },
  { path: "/designs/snap-engineering", plate: "02.1" },
  { path: "/designs/xplore", plate: "02.2" },
  { path: "/designs/al-bab", plate: "02.3" },
  { path: "/designs/kingmaker", plate: "02.4" },
  { path: "/designs/barangai", plate: "02.5" },
  { path: "/designs/pronote", plate: "02.6" },
  { path: "/designs/cs-website", plate: "02.7" },
] as const;

test.describe("@redesign routes", () => {
  for (const { path } of ROUTES) {
    test(`${path} renders`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }

  test("an unknown work slug renders the not-found plate", async ({ page }) => {
    const response = await page.goto("/work/does-not-exist");
    expect(response?.status()).toBe(404);
  });
});

test.describe("@redesign navigation", () => {
  test("navigation is operable at 375px", async ({ page }) => {
    test.skip(test.info().project.name !== "mobile", "mobile-only");
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /menu|navigation/i });
    await expect(toggle).toBeVisible();
    await toggle.click();

    const nav = page.getByRole("navigation", { name: "Primary mobile" });
    await expect(nav.locator('a[href="/#work"]')).toBeVisible();
  });

  test("a skip link is the first thing keyboard focus reaches", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    await expect(page.locator(":focus")).toHaveText(/skip to (main )?content/i);
  });

  test("every focused control shows a visible focus ring", async ({ page }) => {
    await page.goto("/");

    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press("Tab");
      const outline = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const s = getComputedStyle(el);
        return {
          outlineWidth: s.outlineWidth,
          outlineStyle: s.outlineStyle,
          boxShadow: s.boxShadow,
        };
      });
      if (!outline) continue;

      const hasRing =
        (outline.outlineStyle !== "none" &&
          parseFloat(outline.outlineWidth) > 0) ||
        outline.boxShadow !== "none";
      expect(hasRing, "focused element has no visible focus indicator").toBe(
        true,
      );
    }
  });
});

test.describe("@redesign theming", () => {
  test("light is the default and paints the ground token", async ({ page }) => {
    await page.goto("/");

    const theme = await page.evaluate(
      () => document.documentElement.dataset.theme,
    );
    expect(theme).toBe("light");

    const ground = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--ground")
        .trim(),
    );
    expect(ground.toLowerCase()).toBe("#e7e5e0");
  });

  test("color-scheme is declared so native controls follow the theme", async ({
    page,
  }) => {
    await page.goto("/");
    const scheme = await page.evaluate(() =>
      getComputedStyle(document.documentElement).colorScheme,
    );
    expect(scheme).toContain("light");
  });

  test("secondary text clears 4.5:1 against the plate", async ({ page }) => {
    await page.goto("/");

    const ratio = await page.evaluate(() => {
      const read = (name: string) =>
        getComputedStyle(document.documentElement)
          .getPropertyValue(name)
          .trim();

      const luminance = (hex: string) => {
        const v = hex.replace("#", "");
        const channels = [0, 2, 4].map((i) => {
          const c = parseInt(v.slice(i, i + 2), 16) / 255;
          return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
      };

      const a = luminance(read("--ink-2"));
      const b = luminance(read("--plate"));
      const [hi, lo] = a > b ? [a, b] : [b, a];
      return (hi + 0.05) / (lo + 0.05);
    });

    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});

test.describe("@redesign motion", () => {
  test("reduced motion suppresses every transition and animation", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const moving = await page.evaluate(() =>
      [...document.querySelectorAll("*")].filter((el) => {
        const s = getComputedStyle(el);
        const dur = (v: string) =>
          v.split(",").some((d) => parseFloat(d) > 0.01);
        return dur(s.transitionDuration) || dur(s.animationDuration);
      }).length,
    );

    expect(moving, "elements still animating under prefers-reduced-motion").toBe(
      0,
    );
  });

  test("reduced motion leaves no element mid-animation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    // Scroll first. Entry animation is `whileInView`, so anything below the
    // fold legitimately starts hidden regardless of motion preference — the
    // question is whether it resolves, and whether it moves while doing so.
    await scrollThroughPage(page);

    // Framer writes animation state to INLINE styles, so that is what to look
    // at. Computed styles would also flag things that are not animation:
    // CloudinaryImage's `opacity-0`-until-decoded class, and Tailwind's
    // `-translate-y-1/2` used for layout.
    //
    // Only elements with a layout box count. A Reveal inside a `hidden`
    // container has no box at this viewport, so IntersectionObserver never
    // fires and it stays at its initial state forever — correctly invisible,
    // but not a reduced-motion violation.
    const collect = () =>
      page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("[style]")]
          .filter((el) => {
            const box = el.getBoundingClientRect();
            if (box.width === 0 && box.height === 0) return false;

            const inline = el.getAttribute("style") ?? "";
            const faded = parseFloat(el.style.opacity || "1") < 1;
            // reducedMotion="user" suppresses transform animation but keeps
            // opacity fades, which are vestibular-safe. A leftover transform
            // is the real violation.
            const moved =
              /transform:/.test(inline) && !/transform:\s*none/.test(inline);
            return faded || moved;
          })
          .slice(0, 8)
          .map(
            (el) =>
              `${el.tagName.toLowerCase()} — ${el.getAttribute("style")} — "${(el.textContent ?? "").trim().slice(0, 30)}"`,
          ),
      );

    // Reveals fire on intersection, which is async; give the last batch a
    // chance to settle rather than sampling one frame after the scroll.
    let stuck = await collect();
    for (let attempt = 0; attempt < 10 && stuck.length > 0; attempt += 1) {
      // Under parallel load a fast scroll pass can step over an element's
      // trigger band. Bring anything still hidden into view, which is what a
      // reader's own scrolling does, then check that it resolves.
      await page.evaluate(() => {
        const hidden = [...document.querySelectorAll<HTMLElement>("[style]")].find(
          (el) => parseFloat(el.style.opacity || "1") < 1 && el.getBoundingClientRect().height > 0,
        );
        hidden?.scrollIntoView({ block: "center" });
      });
      await page.waitForTimeout(300);
      stuck = await collect();
    }

    expect(stuck, "elements left mid-animation under reduced motion").toEqual([]);
  });

  test("entry animation is actually wired up when motion is allowed", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");

    // Guards against the opposite failure: Reveal silently degrading to a
    // plain div for everyone, which would make the reduced-motion test above
    // pass vacuously. Checks inline styles for the same reason — an image
    // still decoding would otherwise satisfy this without Framer doing a thing.
    const pending = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("[style]")].filter((el) => {
        const inline = el.getAttribute("style") ?? "";
        return /opacity:/.test(inline) || /transform:/.test(inline);
      }).length,
    );

    expect(pending, "Framer is not driving any element").toBeGreaterThan(0);
  });

  test("nothing animates every property at once", async ({ page }) => {
    await page.goto("/");

    // `transition-property: all` is the CSS *initial* value, so every element
    // reports it — including <head> and <meta>. The guideline's actual concern
    // is `all` paired with a real duration, which animates properties nobody
    // intended. Names offenders rather than counting them.
    const offenders = await page.evaluate(() =>
      [...document.querySelectorAll("*")]
        .filter((el) => {
          const s = getComputedStyle(el);
          const animatesAll = s.transitionProperty
            .split(",")
            .some((p) => p.trim() === "all");
          const hasDuration = s.transitionDuration
            .split(",")
            .some((d) => parseFloat(d) > 0);
          return animatesAll && hasDuration;
        })
        .slice(0, 10)
        .map((el) => {
          const cls =
            typeof el.className === "string" ? el.className.slice(0, 80) : "";
          return `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${cls ? `.${cls}` : ""}`;
        }),
    );

    expect(offenders).toEqual([]);
  });
});

test.describe("@redesign image budget", () => {
  test("the cover route stays under 1.5 MB of imagery on first paint", async ({
    page,
  }) => {
    const tally = trackImages(page);
    await page.goto("/", { waitUntil: "load" });
    await waitForImagesDecoded(page);
    await settle(tally);

    console.log(`[/] initial images: ${tally.count} · ${formatMB(tally.totalBytes)}`);
    expect(tally.totalBytes).toBeLessThan(1.5 * 1_048_576);
  });

  test("no route requests an image variant wider than it renders", async ({
    page,
  }) => {
    test.setTimeout(60_000);

    const tally = trackImages(page);
    await page.goto("/work/steady", { waitUntil: "load" });
    await waitForImagesDecoded(page);
    await scrollThroughPage(page);
    await settle(tally);

    const viewport = page.viewportSize()?.width ?? 1440;
    // Allow 2x for retina; anything beyond that is a `sizes` mistake.
    const ceiling = viewport * 2;

    const oversized = tally.requests.filter(
      (r) => r.requestedWidth !== null && r.requestedWidth > ceiling,
    );

    expect(
      oversized.map((r) => `${r.requestedWidth}px — ${r.url}`),
      "images requested wider than 2x the viewport",
    ).toEqual([]);
  });

  test("layout does not shift while images load", async ({ page }) => {
    // The guideline says images need explicit width/height, but its actual
    // concern is cumulative layout shift. These images use next/image `fill`
    // inside boxes with a fixed aspect ratio, which reserves space just as
    // well — so measure the thing that matters rather than the attribute.
    await page.goto("/work/steady", { waitUntil: "commit" });

    await page.evaluate(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & {
            value: number;
            hadRecentInput: boolean;
          };
          if (!shift.hadRecentInput) {
            (window as unknown as { __cls: number }).__cls += shift.value;
          }
        }
      }).observe({ type: "layout-shift", buffered: true });
    });

    // The observer has to attach at "commit", before anything can shift — but
    // that is earlier than document.body exists, so wait for the DOM before
    // driving the page.
    await page.waitForLoadState("domcontentloaded");
    await scrollThroughPage(page);

    const cls = await page.evaluate(
      () => (window as unknown as { __cls: number }).__cls,
    );

    console.log(`[cls] /work/steady: ${cls.toFixed(4)}`);
    expect(cls, "cumulative layout shift").toBeLessThan(0.1);
  });

  test("the next carousel sheet is already loaded before it is shown", async ({
    page,
  }) => {
    await page.goto("/work/steady", { waitUntil: "load" });
    await waitForImagesDecoded(page);

    // The component preloads one sheet ahead, so advancing still triggers a
    // request — for the sheet AFTER the one now displayed. The property that
    // matters to a visitor is that the sheet they just revealed already has
    // pixels, with no loading gap.
    await page.getByRole("button", { name: "Next sheet" }).click();

    const paintedImmediately = await page.evaluate(() => {
      const visible = [...document.querySelectorAll("img")].filter((img) => {
        const box = img.getBoundingClientRect();
        return box.width > 200 && getComputedStyle(img).opacity !== "0";
      });
      return visible.length > 0 && visible.every((img) => img.complete);
    });

    expect(
      paintedImmediately,
      "the revealed sheet was not already decoded",
    ).toBe(true);
  });
});

/**
 * The carousel frame is shaped by the sheet inside it, not the other way round.
 *
 * It used to be a hardcoded `aspect-video` box. Every sheet was poured into
 * 16:9 regardless of its real proportions, and the brand decks — which are
 * 1.40:1 — lost 21% of the frame to empty pillar bars. On the *design* pages,
 * of all places.
 */
test.describe("@redesign carousel proportions", () => {
  // Chosen because their sheets disagree with 16:9: both carousels are
  // brand guideline decks rendered at 1.41.
  //
  // Steady used to be here too, back when its sheets were 1.94 / 1.58. Its
  // screenshots are now captured at one viewport, so all three are 1.60 and
  // the route no longer exercises the mismatch this block exists to catch.
  const MIXED_RATIO_ROUTES = [
    "/work/enduro-branding",
    "/designs/snap-engineering",
  ];

  async function readFrame(page: import("@playwright/test").Page) {
    return page.locator("[data-carousel-frame]").first().evaluate((el) => {
      const img = el.querySelector("img");
      if (!img) throw new Error("no image inside the carousel frame");
      const frame = el.getBoundingClientRect();
      const painted = img.getBoundingClientRect();
      return {
        frameRatio: frame.width / frame.height,
        naturalRatio: img.naturalWidth / img.naturalHeight,
        frameWidth: frame.width,
        paintedWidth: painted.width,
      };
    });
  }

  for (const path of MIXED_RATIO_ROUTES) {
    test(`${path} sizes its frame to the active sheet`, async ({ page }) => {
      await page.goto(path);
      await expect(
        page.locator("[data-carousel-frame]").first(),
        "the carousel frame needs a stable hook to measure",
      ).toBeAttached({ timeout: 5_000 });
      await waitForImagesDecoded(page);

      const { frameRatio, naturalRatio, frameWidth, paintedWidth } =
        await readFrame(page);

      // 0.05 is tighter than every mismatch this fixes — the smallest is
      // 1.94 vs 1.78 — and loose enough for sub-pixel rounding.
      expect(
        Math.abs(frameRatio - naturalRatio),
        `frame ${frameRatio.toFixed(3)} vs sheet ${naturalRatio.toFixed(3)}`,
      ).toBeLessThan(0.05);

      // The consequence a visitor actually sees: no bars either side.
      expect(paintedWidth).toBeCloseTo(frameWidth, 0);
    });
  }

  // Road Restoration steps from a 1.78 map to a 2.04 paper figure. The deck
  // carousels cannot exercise this: every page of a deck shares one ratio.
  test("the frame reshapes when the sheet changes", async ({ page }) => {
    await page.goto("/work/road-restoration");
    await expect(page.locator("[data-carousel-frame]").first()).toBeAttached({
      timeout: 5_000,
    });
    await waitForImagesDecoded(page);

    const before = await readFrame(page);
    await page.getByRole("button", { name: "Next sheet" }).first().click();
    await waitForImagesDecoded(page);
    // The height transition has to land before the box is worth measuring.
    await page.waitForTimeout(700);
    const after = await readFrame(page);

    expect(
      Math.abs(after.frameRatio - before.frameRatio),
      "the frame kept the previous sheet's proportions",
    ).toBeGreaterThan(0.1);
    expect(Math.abs(after.frameRatio - after.naturalRatio)).toBeLessThan(0.05);
  });
});
