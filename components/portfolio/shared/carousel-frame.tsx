"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { CarouselItem } from "@/lib/portfolio-types";

type CarouselFrameProps = {
  items: CarouselItem[];
  label: string;
  className?: string;
};

export function CarouselFrame({
  items,
  label,
  className = "",
}: CarouselFrameProps) {
  const [index, setIndex] = useState(0);
  const activeItem = items[index];
  const pageLabel = useMemo(
    () => `IMAGE ${index + 1} OF ${items.length}`,
    [index, items.length],
  );

  function move(direction: -1 | 1) {
    setIndex((current) => (current + direction + items.length) % items.length);
  }

  if (!activeItem) {
    return null;
  }

  return (
    <div
      className={`flex min-h-[308px] flex-col border border-[var(--portfolio-border)] ${className}`}
    >
      <div className="flex min-h-[240px] flex-1 items-center justify-center bg-[var(--portfolio-surface)] text-[11px] font-normal uppercase tracking-normal text-[var(--portfolio-muted)]">
        {activeItem.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={activeItem.imageAlt ?? activeItem.title}
            className="h-full w-full object-cover"
            src={activeItem.imageSrc}
          />
        ) : (
          <span>{activeItem.title}</span>
        )}
      </div>
      <div className="border-t border-[var(--portfolio-border)] text-[11px] font-normal uppercase leading-none tracking-normal lg:hidden">
        <div className="flex h-[68px] items-stretch justify-between">
          <div className="flex">
            <button
              aria-label="Previous image"
              className="relative flex w-[65px] items-center justify-center border-r border-[var(--portfolio-border)] transition-shadow hover:z-10 hover:shadow-[inset_0_0_0_1px_var(--portfolio-accent)] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--portfolio-accent)]"
              type="button"
              onClick={() => move(-1)}
            >
              <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </button>
            <button
              aria-label="Next image"
              className="relative flex w-[65px] items-center justify-center border-r border-[var(--portfolio-border)] transition-shadow hover:z-10 hover:shadow-[inset_0_0_0_1px_var(--portfolio-accent)] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--portfolio-accent)]"
              type="button"
              onClick={() => move(1)}
            >
              <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </button>
          </div>
          <div className="flex items-center justify-end px-5 text-[var(--portfolio-muted)]">
            {pageLabel}
          </div>
        </div>
        <div className="flex h-[68px] items-center border-t border-[var(--portfolio-border)] px-5 text-[var(--portfolio-muted)]">
          {activeItem.description || label}
        </div>
      </div>

      <div className="hidden min-h-[68px] grid-cols-[1fr_65px_65px_auto] border-t border-[var(--portfolio-border)] text-base font-normal uppercase leading-none tracking-normal lg:grid">
        <div className="flex items-center px-5 text-[var(--portfolio-muted)]">
          {activeItem.description || label}
        </div>
        <button
          aria-label="Previous image"
          className="relative flex items-center justify-center border-l border-[var(--portfolio-border)] transition-shadow hover:z-10 hover:shadow-[inset_0_0_0_1px_var(--portfolio-accent)] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--portfolio-accent)]"
          type="button"
          onClick={() => move(-1)}
        >
          <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </button>
        <button
          aria-label="Next image"
          className="relative flex items-center justify-center border-l border-[var(--portfolio-border)] transition-shadow hover:z-10 hover:shadow-[inset_0_0_0_1px_var(--portfolio-accent)] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--portfolio-accent)]"
          type="button"
          onClick={() => move(1)}
        >
          <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </button>
        <div className="flex min-w-[140px] items-center justify-end border-l border-[var(--portfolio-border)] px-5 text-[var(--portfolio-muted)]">
          {pageLabel}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {activeItem.description}
      </p>
    </div>
  );
}
