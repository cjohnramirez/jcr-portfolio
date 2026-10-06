"use client";

import { motion } from "framer-motion";

type TextGenerateProps = {
  text: string;
  className?: string;
  /** Seconds before the first word. */
  delay?: number;
};

/**
 * Aceternity's Text Generate Effect, adapted: words fade up one after another.
 *
 * The full sentence is in the DOM from the first render, so screen readers
 * and crawlers get it whole; only the visual entry is staggered. Reduced
 * motion is handled by MotionConfig at the root.
 */
export function TextGenerate({ text, className = "", delay = 0.2 }: TextGenerateProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          className="inline-block"
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          key={`${word}-${index}`}
          transition={{ duration: 0.5, delay: delay + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {index < words.length - 1 ? " " : null}
        </motion.span>
      ))}
    </span>
  );
}
