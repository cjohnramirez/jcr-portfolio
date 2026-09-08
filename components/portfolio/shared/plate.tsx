import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/**
 * A plate — one page of the manual, resting on the presentation ground.
 *
 * Compound rather than prop-driven: `Plate`, `PlateHeader`, `PlateTitle` and
 * `PlateBody` compose instead of taking a dozen configuration props. All are
 * server components; only the `Reveal` leaf crosses to the client.
 *
 * The document furniture (plate number, running head, folio) is what makes the
 * manual concept legible. It encodes real position in a real sequence — it is
 * not decoration, so do not add it to things that are not plates.
 */

type PlateProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export function Plate({ children, id, className = "" }: PlateProps) {
  return (
    <section
      className={`relative bg-plate ${className}`}
      id={id}
    >
      {children}
    </section>
  );
}

type PlateHeaderProps = {
  /** e.g. `02.1` — set in the spec face, tabular so digits never shift. */
  plate: string;
  /** Running head: which section of the manual this belongs to. */
  runningHead: string;
  /** Optional right-hand folio, e.g. `Sheet 3 of 4`. */
  folio?: string;
};

export function PlateHeader({ plate, runningHead, folio }: PlateHeaderProps) {
  return (
    <Reveal from="none">
      <div className="flex items-baseline justify-between gap-4 border-b border-rule px-5 py-4 font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2 lg:px-10">
        <span className="flex items-baseline gap-3">
          <span className="tabular-nums text-mark">{plate}</span>
          <span>{runningHead}</span>
        </span>
        {folio ? <span className="tabular-nums">{folio}</span> : null}
      </div>
    </Reveal>
  );
}

type PlateTitleProps = {
  children: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export function PlateTitle({
  children,
  as: Tag = "h2",
  className = "",
}: PlateTitleProps) {
  return (
    <Reveal order={1}>
      <Tag
        className={`text-[clamp(2.5rem,1.2rem+5vw,6.5rem)] leading-[0.92] text-ink ${className}`}
      >
        {children}
      </Tag>
    </Reveal>
  );
}

type PlateBodyProps = {
  children: ReactNode;
  className?: string;
};

export function PlateBody({ children, className = "" }: PlateBodyProps) {
  return (
    <div className={`px-5 py-8 lg:px-10 lg:py-12 ${className}`}>{children}</div>
  );
}

type PlateLeadProps = {
  children: ReactNode;
};

/** Standfirst paragraph. Capped at a comfortable measure, not the plate width. */
export function PlateLead({ children }: PlateLeadProps) {
  return (
    <Reveal order={2}>
      <p className="max-w-[62ch] text-base leading-relaxed text-ink-2 lg:text-lg">
        {children}
      </p>
    </Reveal>
  );
}

type PlateMetaProps = {
  items: string[];
  label?: string;
};

/** Spec-face metadata strip — stack, tools, dates. */
export function PlateMeta({ items, label }: PlateMetaProps) {
  return (
    <Reveal order={3}>
      <dl className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2">
        {label ? <dt className="text-ink">{label}</dt> : null}
        {items.map((item) => (
          <dd key={item}>{item}</dd>
        ))}
      </dl>
    </Reveal>
  );
}
