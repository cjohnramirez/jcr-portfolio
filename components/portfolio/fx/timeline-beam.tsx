"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { type ReactNode, useRef } from "react";

/**
 * Aceternity's Timeline scroll beam, adapted.
 *
 * A hairline rule runs the length of the record and a spot-colour beam fills
 * it as the reader scrolls through. The entries are server-rendered children;
 * the beam is the only thing that moves.
 */
export function TimelineBeam({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="relative" ref={ref}>
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-rule" />
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-px origin-top bg-spot motion-reduce:hidden"
        style={{ scaleY }}
      />
      {children}
    </div>
  );
}
