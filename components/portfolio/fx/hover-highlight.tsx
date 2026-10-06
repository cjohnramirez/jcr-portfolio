"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useId, useState } from "react";

type HoverHighlightProps = {
  items: { key: string; node: ReactNode }[];
  /** Grid classes for the list, e.g. column counts per breakpoint. */
  className?: string;
  label: string;
};

/**
 * Aceternity's Card Hover Effect, adapted.
 *
 * A single highlight slides to whichever card is hovered, or focused: the
 * original only tracked the mouse, which left keyboard users without the
 * effect. The cards themselves are server-rendered and passed in as nodes, so
 * only this wrapper ships to the client.
 */
export function HoverHighlight({ items, className = "", label }: HoverHighlightProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const layoutId = useId();

  return (
    <ul aria-label={label} className={`grid ${className}`}>
      {items.map((item, index) => (
        <li
          className="relative h-full"
          key={item.key}
          onBlur={() => setHovered(null)}
          onFocus={() => setHovered(index)}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence>
            {hovered === index ? (
              <motion.span
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 z-0 block bg-plate-2 ring-1 ring-rule md:-inset-3"
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.15 } }}
                initial={{ opacity: 0 }}
                layoutId={layoutId}
              />
            ) : null}
          </AnimatePresence>
          <div className="relative z-10 h-full">{item.node}</div>
        </li>
      ))}
    </ul>
  );
}
