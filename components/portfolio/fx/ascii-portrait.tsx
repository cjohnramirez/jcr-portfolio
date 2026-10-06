"use client";

import { useReducedMotion } from "framer-motion";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import { ASCII_RAMP, portrait } from "@/lib/ascii-art";

const GLYPHS = `${ASCII_RAMP.trim()}/\\|<>[]{}`;

function scramble(lines: string[], settled: number): string {
  // Rows above `settled` are final; the rest are noise of the same shape,
  // so the silhouette never jumps while it decodes.
  return lines
    .map((line, row) =>
      row < settled
        ? line
        : line.replace(/[^ ]/g, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]),
    )
    .join("\n");
}

/**
 * The portrait as ASCII, decoding from noise row by row, with a light that
 * follows the pointer.
 *
 * Decorative, so it is hidden from assistive technology; the real portrait
 * and its alt text are in the About section. Two stacked copies of the text
 * make the pointer light: a dim base and a full-ink layer revealed through a
 * radial mask at the pointer, which costs a CSS variable update per move
 * rather than a re-render.
 */
export function AsciiPortrait({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const final = portrait.join("\n");
  const [text, setText] = useState(final);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    let row = 0;
    let frame = 0;
    let last = 0;
    function tick(now: number) {
      if (now - last > 45) {
        last = now;
        row += 1;
        setText(scramble(portrait, row));
      }
      if (row <= portrait.length) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  function move(event: PointerEvent<HTMLDivElement>) {
    const box = ref.current?.getBoundingClientRect();
    if (!box || !ref.current) return;
    ref.current.style.setProperty("--mx", `${event.clientX - box.left}px`);
    ref.current.style.setProperty("--my", `${event.clientY - box.top}px`);
    ref.current.style.setProperty("--r", "160px");
  }

  const pre = "m-0 select-none whitespace-pre font-[ui-monospace,SFMono-Regular,Menlo,Consolas,monospace] text-[clamp(7px,0.72vw,10.5px)] leading-[1.08]";

  return (
    <div
      aria-hidden="true"
      className={`relative ${className}`}
      data-decorative=""
      onPointerLeave={() => ref.current?.style.setProperty("--r", "0px")}
      onPointerMove={move}
      ref={ref}
    >
      <pre className={`${pre} text-ink/35`}>{text}</pre>
      <pre
        className={`${pre} absolute inset-0 text-ink`}
        style={{
          maskImage:
            "radial-gradient(var(--r, 0px) circle at var(--mx, 50%) var(--my, 50%), #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(var(--r, 0px) circle at var(--mx, 50%) var(--my, 50%), #000 40%, transparent 100%)",
        }}
      >
        {text}
      </pre>
      <p className="label mt-3 flex justify-between text-ink-2">
        <span>Portrait / ASCII</span>
        <span>
          {portrait[0]?.length ?? 0} × {portrait.length}
        </span>
      </p>
    </div>
  );
}
