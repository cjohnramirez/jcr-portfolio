import type { CarouselItem, CaseContent, MediaItem } from "@/lib/portfolio-types";
import type { NextEntry } from "@/lib/routes";
import { CarouselFrame } from "../shared/carousel-frame";
import { Reveal } from "../shared/reveal";
import { Collage, NaturalImage } from "./collage";
import { Decisions, ExternalLink, Figures, Kicker, Label, MetaRow, NextBlock, TopRow } from "./parts";
import { TechnicalNotes } from "./technical-notes";

type CaseStudyProps = {
  title: string;
  plate: string;
  kicker: string;
  back: { href: string; label: string };
  content: CaseContent;
  /** Cover visual: the first two transparent screens, or a single image. */
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
 * density: a type-led cover with the visual offset and bleeding off the right
 * edge, then the numbers, the screens, the decisions, and the
 * full notes behind one control.
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
  const coverPair = transparent ? screens.slice(0, 2) : [];
  const rest = transparent ? screens.slice(2) : screens;

  return (
    <main className="bg-ground pt-20 lg:pt-[88px]" id="main">
      {/* Cover */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-10 overflow-hidden px-4 pb-12 pt-10 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:pb-16 lg:pr-0 lg:pt-14 xl:pl-16">
        <div className="flex flex-col gap-6">
          <TopRow back={back} next={next} status={content.status} />
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
          {links?.length ? (
            <Reveal className="flex flex-wrap gap-3" order={4}>
              {links.map((link, index) => (
                <ExternalLink href={link.href} key={link.href} label={link.label} primary={index === 0} />
              ))}
            </Reveal>
          ) : null}
        </div>

        <Reveal className="relative lg:-mr-24" from="none" order={2}>
          {coverPair.length === 2 ? (
            <div className="grid grid-cols-2 items-end gap-0">
              <NaturalImage item={coverPair[0]} priority sizes="(min-width: 1024px) 34vw, 50vw" transparent />
              <NaturalImage className="-ml-[18%] mb-[8%]" item={coverPair[1]} priority sizes="(min-width: 1024px) 34vw, 50vw" transparent />
            </div>
          ) : cover ? (
            <NaturalImage item={cover} priority sizes="(min-width: 1024px) 64vw, 100vw" transparent={transparent} />
          ) : null}
        </Reveal>
      </section>

      {/* Figures */}
      {content.figures?.length ? (
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-16">
          <Figures className="border-y border-rule" figures={content.figures} size="lg" />
        </section>
      ) : null}

      {/* Screens */}
      {rest.length ? (
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 lg:py-24 xl:px-16">
          <Collage items={rest} transparent={transparent} />
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
        <section className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 pb-16 md:px-8 lg:pb-24 xl:px-16">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-[clamp(2rem,1.5rem+1.6vw,3.25rem)] leading-none text-ink">Full guidelines</h2>
            <Label>{deck.length} pages</Label>
          </div>
          <CarouselFrame items={deck} label={`${title} guidelines`} />
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
