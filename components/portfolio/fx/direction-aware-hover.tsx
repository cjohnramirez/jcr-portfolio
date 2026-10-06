"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type MouseEvent, type ReactNode, useRef, useState } from "react";

type Direction = "top" | "right" | "bottom" | "left";

const offsets: Record<Direction, { x?: string; y?: string }> = {
  top: { y: "-100%" },
  bottom: { y: "100%" },
  left: { x: "-100%" },
  right: { x: "100%" },
};

type DirectionAwareHoverProps = {
  children: ReactNode;
  /** Revealed over the image, entering from the side the pointer came in. */
  overlay: ReactNode;
  className?: string;
};

/**
 * Aceternity's Direction Aware Hover, adapted for the brand covers.
 *
 * The overlay is decoration: the same deliverables are printed in the card
 * body, so touch and keyboard users lose nothing when it never appears. It is
 * hidden from assistive technology for the same reason.
 */
export function DirectionAwareHover({
  children,
  overlay,
  className = "",
}: DirectionAwareHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<Direction | null>(null);

  function enter(event: MouseEvent<HTMLDivElement>) {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    // Which edge is nearest, scaled so wide boxes are not biased to top/bottom.
    const x = (event.clientX - box.left - box.width / 2) / (box.width / 2);
    const y = (event.clientY - box.top - box.height / 2) / (box.height / 2);
    setDirection(Math.abs(x) > Math.abs(y) ? (x > 0 ? "right" : "left") : y > 0 ? "bottom" : "top");
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={enter}
      onMouseLeave={() => setDirection(null)}
      ref={ref}
    >
      {children}
      <AnimatePresence>
        {direction ? (
          <motion.div
            animate={{ x: 0, y: 0 }}
            aria-hidden="true"
            className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 text-white"
            exit={{ ...offsets[direction], transition: { duration: 0.2 } }}
            initial={offsets[direction]}
            key="overlay"
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            {overlay}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
