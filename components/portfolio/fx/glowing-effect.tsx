"use client";

import { animate, useReducedMotion } from "framer-motion";
import { type CSSProperties, memo, useCallback, useEffect, useRef } from "react";

type GlowingEffectProps = {
  /** Degrees of arc lit on either side of the pointer's bearing. */
  spread?: number;
  /** Distance outside the box (px) at which the edge starts to respond. */
  proximity?: number;
  /** Fraction of the box, around its centre, where the glow switches off. */
  inactiveZone?: number;
  borderWidth?: number;
  movementDuration?: number;
};

/**
 * Aceternity's Glowing Effect, adapted to the site's spot blue.
 *
 * A border-width ring sits on the parent's edge, masked by a conic gradient
 * aimed at the pointer, so the side nearest the cursor lights up and the
 * light travels around the edge as the cursor moves. The parent needs
 * `position: relative`. Purely decorative and pointer-only; with reduced
 * motion the light jumps instead of travelling.
 */
export const GlowingEffect = memo(function GlowingEffect({
  spread = 40,
  proximity = 64,
  inactiveZone = 0.01,
  borderWidth = 1.5,
  movementDuration = 1.2,
}: GlowingEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const reduceMotion = useReducedMotion();

  const handleMove = useCallback(
    (event?: { x: number; y: number }) => {
      if (!ref.current) return;
      cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        const element = ref.current;
        if (!element) return;

        const { left, top, width, height } = element.getBoundingClientRect();
        const x = event?.x ?? last.current.x;
        const y = event?.y ?? last.current.y;
        if (event) last.current = { x, y };

        const cx = left + width / 2;
        const cy = top + height / 2;
        if (Math.hypot(x - cx, y - cy) < 0.5 * Math.min(width, height) * inactiveZone) {
          element.style.setProperty("--active", "0");
          return;
        }

        const active =
          x > left - proximity &&
          x < left + width + proximity &&
          y > top - proximity &&
          y < top + height + proximity;
        element.style.setProperty("--active", active ? "1" : "0");
        if (!active) return;

        const current = parseFloat(element.style.getPropertyValue("--start")) || 0;
        const target = (180 * Math.atan2(y - cy, x - cx)) / Math.PI + 90;
        const next = current + ((((target - current + 180) % 360) + 360) % 360) - 180;

        animate(current, next, {
          duration: reduceMotion ? 0 : movementDuration,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (value) => element.style.setProperty("--start", String(value)),
        });
      });
    },
    [inactiveZone, proximity, movementDuration, reduceMotion],
  );

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onScroll = () => handleMove();
    const onPointer = (event: PointerEvent) => handleMove(event);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("pointermove", onPointer);
    };
  }, [handleMove]);

  return (
    <div
      aria-hidden="true"
      className="glow-ring pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
      ref={ref}
      style={
        {
          "--spread": spread,
          "--start": "0",
          "--active": "0",
          "--glow-border": `${borderWidth}px`,
        } as CSSProperties
      }
    />
  );
});
