import type { CarouselItem, CaseContent, MediaItem } from "@/lib/portfolio-types";
import type { NextEntry } from "@/lib/routes";
import { Reveal } from "../shared/reveal";
import { Collage, NaturalImage } from "./collage";
import { GuidelinesDeck } from "./guidelines-deck";
import { NextBlock, NextInline } from "./next-links";
import { BackLink, Kicker, Label } from "./parts";

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
 * A brand system as a short story: the title with the identity in use beneath
 * it; the brief and the direction as two statements; the spec in four lines;
 * the applications, one per screen with the caption centred beside each; then
 * the complete guidelines for anyone who wants every page.
 */
export function BrandStudy({ title, plate, meta, content, hero, applications, deck, next }: BrandStudyProps) {
  return (
    <main className="bg-ground pt-20 lg:pt-[88px]" id="main">
      {/* Title, then the identity in use beneath it */}
      <section className="mx-auto flex max-w-[1440px] flex-col gap-10 px-4 pb-16 pt-10 md:px-8 lg:gap-12 lg:pb-24 lg:pt-14 xl:px-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <BackLink href="/#brand" label="All brand and design" />
            <NextInline next={next} />
          </div>
          <Reveal from="none">
            <Kicker name="Identity Work" plate={plate} />
          </Reveal>
          <Reveal order={1}>
            <h1 className="text-[clamp(3.25rem,2rem+5vw,8.25rem)] leading-[0.9] tracking-[-0.025em] text-ink">{title}</h1>
          </Reveal>
          <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2" order={2}>
            <span className="font-serif text-[clamp(1.375rem,1.2rem+0.6vw,1.75rem)] italic text-spot">{content.tagline}</span>
            <span className="label text-ink-2">{meta}</span>
          </Reveal>
        </div>
        <Reveal from="none" order={3}>
          <NaturalImage item={hero} priority sizes="(min-width: 1440px) 1312px, 100vw" />
        </Reveal>
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
        <section className="mx-auto flex max-w-[1440px] flex-col gap-10 px-4 py-16 md:px-8 lg:pb-16 lg:pt-28 xl:px-16">
          <Label>Applications</Label>
          <Collage fit items={applications} />
        </section>
      ) : null}

      {/* Guidelines */}
      <GuidelinesDeck deck={deck} title={title} />

      <NextBlock label="Next" next={next} />
    </main>
  );
}
