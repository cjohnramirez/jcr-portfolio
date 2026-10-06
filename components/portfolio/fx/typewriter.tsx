"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type TypewriterProps = {
  /** Phrases typed in turn. The first is also what screen readers hear. */
  phrases: string[];
  className?: string;
  /** Seconds before the first phrase starts. */
  delay?: number;
  /** Milliseconds per typed character. */
  typeSpeed?: number;
  /** Milliseconds per erased character. */
  eraseSpeed?: number;
  /** Milliseconds a finished phrase stays on screen. */
  hold?: number;
};

/**
 * Aceternity's Typewriter Effect, adapted to cycle through phrases.
 *
 * Types a phrase, holds it, erases it, types the next. Every phrase is laid
 * out invisibly in the same grid cell, so the box is always as large as the
 * longest one: the line never reflows and nothing below it moves, even when
 * a phrase wraps on a phone. Screen readers get the first phrase, whole and
 * once, instead of a stream of letters. With reduced motion the first phrase
 * simply sits there.
 */
export function Typewriter({
  phrases,
  className = "",
  delay = 0.6,
  typeSpeed = 55,
  eraseSpeed = 28,
  hold = 4000,
}: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [erasing, setErasing] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setTimeout(() => setStarted(true), delay * 1000);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, delay]);

  useEffect(() => {
    if (reduceMotion || !started) return;
    const phrase = phrases[index] ?? "";
    let timer: number;

    if (!erasing && length < phrase.length) {
      timer = window.setTimeout(() => setLength(length + 1), typeSpeed);
    } else if (!erasing) {
      timer = window.setTimeout(() => setErasing(true), hold);
    } else if (length > 0) {
      timer = window.setTimeout(() => setLength(length - 1), eraseSpeed);
    } else {
      timer = window.setTimeout(() => {
        setErasing(false);
        setIndex((index + 1) % phrases.length);
      }, 350);
    }

    return () => window.clearTimeout(timer);
  }, [reduceMotion, started, phrases, index, length, erasing, typeSpeed, eraseSpeed, hold]);

  const phrase = phrases[index] ?? "";
  const shown = reduceMotion ? phrase : phrase.slice(0, length);

  return (
    <span className={`grid ${className}`}>
      <span className="sr-only">{phrases[0]}</span>
      {phrases.map((sizer) => (
        <span aria-hidden="true" className="invisible col-start-1 row-start-1" key={sizer}>
          {sizer}
          <span className="inline-block w-[3px]" />
        </span>
      ))}
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {shown}
        <span className="typewriter-cursor ml-[0.06em] inline-block h-[0.82em] w-[3px] translate-y-[0.08em] bg-spot align-baseline" />
      </span>
    </span>
  );
}
