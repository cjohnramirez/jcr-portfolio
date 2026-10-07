"use client";

import { type CSSProperties, useState } from "react";
import { getImageMeta } from "@/lib/image-manifest";
import type { CarouselItem } from "@/lib/portfolio-types";
import { AnnotatedFrame } from "./annotated-frame";
import { CarouselControls } from "./carousel-controls";
import { CloudinaryImage } from "./cloudinary-image";

type CarouselFrameProps = {
  items: CarouselItem[];
  label: string;
  className?: string;
  /**
   * Wraps the carousel in an AnnotatedFrame with this readout on its baseline,
   * sized so the whole sheet and its controls fit the viewport (see below).
   */
  dimensions?: string;
  /** id for the annotated frame, the target of SheetsJumpButton. */
  id?: string;
};

/**
 * Width of the annotated frame, derived from the viewport height.
 *
 * A width-only rule let tall sheets overflow short viewports: at 1536×826 a
 * 1.41 deck page plus its control bar ran past the fold under the fixed nav.
 * The frame is instead as wide as the available height allows for the active
 * sheet's ratio, capped by `--frame-cap`.
 *
 * `--frame-reserve` is the vertical space the sheet may not use: the fixed nav
 * (80px, 100px from lg), the control bar (two rows below sm, one above), the
 * frame's own padding and caption, and a margin so it never sits flush.
 * The 16rem floor keeps an extreme landscape viewport from collapsing it.
 */
const FRAME_WIDTH =
  "min(var(--frame-cap), max(16rem, calc((100svh - var(--frame-reserve)) * var(--sheet-ratio) + 3rem)))";

const FRAME_VARS =
  "[--frame-cap:100%] [--frame-reserve:18rem] sm:[--frame-reserve:15rem] lg:[--frame-cap:80%] lg:[--frame-reserve:16rem]";

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
  dimensions,
  id,
}: CarouselFrameProps) {
  const [index, setIndex] = useState(0);
  const activeItem = items[index];

  function move(direction: -1 | 1) {
    setIndex((current) => (current + direction + items.length) % items.length);
  }

  if (!activeItem) {
    return null;
  }

  const carousel = (
    <div
      aria-label={label}
      aria-roledescription="carousel"
      className={`flex w-full flex-col bg-plate-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spot ${className}`}
      role="region"
      // Focus target for SheetsJumpButton; not in the tab order.
      tabIndex={-1}
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
                sizes="(min-width: 1440px) 1024px, (min-width: 1024px) 70vw, 100vw"
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

      <CarouselControls
        count={items.length}
        index={index}
        onNext={() => move(1)}
        onPrev={() => move(-1)}
        title={activeItem.description ? `${activeItem.title}, ${activeItem.description}` : activeItem.title}
      />
    </div>
  );

  if (!dimensions) {
    return carousel;
  }

  return (
    <AnnotatedFrame
      className={`${FRAME_VARS} transition-[width] duration-500 ease-out`}
      dimensions={dimensions}
      id={id}
      style={
        {
          "--sheet-ratio": sheetRatio(activeItem),
          width: FRAME_WIDTH,
        } as CSSProperties
      }
    >
      {carousel}
    </AnnotatedFrame>
  );
}
