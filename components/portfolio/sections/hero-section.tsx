import { ArrowDown } from "lucide-react";
import Link from "next/link";
import type { HomeHero } from "@/lib/portfolio-types";
import { SECTIONS, sectionHref } from "@/lib/routes";
import { AsciiPortrait } from "../fx/ascii-portrait";
import { GlowingEffect } from "../fx/glowing-effect";
import { TextGenerate } from "../fx/text-generate";
import { Reveal } from "../shared/reveal";

type HeroSectionProps = {
  data: HomeHero;
  email: string;
};

/**
 * The five-second answer: who, what, proof, and the two ways in.
 *
 * Type-led on purpose. The name is the largest thing on the page, the role is
 * the editorial italic, and the proof line is plain prose with nothing in it
 * that the case studies do not back up.
 */
export function HeroSection({ data, email }: HeroSectionProps) {
  return (
    <section aria-labelledby="hero-heading" className="bg-ground">
      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1440px] items-center gap-12 px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40 lg:grid-cols-[minmax(0,1fr)_auto] xl:gap-16 xl:px-16">
        <div className="flex flex-col gap-7 md:gap-8">
        <Reveal from="none">
          <div className="flex flex-wrap items-center gap-3 text-[14px] font-medium leading-none">
            <p className="inline-flex h-9 items-center gap-2.5 border border-rule bg-plate px-3.5 text-ink">
              <span aria-hidden="true" className="status-dot size-2 rounded-full bg-current" />
              <span className="text-ink">{data.status}</span>
            </p>
            <p className="inline-flex h-9 items-center px-1 text-ink-2">{data.location}</p>
          </div>
        </Reveal>

        <Reveal order={1}>
          <h1
            className="text-[clamp(3.5rem,1.4rem+7vw,9rem)] leading-[0.9] tracking-[-0.03em] text-ink"
            id="hero-heading"
          >
            {data.name}
          </h1>
        </Reveal>

        <p className="font-serif text-[clamp(1.875rem,1.3rem+2.4vw,3.5rem)] italic leading-[1.05] text-ink">
          <TextGenerate delay={0.35} text={data.role} />
        </p>

        <Reveal order={4}>
          <p className="max-w-[44ch] text-[clamp(1.0625rem,1rem+0.4vw,1.375rem)] leading-relaxed text-ink-2">
            {data.proof}
          </p>
        </Reveal>

        <Reveal order={5}>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                className="group relative inline-flex min-h-12 w-full items-center justify-between gap-6 bg-ink px-6 text-[15px] font-medium text-plate transition-colors duration-200 hover:bg-spot sm:w-auto"
                href={sectionHref(SECTIONS.work)}
              >
                <GlowingEffect proximity={48} spread={50} />
                Development work
                <ArrowDown aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" strokeWidth={1.75} />
              </Link>
              <Link
                className="group relative inline-flex min-h-12 w-full items-center justify-between gap-6 border border-rule bg-plate px-6 text-[15px] font-medium text-ink transition-colors duration-200 hover:border-ink sm:w-auto"
                href={sectionHref(SECTIONS.brand)}
              >
                <GlowingEffect proximity={48} spread={50} />
                Brand work
                <ArrowDown aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" strokeWidth={1.75} />
              </Link>
          </div>
        </Reveal>

        <Reveal from="none" order={6}>
          <ul className="mt-6 flex flex-col gap-3 border-t border-rule pt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            {data.facts.map((fact) => (
              <li className="label text-ink-2" key={fact}>
                {fact}
              </li>
            ))}
            <li>
              <a className="label text-ink-2 transition-colors duration-200 hover:text-spot" href={`mailto:${email}`}>
                {email}
              </a>
            </li>
          </ul>
        </Reveal>
        </div>

        <AsciiPortrait className="hidden lg:block" />
      </div>
    </section>
  );
}
