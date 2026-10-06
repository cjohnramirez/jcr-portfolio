"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type PointerEvent, type ReactNode, useRef } from "react";

/**
 * Pulls its child a few pixels toward the pointer. Pointer-only by nature:
 * keyboard and touch users simply get a still button.
 */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });

  function move(event: PointerEvent<HTMLSpanElement>) {
    if (event.pointerType !== "mouse") return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    x.set((event.clientX - box.left - box.width / 2) * strength);
    y.set((event.clientY - box.top - box.height / 2) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      className="inline-flex"
      onPointerLeave={reset}
      onPointerMove={move}
      ref={ref}
      style={{ x, y }}
    >
      {children}
    </motion.span>
  );
}
