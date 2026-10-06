"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/**
 * The manual's signature element.
 *
 * Wraps an artifact in printer's registration marks — corner crop marks, a
 * clearspace bracket, and a dimension line, drawn in `--mark` (grey). This is John
 * Carl's own craft language: his Enduro plate is literally a wordmark
 * clearspace diagram. It is the one place boldness is spent, so everything
 * around it stays quiet.
 *
 * It is also the image loading state. The marks draw instantly with no network
 * involved, so something intentional is on screen in the first frame while the
 * artifact itself resolves underneath.
 *
 * `--mark` discipline: 1px strokes only. Never a fill, never a text colour on
 * anything but these annotations, never a button.
 */

type AnnotatedFrameProps = {
  children: ReactNode;
  /** Dimension readout, e.g. `2880 × 1620`. Shown on the baseline rule. */
  dimensions?: string;
  /** Left-hand clearspace bracket label. */
  clearspace?: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

const CORNER = 18;

function CropMark({
  position,
  delay,
}: {
  position: "tl" | "tr" | "bl" | "br";
  delay: number;
}) {
  // Each corner is an L: one horizontal arm, one vertical arm, meeting at the
  // corner of the artifact box.
  const paths: Record<typeof position, string> = {
    tl: `M 0 ${CORNER} L 0 0 L ${CORNER} 0`,
    tr: `M ${CORNER} ${CORNER} L ${CORNER} 0 L 0 0`,
    bl: `M 0 0 L 0 ${CORNER} L ${CORNER} ${CORNER}`,
    br: `M ${CORNER} 0 L ${CORNER} ${CORNER} L 0 ${CORNER}`,
  };

  const place: Record<typeof position, string> = {
    tl: "left-0 top-0",
    tr: "right-0 top-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  };

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute ${place[position]}`}
      fill="none"
      height={CORNER}
      viewBox={`0 0 ${CORNER} ${CORNER}`}
      width={CORNER}
    >
      <motion.path
        d={paths[position]}
        stroke="var(--mark)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay, ease: "easeOut" }}
      />
    </svg>
  );
}

export function AnnotatedFrame({
  children,
  dimensions,
  clearspace = "1×",
  className = "",
  id,
  style,
}: AnnotatedFrameProps) {
  return (
    <figure className={`relative ${className}`} id={id} style={style}>
      {/* Padding gives the marks somewhere to sit without overlapping the art. */}
      <div className="relative px-6 py-6">
        <CropMark position="tl" delay={0} />
        <CropMark position="tr" delay={0.08} />
        <CropMark position="bl" delay={0.16} />
        <CropMark position="br" delay={0.24} />

        {/* Clearspace bracket, the diagram his own brand plates carry. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-6 left-2 flex w-3 items-center justify-center"
        >
          <svg
            className="h-full w-3"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 12 100"
          >
            <motion.path
              d="M 6 0 L 6 100 M 2 0 L 10 0 M 2 100 L 10 100"
              stroke="var(--mark)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            />
          </svg>
          <span className="absolute -left-[3px] top-1/2 -translate-y-1/2 bg-plate py-1 font-spec text-[9px] uppercase leading-none tracking-[0.08em] text-mark [writing-mode:vertical-rl]">
            {clearspace}
          </span>
        </div>

        <div className="relative overflow-hidden bg-plate-2">{children}</div>
      </div>

      {dimensions ? (
        <figcaption className="flex items-center gap-3 px-6 font-spec text-[10px] uppercase leading-none tracking-[0.08em] text-ink-2">
          <span aria-hidden="true" className="h-px flex-1 bg-rule" />
          <span className="tabular-nums">{dimensions}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
