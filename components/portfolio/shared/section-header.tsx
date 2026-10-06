import type { ReactNode } from "react";
import type { Section } from "@/lib/routes";
import { ScrambleText } from "../fx/scramble-text";
import { Reveal } from "./reveal";

type SectionHeaderProps = {
  section: Section;
  /** The plain heading. Defaults to the section label. */
  title?: string;
  lead?: ReactNode;
  /** For sections on the inverted (ink) ground. */
  inverted?: boolean;
  className?: string;
};

/**
 * Number and editorial subtitle above a plain heading.
 *
 * The plain heading is what a recruiter scans for; the italic subtitle keeps
 * the manual's voice without making anyone decode it.
 */
export function SectionHeader({
  section,
  title = section.label,
  lead,
  inverted = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex max-w-[900px] flex-col gap-5 ${className}`}>
      <Reveal from="none">
        <p className="flex items-center gap-2.5 font-serif text-[22px] italic leading-none">
          <span className={inverted ? "text-plate" : "text-spot"}>{section.number}</span>
          <ScrambleText className={inverted ? "text-rule" : "text-ink-2"} text={section.subtitle} />
        </p>
      </Reveal>
      <Reveal order={1}>
        <h2
          className={`text-[clamp(2.75rem,1.6rem+4.2vw,5rem)] leading-[0.95] ${inverted ? "text-plate" : "text-ink"}`}
          id={`${section.id}-heading`}
        >
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal order={2}>
          <p
            className={`max-w-[60ch] text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-relaxed ${inverted ? "text-rule" : "text-ink-2"}`}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Full-width band for one home section, with the shared rhythm and gutters. */
export function SectionBand({
  section,
  tone = "ground",
  children,
  className = "",
}: {
  section: Section;
  tone?: "ground" | "plate" | "ink";
  children: ReactNode;
  className?: string;
}) {
  const bg = tone === "plate" ? "bg-plate" : tone === "ink" ? "bg-ink" : "bg-ground";

  return (
    <section
      aria-labelledby={`${section.id}-heading`}
      className={`${bg} ${className}`}
      id={section.id}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-4 py-24 md:gap-14 md:px-8 md:py-32 xl:gap-16 xl:px-16 xl:py-40">
        {children}
      </div>
    </section>
  );
}
