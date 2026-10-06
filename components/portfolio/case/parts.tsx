import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CaseContent } from "@/lib/portfolio-types";
import type { NextEntry } from "@/lib/routes";
import { GlowingEffect } from "../fx/glowing-effect";
import { Reveal } from "../shared/reveal";

/** The small caps label used across the detail templates. */
export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`label text-ink-2 ${className}`}>{children}</span>;
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="inline-flex items-center gap-2 text-[14px] text-ink-2 transition-colors duration-200 hover:text-spot"
      href={href}
    >
      <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
      {label}
    </Link>
  );
}

/** "01.1 Case Plates": plate number and editorial name, one italic serif. */
export function Kicker({ plate, name, inverted = false }: { plate: string; name: string; inverted?: boolean }) {
  return (
    <p className="flex items-center gap-2.5 font-serif text-[20px] italic leading-none">
      <span className={inverted ? "text-white" : "text-spot"}>{plate}</span>
      <span className={inverted ? "text-white/80" : "text-ink-2"}>{name}</span>
    </p>
  );
}

/** The compact "Next: Steady →" link every detail page carries. */
export function NextInline({ next }: { next: NextEntry }) {
  return (
    <Link
      className="group inline-flex items-center gap-1.5 text-[15px] text-spot"
      href={next.href}
    >
      <span className="text-ink-2">Next:</span> {next.title}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        strokeWidth={1.75}
      />
    </Link>
  );
}

/** Role · Year · Stack · Status, whichever exist. */
export function MetaRow({ content, className = "" }: { content: CaseContent; className?: string }) {
  const items = [
    ["Role", content.role],
    ["Year", content.year],
    ["Stack", content.stack],
    ["Status", content.status],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <dl className={`flex flex-wrap gap-x-8 gap-y-4 ${className}`}>
      {items.map(([label, value]) => (
        <div className="flex flex-col gap-1.5" key={label}>
          <dt className="label text-ink-2">{label}</dt>
          <dd className="text-[15px] text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Figures({
  figures,
  size = "md",
  className = "",
}: {
  figures: NonNullable<CaseContent["figures"]>;
  size?: "md" | "lg";
  className?: string;
}) {
  const big = size === "lg" ? "text-[clamp(3.5rem,2.4rem+3.6vw,6rem)]" : "text-[clamp(2.5rem,2rem+1.4vw,3.25rem)]";

  return (
    <dl className={`grid grid-cols-1 sm:grid-cols-3 ${className}`}>
      {figures.map((figure, index) => (
        <Reveal
          className={`flex flex-col gap-2 border-rule py-4 sm:py-0 ${index ? "border-t sm:border-l sm:border-t-0 sm:pl-6" : ""} ${size === "lg" ? "sm:py-8" : ""}`}
          key={figure.label}
          order={index}
        >
          <dd className={`order-1 font-serif leading-[0.95] text-ink ${big}`}>{figure.value}</dd>
          <dt className="order-2 max-w-[22ch] text-[14px] leading-snug text-ink-2">{figure.label}</dt>
        </Reveal>
      ))}
    </dl>
  );
}

export function Decisions({
  decisions,
  size = "md",
}: {
  decisions: NonNullable<CaseContent["decisions"]>;
  size?: "md" | "lg";
}) {
  return (
    <ol className="border-t border-rule">
      {decisions.map((decision, index) => (
        <li className="border-b border-rule" key={decision.title}>
          <Reveal className="flex gap-5 py-5 md:gap-6 md:py-6" order={index}>
            <span className="font-serif text-[22px] italic leading-none text-spot">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex flex-col gap-1.5">
              <span className={`font-serif leading-tight text-ink ${size === "lg" ? "text-[clamp(1.75rem,1.4rem+1vw,2.25rem)]" : "text-[22px]"}`}>
                {decision.title}
              </span>
              <span className="max-w-[56ch] text-[15px] leading-relaxed text-ink-2">{decision.line}</span>
            </span>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** The full-width next-project block at the end of the long templates. */
export function NextBlock({ next, label }: { next: NextEntry; label: string }) {
  return (
    <Link className="group relative block border-t border-rule bg-plate transition-colors duration-300 hover:bg-plate-2" href={next.href}>
      <GlowingEffect />
      <span className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-16 md:px-8 md:py-24 xl:px-16">
        <Label>{label}</Label>
        <span className="flex items-center gap-4 font-serif text-[clamp(2.75rem,1.6rem+4.4vw,6rem)] leading-[0.95] text-ink">
          {next.title}
          <ArrowRight
            aria-hidden="true"
            className="size-[0.6em] shrink-0 text-spot transition-transform duration-300 group-hover:translate-x-2"
            strokeWidth={1.25}
          />
        </span>
      </span>
    </Link>
  );
}

export function ExternalLink({ href, label, primary = false }: { href: string; label: string; primary?: boolean }) {
  return (
    <a
      className={`group relative inline-flex h-12 items-center gap-2 px-5 text-[15px] transition-colors duration-200 ${
        primary ? "bg-ink text-plate hover:bg-spot" : "border border-rule bg-plate text-ink hover:border-ink"
      }`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <GlowingEffect proximity={40} />
      {label}
      <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
