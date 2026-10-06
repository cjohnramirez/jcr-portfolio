import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { CarouselItem, CaseContent, MediaItem } from "@/lib/portfolio-types";
import type { NextEntry } from "@/lib/routes";
import { CarouselFrame } from "../shared/carousel-frame";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { Reveal } from "../shared/reveal";
import { Collage } from "./collage";
import { Kicker, Label, NextBlock } from "./parts";

type BrandStudyProps = {
  title: string;
  plate: string;
  meta: string;
  content: CaseContent;
  hero: MediaItem;
  applications: MediaItem[];
  deck: CarouselItem[];
  next: NextEntry;
};

/**
 * A brand system as a short story: the identity in use, full bleed; the
 * brief and the direction as two statements; the spec in four lines; the
 * applications; then the complete guidelines for anyone who wants every page.
 */
export function BrandStudy({ title, plate, meta, content, hero, applications, deck, next }: BrandStudyProps) {
  return (
    <main className="bg-ground pt-20 lg:pt-[88px]" id="main">
      {/* Hero */}
      <section className="relative h-[min(78svh,820px)] min-h-[480px] overflow-hidden bg-ink">
        <CloudinaryImage alt={hero.alt} className="object-cover" fill priority sizes="100vw" src={hero.src} />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 top-0">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 pt-6 md:px-8 xl:px-16">
            <Link className="inline-flex items-center gap-2 bg-black/40 px-3 py-2 text-[14px] text-white backdrop-blur-sm hover:bg-black/60" href="/#brand">
              <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
              All brand and design
            </Link>
            <Link className="group inline-flex items-center gap-1.5 bg-black/40 px-3 py-2 text-[14px] text-white backdrop-blur-sm hover:bg-black/60" href={next.href}>
              <span className="text-white/70">Next:</span> {next.title}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 pb-10 md:px-8 lg:pb-14 xl:px-16">
            <Kicker inverted name="Identity Work" plate={plate} />
            <h1 className="text-[clamp(3.25rem,2rem+5vw,8.25rem)] leading-[0.9] tracking-[-0.025em] text-white">{title}</h1>
            <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="font-serif text-[clamp(1.375rem,1.2rem+0.6vw,1.75rem)] italic text-white">{content.tagline}</span>
              <span className="label text-white/80">{meta}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Brief and direction */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 md:grid-cols-2 md:px-8 lg:gap-24 lg:py-28 xl:px-16">
        {[
          ["The brief", content.brief],
          ["The direction", content.direction],
        ].map(([label, text], index) =>
          text ? (
            <Reveal className={`flex flex-col gap-5 ${index ? "md:pt-24" : ""}`} key={label} order={index}>
              <Label>{label}</Label>
              <p className="max-w-[26ch] font-serif text-[clamp(1.75rem,1.3rem+1.4vw,2.75rem)] leading-[1.1] text-ink">{text}</p>
            </Reveal>
          ) : null,
        )}
      </section>

      {/* Spec */}
      {content.spec?.length ? (
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-16">
          <dl className="border-b border-rule">
            {content.spec.map((row, index) => (
              <Reveal className="flex flex-col gap-2 border-t border-rule py-5 sm:flex-row sm:items-center sm:justify-between" from="left" key={row.label} order={index}>
                <dt className="label text-ink-2">{row.label}</dt>
                <dd className="font-serif text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] leading-tight text-ink sm:text-right">{row.value}</dd>
              </Reveal>
            ))}
          </dl>
        </section>
      ) : null}

      {/* Applications */}
      {applications.length ? (
        <section className="mx-auto flex max-w-[1440px] flex-col gap-10 px-4 py-16 md:px-8 lg:py-28 xl:px-16">
          <Label>Applications</Label>
          <Collage items={applications} />
        </section>
      ) : null}

      {/* Guidelines */}
      <section className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 pb-16 md:px-8 lg:pb-24 xl:px-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[clamp(2rem,1.5rem+1.6vw,3.25rem)] leading-none text-ink">Full guidelines</h2>
          <Label>{deck.length} pages</Label>
        </div>
        <CarouselFrame items={deck} label={`${title} guidelines`} />
      </section>

      <NextBlock label="Next" next={next} />
    </main>
  );
}
