"use client";

import { type PointerEvent, type ReactNode, useRef } from "react";

/**
 * A simplified Aceternity Card Spotlight: a soft radial wash follows the
 * pointer. CSS custom properties carry the position, so moving the pointer
 * never re-renders React and there is no canvas.
 */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function move(event: PointerEvent<HTMLDivElement>) {
    const box = ref.current?.getBoundingClientRect();
    if (!box || !ref.current) return;
    ref.current.style.setProperty("--x", `${event.clientX - box.left}px`);
    ref.current.style.setProperty("--y", `${event.clientY - box.top}px`);
  }

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      onPointerMove={move}
      ref={ref}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), color-mix(in srgb, var(--spot) 12%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
