import type { Page, Response } from "@playwright/test";

export type ImageRequest = {
  url: string;
  bytes: number;
  /** The `w` transformation Next requested, when the URL carries one. */
  requestedWidth: number | null;
};

export type ImageTally = {
  requests: ImageRequest[];
  totalBytes: number;
  count: number;
};

function parseRequestedWidth(url: string): number | null {
  // Next's optimizer uses `/_next/image?url=…&w=1920`; the Cloudinary loader
  // in components/portfolio/shared/cloudinary-image.tsx uses `…,w_1920,…`.
  const nextParam = new URL(url, "http://127.0.0.1").searchParams.get("w");
  if (nextParam) return Number(nextParam);

  const cloudinary = url.match(/[,/]w_(\d+)[,/]/);
  return cloudinary ? Number(cloudinary[1]) : null;
}

async function responseBytes(response: Response): Promise<number> {
  const header = response.headers()["content-length"];
  if (header) return Number(header);
  try {
    return (await response.body()).byteLength;
  } catch {
    return 0; // Redirects and cached responses have no retrievable body.
  }
}

/**
 * Records every image the page downloads. Start this before navigating —
 * responses that land before the listener attaches are lost.
 */
export function trackImages(page: Page): ImageTally {
  const tally: ImageTally = { requests: [], totalBytes: 0, count: 0 };
  const pending: Promise<void>[] = [];

  page.on("response", (response) => {
    const type = response.request().resourceType();
    const contentType = response.headers()["content-type"] ?? "";
    if (type !== "image" && !contentType.startsWith("image/")) return;

    pending.push(
      responseBytes(response).then((bytes) => {
        tally.requests.push({
          url: response.url(),
          bytes,
          requestedWidth: parseRequestedWidth(response.url()),
        });
        tally.totalBytes += bytes;
        tally.count += 1;
      }),
    );
  });

  // Attached so callers can await in-flight body reads before asserting.
  Object.defineProperty(tally, "settle", {
    value: async () => {
      await Promise.all(pending);
    },
    enumerable: false,
  });

  return tally;
}

export async function settle(tally: ImageTally): Promise<void> {
  await (tally as unknown as { settle: () => Promise<void> }).settle();
}

export function formatMB(bytes: number): string {
  return `${(bytes / 1_048_576).toFixed(2)} MB`;
}

/**
 * Waits until every visible `<img>` actually has pixels.
 *
 * This replaces `networkidle` rather than supplementing it. `next/link`
 * prefetches routes as links enter the viewport, firing `?_rsc=` requests that
 * can keep a connection in flight indefinitely — at 375px on /work/gcs-system
 * the idle state never arrived at all and the test burned its whole timeout.
 * Playwright discourages networkidle for this reason. Decode state is the
 * thing the image assertions actually care about, and it is deterministic.
 *
 * `networkidle` alone was also insufficient because: Next's image optimizer can answer
 * after the idle window closes — especially with several workers queued
 * against one server — and decode finishes later still. Relying on idle made
 * the image assertions flaky under parallel load while passing in isolation.
 */
export async function waitForImagesDecoded(page: Page): Promise<void> {
  await page
    .waitForFunction(
      () =>
        [...document.querySelectorAll("img")]
          // Only images with a layout box. Several are inside `hidden lg:block`
          // containers, so at narrow viewports they are display:none, lazy
          // loading never fires, and they stay `complete === false` forever.
          // Waiting on those burned the full timeout at 375px.
          .filter((img) => img.getBoundingClientRect().width > 0)
          .every((img) => img.complete && img.naturalWidth > 0),
      null,
      { timeout: 10_000 },
    )
    .catch(() => {
      // Fall through: a genuinely broken image should fail its own assertion
      // with a useful message, not time out here.
    });
}

/**
 * Waits until React has hydrated and Framer's scroll observers are attached.
 *
 * Without this, a scroll driven immediately after `load` sweeps the page before
 * any IntersectionObserver exists. The observers then attach with the viewport
 * back at the top, and everything below the fold never intersects again — so
 * scroll-triggered reveals sit at their server-rendered `opacity: 0` forever
 * and look like a bug in the page rather than in the test.
 *
 * Framer normalises inline styles it controls (`opacity: 0` with a space)
 * where the server emits them minified (`opacity:0`). That difference is the
 * signal that the client has taken over.
 */
export async function waitForHydration(page: Page): Promise<void> {
  await page
    .waitForFunction(
      () =>
        [...document.querySelectorAll("[style]")].some((el) =>
          /(opacity|transform):\s/.test(el.getAttribute("style") ?? ""),
        ),
      null,
      { timeout: 10_000 },
    )
    .catch(() => {
      // A page with no motion at all is legitimate; do not fail here.
    });
}

/** Scrolls to the bottom in steps so lazy-loaded images actually fire. */
export async function scrollThroughPage(page: Page): Promise<void> {
  await waitForHydration(page);

  await page.evaluate(async () => {
    if (!document.body) return;
    // Overlap the steps. Reveal observes with a -60px viewport margin, so an
    // element has to sit 60px inside the viewport to trigger; stepping by a
    // full viewport height skips straight over that band and leaves elements
    // near a step boundary permanently unrevealed.
    const step = Math.max(1, Math.round(window.innerHeight * 0.6));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      // 120ms was too short at 375px: IntersectionObserver callbacks had not
      // fired before the next step, so scroll-triggered reveals were still
      // sitting at their initial state when the assertions ran.
      await new Promise((resolve) => setTimeout(resolve, 260));
    }
    window.scrollTo(0, 0);
    // Let the last batch of observer callbacks flush.
    await new Promise((resolve) => setTimeout(resolve, 400));
  });
  await waitForImagesDecoded(page);
}

/**
 * Waits until every scroll-triggered reveal in the viewport has finished.
 *
 * Colour-contrast tooling samples computed colour, so an element caught
 * mid-fade reports a blend against the background rather than its real
 * value — magenta at 35% opacity reads as #632344 and "fails" at 1.6:1 when
 * the settled colour passes comfortably. Wait for opacity to reach 1 before
 * asserting anything about colour.
 */
export async function waitForRevealsSettled(page: Page): Promise<void> {
  await waitForHydration(page);
  await page
    .waitForFunction(
      () =>
        [...document.querySelectorAll<HTMLElement>("[style]")]
          .filter((el) => {
            const box = el.getBoundingClientRect();
            return box.width > 0 || box.height > 0;
          })
          .every((el) => parseFloat(el.style.opacity || "1") >= 1),
      null,
      { timeout: 10_000 },
    )
    .catch(() => {
      // Anything still faded is below the fold and not being asserted on.
    });
}
