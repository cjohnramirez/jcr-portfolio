"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger position within a group, in steps of ~60ms. */
  order?: number;
  /** Entry direction. `up` is the default plate-entry motion. */
  from?: "up" | "left" | "none";
  className?: string;
};

/**
 * Scroll-triggered entry animation.
 *
 * `children` is a prop rather than JSX built here, so anything passed from a
 * server component stays server-rendered — only this wrapper ships to the
 * client. See next-best-practices/rsc-boundaries.md.
 *
 * Reduced motion is handled by `MotionConfig reducedMotion="user"` in
 * MotionProvider, NOT by branching here. Returning a plain div when the
 * preference is set produced a hydration mismatch that left elements stuck at
 * `opacity: 0` — see the comment in motion-provider.tsx before changing this.
 */
export function Reveal({
  children,
  order = 0,
  from = "up",
  className,
}: RevealProps) {
  const offset = from === "up" ? { y: 18 } : from === "left" ? { x: -18 } : {};

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: order * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
