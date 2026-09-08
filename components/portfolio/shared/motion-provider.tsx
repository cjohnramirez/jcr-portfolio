"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Framer's reduced-motion handling, applied once at the root.
 *
 * `reducedMotion="user"` makes every motion component in the tree skip
 * transform and opacity animations when the visitor asks for reduced motion,
 * snapping straight to the target value instead.
 *
 * This exists because the obvious approach does not work. Branching inside a
 * component — returning a plain `div` when `useReducedMotion()` is true —
 * causes a hydration mismatch: the server cannot know the preference, so it
 * renders `motion.div` with its `initial` styles inline, and React does not
 * strip server-rendered attributes that the client omits. The result was
 * `opacity: 0` stuck permanently, leaving reduced-motion visitors on a blank
 * page. Keep the tree identical on both sides and let Framer decide.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
