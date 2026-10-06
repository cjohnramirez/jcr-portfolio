"use client";

import { motion } from "framer-motion";
import { type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";

export type TabItem = {
  id: string;
  label: string;
  /** Shorter label below the sm breakpoint. */
  shortLabel?: string;
  count: number;
  panel: ReactNode;
  /**
   * Mount the panel only once it has been opened. For heavy media (video)
   * that should cost nothing until someone asks for it. Eager panels are
   * rendered but hidden, so their links stay in the HTML for crawlers.
   */
  lazy?: boolean;
};

/**
 * WAI-ARIA tabs with Aceternity's sliding pill (a shared `layoutId`).
 *
 * Arrow keys move between tabs with automatic activation, Home and End jump
 * to the ends, and only the selected tab is in the tab order, so Tab moves
 * straight into the panel.
 */
export function Tabs({ items, label }: { items: TabItem[]; label: string }) {
  const baseId = useId();
  const [selected, setSelected] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number, focus = false) {
    setSelected(index);
    setVisited((previous) => new Set(previous).add(index));
    if (focus) tabRefs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = items.length - 1;
    const next =
      event.key === "ArrowRight"
        ? selected === last ? 0 : selected + 1
        : event.key === "ArrowLeft"
          ? selected === 0 ? last : selected - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  }

  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <div
        aria-label={label}
        className="inline-flex max-w-full self-start overflow-x-auto rounded-full border border-rule bg-plate p-1"
        role="tablist"
      >
        {items.map((item, index) => {
          const isSelected = index === selected;

          return (
            <button
              aria-controls={`${baseId}-panel-${item.id}`}
              aria-selected={isSelected}
              className={`relative shrink-0 rounded-full px-3 py-2.5 text-[14px] font-medium transition-colors duration-200 sm:px-5 sm:text-[15px] ${
                isSelected ? "text-plate" : "text-ink-2 hover:text-ink"
              }`}
              id={`${baseId}-tab-${item.id}`}
              key={item.id}
              onClick={() => select(index)}
              onKeyDown={onKeyDown}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role="tab"
              tabIndex={isSelected ? 0 : -1}
              type="button"
            >
              {isSelected ? (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-ink"
                  layoutId={`${baseId}-pill`}
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              <span className="relative flex items-baseline gap-1.5">
                {item.shortLabel ? (
                  <>
                    <span className="sm:hidden">{item.shortLabel}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </>
                ) : (
                  item.label
                )}
                <span className={`hidden text-[12px] tabular-nums sm:inline ${isSelected ? "text-plate/70" : "text-ink-2"}`}>
                  {item.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {items.map((item, index) => {
        const mounted = !item.lazy || visited.has(index);

        return (
          <div
            aria-labelledby={`${baseId}-tab-${item.id}`}
            hidden={index !== selected}
            id={`${baseId}-panel-${item.id}`}
            key={item.id}
            role="tabpanel"
            tabIndex={0}
          >
            {mounted ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={index === 0 ? false : { opacity: 0, y: 12 }}
                key={index === selected ? "shown" : "hidden"}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {item.panel}
              </motion.div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
