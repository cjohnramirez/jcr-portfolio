"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { getImageMeta } from "@/lib/image-manifest";
import type { CarouselItem } from "@/lib/portfolio-types";
import { CloudinaryImage } from "./cloudinary-image";

type CarouselFrameProps = {
  items: CarouselItem[];
  label: string;
  className?: string;
};

/** Used for a sheet with no image, and for anything missing from the manifest. */
const FALLBACK_RATIO = 16 / 9;

/**
 * The proportions of a sheet, from the build-time manifest.
 *
 * The frame is sized from this rather than measured after load, so the box is
 * already correct on the first paint and the image never arrives into a box of
 * the wrong shape.
 */
function sheetRatio(item: CarouselItem | undefined): number {
  if (!item?.imageSrc) return FALLBACK_RATIO;
  const meta = getImageMeta(item.imageSrc);
  return meta ? meta.width / meta.height : FALLBACK_RATIO;
}

export function CarouselFrame({
  items,
  label,
  className = "",
}: CarouselFrameProps) {
  const [index, setIndex] = useState(0);
  const activeItem = items[index];
  const pageLabel = useMemo(
    () => `Sheet ${index + 1} of ${items.length}`,
    [index, items.length],
  );

  function move(direction: -1 | 1) {
    setIndex((current) => (current + direction + items.length) % items.length);
  }

  if (!activeItem) {
    return null;
  }

  const control =
    "relative flex items-center justify-center text-ink-2 transition-colors duration-200 hover:text-spot focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-spot";

  return (
    <div
      aria-label={label}
      aria-roledescription="carousel"
      className={`flex w-full flex-col bg-plate-2 ${className}`}
      role="region"
    >
      {/*
        The frame takes the shape of the sheet inside it.

        It was `aspect-video` for every sheet, which suited only the 1.78 ones.
        The brand decks are 1.40 and lost 21% of the frame to empty pillar bars,
        and the wide research plates at 2.04 were letterboxed the other way.

        Animating `aspect-ratio` means animating layout, which the interface
        guidelines otherwise rule out — the exception holds here because the
        resize IS the effect, it runs on one isolated box, and it only ever
        starts from a click. That last part is also why it costs no CLS:
        layout shifts within 500ms of a discrete input carry `hadRecentInput`
        and are excluded from the metric.

        The transition is a CSS one rather than a Framer animation on purpose.
        `MotionConfig reducedMotion="user"` suppresses transform and layout
        animations but leaves other properties running, so a Framer tween on
        `aspectRatio` would keep animating for someone who asked it not to.
        The `prefers-reduced-motion` block in globals.css already zeroes every
        transition duration, so CSS gets the behaviour right for free.
      */}
      <div
        className="relative w-full overflow-hidden transition-[aspect-ratio] duration-500 ease-out"
        data-carousel-frame
        style={{ aspectRatio: sheetRatio(activeItem) }}
      >
        {items.map((item, i) => {
          // Preload the NEXT sheet only, not both neighbours.
          //
          // Every prev/next click used to start a cold fetch, which is what
          // made the loader visible on each interaction. A full prev+active+next
          // window fixed that but pushed /archive from 0.42 MB to 0.67 MB,
          // because that page carries two carousels. Forward is the dominant
          // direction, so one lookahead buys almost all the benefit; stepping
          // backwards past the start costs one fetch, once.
          const isActive = i === index;
          const isNext = i === (index + 1) % items.length;
          if (!isActive && !isNext) return null;

          return item.imageSrc ? (
            <div
              aria-hidden={isActive ? undefined : "true"}
              className={`absolute inset-0 ${isActive ? "opacity-100" : "pointer-events-none opacity-0"}`}
              key={item.id}
            >
              <CloudinaryImage
                alt={isActive ? (item.imageAlt ?? item.title) : ""}
                // `cover` is safe now that the frame carries the sheet's own
                // ratio: there is nothing to crop. It is preferred over
                // `contain` only because sub-pixel rounding under `contain`
                // can still leave a hairline of ground down one edge.
                className="h-full w-full object-cover object-top"
                fill
                highFidelity={item.imageFit === "contain"}
                priority={isActive && index === 0}
                sizes="(min-width: 1440px) 1280px, (min-width: 1024px) 88vw, 100vw"
                src={item.imageSrc}
              />
            </div>
          ) : null;
        })}

        {!activeItem.imageSrc ? (
          <span className="absolute inset-0 flex items-center justify-center font-spec text-[11px] uppercase tracking-[0.08em] text-ink-2">
            {activeItem.title}
          </span>
        ) : null}
      </div>

      {/*
        Two rows on phones, one from `sm` up.

        All four cells in a single row left the description about ten
        characters wide once the two controls and the counter had taken their
        fixed widths, so it wrapped to three lines against a one-line counter.
        The description gets its own row instead, and the pagination — both
        controls and the counter — shares the second.
      */}
      <div className="flex flex-col border-t border-rule font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2 sm:flex-row sm:items-stretch">
        <p className="flex items-center px-5 py-4 sm:flex-1 lg:py-5">
          {activeItem.description || label}
        </p>

        <div className="flex items-stretch border-t border-rule sm:border-t-0">
          <button
            aria-label="Previous sheet"
            className={`${control} w-14 border-r border-rule sm:border-l sm:border-r-0`}
            onClick={() => move(-1)}
            type="button"
          >
            <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </button>

          <button
            aria-label="Next sheet"
            className={`${control} w-14 border-r border-rule sm:border-l sm:border-r-0`}
            onClick={() => move(1)}
            type="button"
          >
            <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </button>

          <p className="flex flex-1 items-center justify-end px-5 py-4 tabular-nums sm:min-w-[8rem] sm:flex-none sm:border-l sm:border-rule sm:py-0">
            {pageLabel}
          </p>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {pageLabel}. {activeItem.description}
      </p>
    </div>
  );
}
