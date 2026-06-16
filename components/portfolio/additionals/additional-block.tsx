import type { AdditionalBlock as AdditionalBlockData } from "@/lib/portfolio-types";
import { CarouselFrame } from "../shared/carousel-frame";
import { TimelineRow } from "./timeline-row";

type AdditionalBlockProps = {
  block: AdditionalBlockData;
  featured?: boolean;
};

export function AdditionalBlock({ block, featured = false }: AdditionalBlockProps) {
  return (
    <article className="border border-[var(--portfolio-border)]">
      <CarouselFrame
        className={`border-0 border-b border-[var(--portfolio-border)] ${
          featured ? "min-h-[420px] lg:min-h-[512px] xl:h-[512px]" : "min-h-[340px] lg:min-h-[308px] xl:h-[308px]"
        }`}
        items={block.carousel}
        label="Image description"
      />

      <div className="flex flex-col gap-12 p-5 lg:gap-20 lg:p-10">
        <div className="flex flex-col gap-2.5 text-[var(--portfolio-text)]">
          <h3 className="text-[26px] font-normal uppercase leading-none tracking-normal lg:text-4xl">
            {block.title}
          </h3>
          <p className="text-xs font-normal uppercase leading-normal lg:text-[14px]">
            {block.summary}
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:gap-10">
          {block.entries.map((entry) => (
            <TimelineRow entry={entry} key={`${entry.date}-${entry.title}`} />
          ))}
        </div>
      </div>
    </article>
  );
}
