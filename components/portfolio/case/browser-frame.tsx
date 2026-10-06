"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { getImageMeta } from "@/lib/image-manifest";
import type { MediaItem } from "@/lib/portfolio-types";
import { CloudinaryImage } from "../shared/cloudinary-image";

type Screen = { label: string; items: MediaItem[] };

type BrowserFrameProps = {
  address: string;
  href?: string;
  /** The first screen is the full-page capture; the rest are single shots. */
  screens: Screen[];
  className?: string;
};

function Slice({ item, eager }: { item: MediaItem; eager: boolean }) {
  const meta = getImageMeta(item.src);
  const width = meta?.width ?? 1440;
  const height = meta?.height ?? 900;

  return (
    <CloudinaryImage
      alt={item.alt}
      className="block h-auto w-full"
      height={height}
      priority={eager}
      sizes="(min-width: 1024px) 56vw, 100vw"
      src={item.src}
      width={width}
    />
  );
}

/**
 * A browser window holding a scrollable, full-length capture of the site.
 *
 * The capture is sliced so no single image exceeds browser limits; slices
 * stack seamlessly and only the first loads eagerly. The scroll area is a
 * focusable, labelled region so it can be scrolled from the keyboard, with a
 * thin blue scrollbar as its progress indicator.
 */
export function BrowserFrame({ address, href, screens, className = "" }: BrowserFrameProps) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const screen = screens[active] ?? screens[0];

  function show(index: number) {
    setActive(index);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }

  return (
    <div className={`flex min-h-0 min-w-0 flex-col border border-rule bg-plate ${className}`}>
      <div className="flex items-center gap-3 border-b border-rule px-3.5 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 bg-rule" />
          <span className="size-2 bg-rule" />
          <span className="size-2 bg-rule" />
        </span>
        <span className="min-w-0 flex-1 truncate bg-plate-2 px-3 py-1.5 text-[13px] text-ink-2">{address}</span>
        {href ? (
          <a
            className="inline-flex shrink-0 items-center gap-1 text-[13px] text-spot hover:underline"
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            Visit live site
            <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : null}
      </div>

      <div className="relative min-h-0 flex-1">
        <div
          aria-label={`${screen.label}: scroll to see the full page`}
          className="absolute inset-0 overflow-y-auto overscroll-contain bg-plate-2 [scrollbar-color:var(--spot)_transparent] [scrollbar-width:thin]"
          ref={scrollRef}
          role="region"
          tabIndex={0}
        >
          {screen.items.map((item, index) => (
            <Slice eager={active === 0 && index === 0} item={item} key={item.src} />
          ))}
        </div>
      </div>

      {screens.length > 1 ? (
        <div className="flex items-center gap-3 overflow-x-auto border-t border-rule px-3.5 py-2.5">
          <span className="label shrink-0 text-ink-2">Screens</span>
          {screens.map((item, index) => {
            const thumb = item.items[0];
            const selected = index === active;

            return (
              <button
                aria-pressed={selected}
                className="group flex shrink-0 flex-col items-start gap-1"
                key={item.label}
                onClick={() => show(index)}
                type="button"
              >
                <span
                  className={`relative block h-12 w-20 overflow-hidden border bg-plate-2 transition-colors duration-200 ${
                    selected ? "border-2 border-spot" : "border-rule group-hover:border-ink"
                  }`}
                >
                  {thumb ? (
                    <Image
                      alt=""
                      className="object-cover object-top"
                      fill
                      sizes="80px"
                      src={thumb.src.replace(/^\/?cloudinary\//, "/")}
                    />
                  ) : null}
                </span>
                <span className={`text-[11px] ${selected ? "text-spot" : "text-ink-2"}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
