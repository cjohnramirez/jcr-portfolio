import type { CSSProperties } from "react";
import { getImageMeta } from "@/lib/image-manifest";
import type { CarouselItem, CaseContent, MediaItem } from "@/lib/portfolio-types";
import type { NextEntry } from "@/lib/routes";
import { CarouselFrame } from "../shared/carousel-frame";
import { Reveal } from "../shared/reveal";
import { Collage, NaturalImage } from "./collage";
import { Decisions, ExternalLink, Figures, Kicker, Label, MetaRow, NextBlock, NextInline, TopRow } from "./parts";
import { TechnicalNotes } from "./technical-notes";

type CaseStudyProps = {
  title: string;
  plate: string;
  kicker: string;
  back: { href: string; label: string };
  content: CaseContent;
  /** Cover visual when there is no cover pair: a single image. */
  cover?: MediaItem;
  screens: MediaItem[];
  notes: { title: string; description: string }[];
  stack?: string[];
  links?: { label: string; href: string }[];
  deck?: CarouselItem[];
  next: NextEntry;
};

/**
 * The editorial case study, kept deliberately close to the website split in
 * density: a type-led cover whose text column carries the meta and the
 * numbers, as the website pages do, with the visual on the right. Then the
 * screens, the decisions, and the full notes behind one control.
 */
export function CaseStudy({
  title,
  plate,
  kicker,
  back,
  content,
  cover,
  screens,
  notes,
  stack,
  links,
  deck,
  next,
}: CaseStudyProps) {
  const transparent = Boolean(content.transparent);
  const pair = content.coverPair;
  const deckMeta = deck?.[0]?.imageSrc ? getImageMeta(deck[0].imageSrc) : undefined;
  const deckRatio = deckMeta ? deckMeta.width / deckMeta.height : 16 / 9;

  return (
    <main className="bg-ground pt-20 lg:pt-[88px]" id="main">
      {/* Cover: text, figures and actions on the left; the visual on the
          right with Next under it, on the same line as the actions. */}
      <section className="mx-auto grid max-w-[1440px] gap-10 overflow-hidden px-4 pb-12 pt-10 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:pb-16 lg:pr-0 lg:pt-14 xl:pl-16">
        <div className="flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-6">
            <TopRow back={back} status={content.status} />
            <Reveal from="none">
              <Kicker name={kicker} plate={plate} />
            </Reveal>
            <Reveal order={1}>
              <h1 className="text-[clamp(3.5rem,2rem+5vw,8rem)] leading-[0.9] tracking-[-0.025em] text-ink">{title}</h1>
            </Reveal>
            <Reveal order={2}>
              <p className="max-w-[22ch] font-serif text-[clamp(1.625rem,1.3rem+1vw,2.25rem)] italic leading-[1.08] text-spot">
                {content.tagline}
              </p>
            </Reveal>
            <Reveal order={3}>
              <MetaRow content={content} />
            </Reveal>
          </div>

          {content.figures?.length ? (
            <div className="flex flex-col gap-4">
              {content.figuresNote ? <span className="label text-ink-2">{content.figuresNote}</span> : null}
              <Figures figures={content.figures} />
            </div>
          ) : null}

          {links?.length ? (
            <Reveal className="flex flex-wrap gap-3" order={4}>
              {links.map((link, index) => (
                <ExternalLink href={link.href} key={link.href} label={link.label} primary={index === 0} />
              ))}
            </Reveal>
          ) : null}
        </div>

        <div className="flex flex-col justify-between gap-10">
          <Reveal
            className={`relative flex flex-1 items-center ${pair ? "justify-center lg:pr-8 xl:pr-16" : "lg:-mr-24"}`}
            from="none"
            order={2}
          >
            {pair ? (
              // Two tilted phones, the second dropped by about a quarter of
              // its height, as in the Figma arrangement.
              <div className="grid w-full max-w-[min(440px,78vw)] grid-cols-2 items-start gap-[10%]">
                <NaturalImage item={pair[0]} priority sizes="220px" transparent />
                <NaturalImage className="mt-[62%]" item={pair[1]} priority sizes="220px" transparent />
              </div>
            ) : cover ? (
              <NaturalImage item={cover} priority sizes="(min-width: 1024px) 64vw, 100vw" transparent={transparent} />
            ) : null}
          </Reveal>
          <div className="flex justify-end lg:pr-8 xl:pr-16">
            <NextInline next={next} />
          </div>
        </div>
      </section>

      {/* Screens */}
      {screens.length ? (
        <section
          className={`mx-auto max-w-[1440px] px-4 py-16 md:px-8 xl:px-16 ${content.fitScreens ? "lg:py-0" : "lg:py-24"}`}
        >
          <Collage fit={content.fitScreens} items={screens} transparent={transparent} />
        </section>
      ) : null}

      {/* Decisions */}
      {content.decisions?.length ? (
        <section className="mx-auto grid max-w-[1440px] gap-6 px-4 pb-16 md:px-8 lg:grid-cols-12 lg:pb-24 xl:px-16">
          <div className="lg:col-span-4">
            <Label className="lg:sticky lg:top-28">Decisions</Label>
          </div>
          <div className="lg:col-span-8">
            <Decisions decisions={content.decisions} size="lg" />
          </div>
        </section>
      ) : null}

      {/* Full guidelines, where the work is a brand system */}
      {deck?.length ? (
        <section className="mx-auto flex max-w-[1440px] justify-center px-4 pb-16 md:px-8 lg:pb-24 xl:px-16">
          {/* Heading, sheet and controls together fit one viewport: the sheet
              is as wide as the height left over allows, at its own ratio.
              The reserve is the header, the heading row, the control bar
              (two rows on phones) and the gaps between them. */}
          <div
            className="flex w-full flex-col gap-6 [--deck-reserve:21rem] sm:[--deck-reserve:18rem] lg:[--deck-reserve:17rem]"
            style={
              {
                maxWidth: `max(18rem, calc((100svh - var(--deck-reserve)) * ${deckRatio.toFixed(4)}))`,
              } as CSSProperties
            }
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-[clamp(2rem,1.5rem+1.6vw,3.25rem)] leading-none text-ink">Full guidelines</h2>
              <Label>{deck.length} pages</Label>
            </div>
            <CarouselFrame items={deck} label={`${title} guidelines`} />
          </div>
        </section>
      ) : null}

      {/* Technical notes */}
      <section className="mx-auto max-w-[1440px] px-4 pb-16 md:px-8 lg:pb-24 xl:px-16">
        <TechnicalNotes mode="inline" notes={notes} stack={stack} title={title} />
      </section>

      <NextBlock label="Next project" next={next} />
    </main>
  );
}
