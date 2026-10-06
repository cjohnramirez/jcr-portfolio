"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const RAMP = " .,:;-=+*#";
const COLS = 260;
const ROWS = 18;

function frame(time: number, pointer: { x: number; y: number; t: number } | null) {
  let out = "";
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      // Two slow travelling waves, rising toward the bottom edge.
      let v =
        Math.sin(x * 0.09 + time * 0.0011) * 0.5 +
        Math.sin(x * 0.031 - y * 0.35 + time * 0.0007) * 0.5;
      v = v * 0.5 + 0.5;
      v *= y / ROWS;
      // A ring spreading out from the last pointer position.
      if (pointer) {
        const age = (time - pointer.t) / 1000;
        const d = Math.hypot((x - pointer.x) * 0.5, y - pointer.y);
        const ring = Math.exp(-((d - age * 22) ** 2) / 6) * Math.max(0, 1 - age / 2.5);
        v = Math.min(1, v + ring);
      }
      out += RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))];
    }
    out += "\n";
  }
  return out;
}

/**
 * An animated ASCII wave field, set as the ground of the contact band.
 *
 * Writes straight to the <pre>'s text node on each frame, about 20 times a
 * second, so React never re-renders. It stops while off-screen, and with
 * reduced motion it paints a single still frame. Purely decorative.
 */
export function AsciiField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLPreElement>(null);
  const pointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const pre = ref.current;
    if (!pre) return;
    pre.textContent = frame(4000, null);
    if (reduceMotion) return;

    let raf = 0;
    let last = 0;
    let visible = false;
    function tick(now: number) {
      if (now - last > 50 && pre) {
        last = now;
        pre.textContent = frame(now, pointer.current);
      }
      if (visible) raf = requestAnimationFrame(tick);
    }
    // The field sits behind the content, so it listens on its section.
    const host = pre.parentElement;
    function move(event: PointerEvent) {
      const box = pre?.getBoundingClientRect();
      if (!box) return;
      const now = performance.now();
      if (pointer.current && now - pointer.current.t < 350) return;
      pointer.current = {
        x: ((event.clientX - box.left) / box.width) * COLS,
        y: ((event.clientY - box.top) / box.height) * ROWS,
        t: now,
      };
    }
    host?.addEventListener("pointermove", move);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    observer.observe(pre);
    return () => {
      observer.disconnect();
      host?.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <pre
      aria-hidden="true"
      className={`m-0 select-none overflow-hidden whitespace-pre font-[ui-monospace,SFMono-Regular,Menlo,Consolas,monospace] text-[11px] leading-[1.15] ${className}`}
      data-decorative=""
      ref={ref}
    />
  );
}
