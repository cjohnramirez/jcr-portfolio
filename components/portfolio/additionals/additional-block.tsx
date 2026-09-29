import type { AdditionalBlock as AdditionalBlockData } from "@/lib/portfolio-types";
import { CarouselFrame } from "../shared/carousel-frame";
import { Plate, PlateBody, PlateHeader, PlateLead } from "../shared/plate";
import { Reveal } from "../shared/reveal";
import { TimelineRow } from "./timeline-row";

type AdditionalBlockProps = {
  block: AdditionalBlockData;
  plate: string;
};

export function AdditionalBlock({ block, plate }: AdditionalBlockProps) {
  return (
    <Plate>
      <PlateHeader
        plate={plate}
        runningHead={block.title}
        folio={`${block.entries.length} entries`}
      />

      <PlateBody className="flex flex-col gap-10 lg:gap-14">
        <PlateLead>{block.summary}</PlateLead>

        {block.carousel?.length ? (
          <CarouselFrame
          dimensions={`${block.carousel.length} sheets`}
          items={block.carousel}
          label={block.title}
        />
        ) : null}

        {/* A long list that is usually off-screen — let the browser skip its
            layout work until it is scrolled near. */}
        <dl className="flex flex-col border-t border-rule [content-visibility:auto]">
          {block.entries.map((entry, index) => (
            <Reveal
              className="grid gap-2 border-b border-rule py-5 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-8"
              key={`${entry.date}-${entry.title}`}
              order={Math.min(index, 4)}
            >
              <TimelineRow entry={entry} />
            </Reveal>
          ))}
        </dl>
      </PlateBody>
    </Plate>
  );
}
