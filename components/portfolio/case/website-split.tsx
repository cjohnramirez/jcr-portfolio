import type { CaseContent, MediaItem } from "@/lib/portfolio-types";
import type { NextEntry } from "@/lib/routes";
import { Reveal } from "../shared/reveal";
import { BrowserFrame } from "./browser-frame";
import { ExternalLink, Figures, Kicker, MetaRow, TopRow } from "./parts";
import { NextInline } from "./next-links";
import { TechnicalNotes } from "./technical-notes";

type WebsiteSplitProps = {
  title: string;
  plate: string;
  kicker: string;
  back: { href: string; label: string };
  content: CaseContent;
  screens: MediaItem[];
  notes: { title: string; description: string }[];
  stack?: string[];
  next: NextEntry;
};

/**
 * Website split: the site on the left, the story on the right, one viewport.
 *
 * One grid, three areas. Below lg they stack in reading order: the summary,
 * then the browser frame at a fixed height, then the actions and notes. From
 * lg the frame spans the left column for the full viewport under the sticky
 * header, and only the frame scrolls. The frame is rendered once, so its
 * first slice is the only eager image on the page.
 */
export function WebsiteSplit({ title, plate, kicker, back, content, screens, notes, stack, next }: WebsiteSplitProps) {
  const site = content.site;
  const frameScreens = [
    { label: "Home page", items: site?.fullPage ?? [] },
    ...(site?.pages ?? screens.map((item) => ({ label: item.caption ?? "Screen", items: [item] }))),
  ];

  return (
    <main className="bg-ground pt-20 lg:pt-[88px]" id="main">
      <section className="grid grid-cols-1 [&>*]:min-w-0 lg:h-[calc(100svh-88px)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.38fr)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)_auto]">
        {/* Two halves pushed apart: who and what at the top, the numbers below. */}
        <div className="scroll-quiet flex flex-col gap-10 px-4 pb-8 pt-8 md:px-8 lg:col-start-2 lg:row-start-1 lg:justify-between lg:gap-8 lg:overflow-y-auto lg:pb-6 lg:px-8 xl:pl-12 xl:pr-14 lg:pt-9">
          <div className="flex flex-col gap-7 lg:gap-6">
            <div className="flex flex-col gap-4">
              <TopRow back={back} status={content.status} />
              <Reveal from="none">
                <Kicker name={kicker} plate={plate} />
              </Reveal>
              <Reveal order={1}>
                <h1 className="text-[clamp(3.25rem,2rem+3.6vw,5.75rem)] leading-[0.92] tracking-[-0.02em] text-ink">{title}</h1>
              </Reveal>
              <Reveal order={2}>
                <p className="max-w-[24ch] font-serif text-[clamp(1.5rem,1.2rem+0.8vw,1.875rem)] italic leading-[1.1] text-spot">
                  {content.tagline}
                </p>
              </Reveal>
            </div>

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
        </div>

        <div className="h-[70svh] px-4 md:px-8 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:flex lg:h-auto lg:min-h-0 lg:flex-col lg:border-r lg:border-rule lg:bg-plate-2 lg:p-6 xl:pl-10">
          <BrowserFrame className="h-full lg:flex-1" screens={frameScreens} />
        </div>

        <div className="flex flex-col gap-6 px-4 pb-16 pt-8 md:px-8 lg:col-start-2 lg:row-start-2 lg:flex-row lg:flex-wrap lg:items-center lg:gap-3 lg:pb-8 lg:px-8 xl:pl-12 xl:pr-14 lg:pt-4">
          {site?.href ? <ExternalLink href={site.href} label="Visit live site" primary /> : null}
          <div className="hidden lg:block">
            <TechnicalNotes decisions={content.decisions} mode="dialog" notes={notes} stack={stack} title={title} />
          </div>
          <div className="lg:hidden">
            <TechnicalNotes decisions={content.decisions} mode="inline" notes={notes} stack={stack} title={title} />
          </div>
          <span className="lg:ml-auto">
            <NextInline next={next} />
          </span>
        </div>
      </section>
    </main>
  );
}
