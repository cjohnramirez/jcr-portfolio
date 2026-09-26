import type { HeroData } from "@/lib/portfolio-types";
import { ActionButton } from "../shared/action-button";
import { AnnotatedFrame } from "../shared/annotated-frame";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { Plate, PlateBody, PlateHeader, PlateLead, PlateTitle } from "../shared/plate";
import { Reveal } from "../shared/reveal";

type HeroSectionProps = {
  data: HeroData;
};

/**
 * Plate 00 — the cover.
 *
 * The portrait carries the annotation layer because it is the one artifact on
 * the cover, and the manual's whole conceit is that the subject is treated as
 * an identity being specified.
 */
export function HeroSection({ data }: HeroSectionProps) {
  return (
    <Plate id="home">
      <PlateHeader plate="00" runningHead="Cover" folio={data.status} />

      <PlateBody className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-14">
          <AnnotatedFrame
            className="shrink-0"
            clearspace="1×"
            dimensions="Portrait / 1:1"
          >
            <div className="relative size-[180px] sm:size-[220px] lg:size-[264px]">
              <CloudinaryImage
                alt={data.portrait.alt}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 264px, (min-width: 640px) 220px, 180px"
                src={data.portrait.src}
              />
            </div>
          </AnnotatedFrame>

          <div className="flex flex-col gap-6">
            <PlateTitle as="h1" className="max-w-[16ch]">
              {data.title.before}{" "}
              <span className="text-spot">{data.title.accented[0]}</span>{" "}
              {data.title.after}{" "}
              <span className="text-spot">{data.title.accented[1]}</span>
            </PlateTitle>

            <PlateLead>{data.summary}</PlateLead>
          </div>
        </div>

        <div className="flex flex-col gap-8 border-t border-rule pt-8 lg:flex-row lg:items-start lg:justify-between">
          <Reveal order={3}>
            <ul className="space-y-2 font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2">
              {data.details.map((detail) => (
                <li key={detail} className="flex gap-3">
                  <span aria-hidden="true" className="text-rule">
                    ·
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal order={4}>
            <div className="flex flex-wrap gap-4">
              {data.actions.map((action) => (
                <ActionButton key={action.label} action={action} />
              ))}
            </div>
          </Reveal>
        </div>
      </PlateBody>
    </Plate>
  );
}
