"use client";

import { useRef, useState } from "react";
import { getImageMeta } from "@/lib/image-manifest";
import type { MediaItem } from "@/lib/portfolio-types";
import { CarouselControls } from "../shared/carousel-controls";
import { CloudinaryImage } from "../shared/cloudinary-image";

type Screen = { label: string; items: MediaItem[] };

type BrowserFrameProps = {
  /** The first screen is the full-page capture; the rest are single shots. */
  screens: Screen[];
  className?: string;
};

function Slice({ item, eager, fill = false }: { item: MediaItem; eager: boolean; fill?: boolean }) {
  const meta = getImageMeta(item.src);

  return (
    <CloudinaryImage
      alt={item.alt}
      // A single short screen still fills the frame: at least as tall as the
      // pane, cropped from the top left (where interfaces start), so there is never
      // an empty band below it.
      className={`block h-auto w-full ${fill ? "min-h-full object-cover object-left-top" : ""}`}
      height={meta?.height ?? 900}
      priority={eager}
      sizes="(min-width: 1024px) 56vw, 100vw"
      src={item.src}
      width={meta?.width ?? 1440}
    />
  );
}

/**
 * The website carousel: one screen at a time, each scrollable top to bottom,
 * with the shared carousel bar underneath.
 *
 * The home page is a full-length capture, sliced so no single image exceeds
 * browser limits; slices stack seamlessly and only the first loads eagerly.
 * The scroll area is a focusable, labelled region so it can be scrolled from
 * the keyboard, and its scrollbar is kept quiet.
 */
export function BrowserFrame({ screens, className = "" }: BrowserFrameProps) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const screen = screens[active] ?? screens[0];

  function show(index: number) {
    setActive((index + screens.length) % screens.length);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }

  return (
    <div className={`flex min-h-0 min-w-0 flex-col border border-rule bg-plate ${className}`}>
      <div className="relative min-h-0 flex-1">
        <div
          aria-label={`${screen.label}: scroll to see the full page`}
          className="scroll-quiet absolute inset-0 overflow-y-auto overscroll-contain bg-plate-2"
          ref={scrollRef}
          role="region"
          tabIndex={0}
        >
          {screen.items.map((item, index) => (
            <Slice eager={active === 0 && index === 0} fill={screen.items.length === 1} item={item} key={item.src} />
          ))}
        </div>
      </div>

      <CarouselControls
        count={screens.length}
        index={active}
        onNext={() => show(active + 1)}
        onPrev={() => show(active - 1)}
        title={screen.label}
        unit="screen"
      />
    </div>
  );
}
