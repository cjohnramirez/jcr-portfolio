import type { PortfolioBrand } from "@/lib/portfolio-types";
import { CarouselFrame } from "../shared/carousel-frame";
import { SheetsJumpButton } from "../shared/sheets-jump-button";
import {
  Plate,
  PlateBody,
  PlateHeader,
  PlateLead,
  PlateMeta,
  PlateTitle,
} from "../shared/plate";
import { Reveal } from "../shared/reveal";

type DesignPlateProps = {
  brand: PortfolioBrand;
  /** e.g. `03.2` */
  plate: string;
};

/**
 * One identity system as its own plate.
 *
 * Replaces the accordion tab these brands used to live in — a guideline deck
 * deserves a page, not a collapsed row.
 */
export function DesignPlate({ brand, plate }: DesignPlateProps) {
  return (
    <Plate>
      <PlateHeader
        plate={plate}
        runningHead={brand.meta.replace(/^>\s*/, "")}
        folio={`${brand.carousel.length} sheets`}
      />

      <PlateBody className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-6">
          <PlateTitle as="h1" className="max-w-[16ch]">
            {brand.title}
          </PlateTitle>
          <PlateLead>{brand.summary ?? brand.details.join(" · ")}</PlateLead>
          <div className="font-spec text-spec">
            <SheetsJumpButton
              count={brand.carousel.length}
              targetId={`${brand.id}-sheets`}
            />
          </div>
        </div>

        <CarouselFrame
          dimensions={`${brand.carousel.length} sheets`}
          id={`${brand.id}-sheets`}
          items={brand.carousel}
          label={brand.title}
        />

        <div className="grid gap-10 border-t border-rule pt-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-8">
            <PlateMeta items={brand.details} label="At a glance" />
            <PlateMeta items={brand.deliverables} label="Deliverables" />
          </div>

          {brand.notes?.length ? (
            <dl className="flex flex-col gap-8">
              {brand.notes.map((note, index) => (
                <Reveal
                  className="flex flex-col gap-2"
                  key={note.title}
                  order={index + 1}
                >
                  <dt className="text-[clamp(1.125rem,0.9rem+0.6vw,1.5rem)] leading-tight text-ink">
                    {note.title}
                  </dt>
                  <dd className="text-sm leading-relaxed text-ink-2 lg:text-base">
                    {note.description}
                  </dd>
                </Reveal>
              ))}
            </dl>
          ) : null}
        </div>
      </PlateBody>
    </Plate>
  );
}
