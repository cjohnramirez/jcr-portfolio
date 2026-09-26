import type { AboutData } from "@/lib/portfolio-types";
import { ActionButton } from "../shared/action-button";
import { AnnotatedFrame } from "../shared/annotated-frame";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { Plate, PlateBody, PlateHeader, PlateLead, PlateTitle } from "../shared/plate";
import { Reveal } from "../shared/reveal";

type AboutSectionProps = {
  data: AboutData;
  headingLevel?: "h1" | "h2";
};

/** Plate 01 — The Mark. */
export function AboutSection({ data, headingLevel = "h2" }: AboutSectionProps) {
  return (
    <Plate id="about">
      <PlateHeader plate="01" runningHead="The Mark" folio={data.status} />

      <PlateBody className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-6">
          <PlateTitle as={headingLevel} className="max-w-[14ch]">
            {data.title.before}{" "}
            <span className="text-spot">{data.title.accented}</span>
          </PlateTitle>
          <PlateLead>{data.summary}</PlateLead>

          <Reveal order={3}>
            <div className="flex flex-wrap gap-4">
              {data.actions.map((action) => (
                <ActionButton key={action.label} action={action} />
              ))}
            </div>
          </Reveal>
        </div>

        <AnnotatedFrame dimensions="Working plate / 16:9">
          <div className="relative aspect-video w-full">
            <CloudinaryImage
              alt={data.media.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1440px) 1320px, (min-width: 1024px) 90vw, 100vw"
              src={data.media.src}
            />
          </div>
        </AnnotatedFrame>

        <div className="grid gap-8 border-t border-rule pt-10 lg:grid-cols-[minmax(0,20ch)_1fr_1fr] lg:gap-12">
          <Reveal>
            <h3 className="text-[clamp(1.5rem,1rem+1.4vw,2.25rem)] leading-[1.05] text-ink">
              <span className="text-spot">Design</span> and{" "}
              <span className="text-spot">development</span>
            </h3>
          </Reveal>

          {data.columns.map((column, index) => (
            <Reveal key={column.title} order={index + 1}>
              <article className="flex flex-col gap-3">
                <h4 className="font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2">
                  {column.title}
                </h4>
                <p className="text-sm leading-relaxed text-ink-2 lg:text-base">
                  {column.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </PlateBody>
    </Plate>
  );
}
