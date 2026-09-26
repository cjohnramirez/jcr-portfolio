import type { ProjectCaseStudy } from "@/lib/portfolio-types";
import { AnnotatedFrame } from "../shared/annotated-frame";
import { CarouselFrame } from "../shared/carousel-frame";
import {
  Plate,
  PlateBody,
  PlateHeader,
  PlateLead,
  PlateMeta,
  PlateTitle,
} from "../shared/plate";
import { Reveal } from "../shared/reveal";

type CasePlateProps = {
  project: ProjectCaseStudy;
  /** e.g. `02.1` */
  plate: string;
};

/**
 * A single case study, rendered as its own plate.
 *
 * Replaces the previous approach of passing a one-item array to the index
 * section, which forced a selector UI onto a page that only ever shows one
 * project.
 */
export function CasePlate({ project, plate }: CasePlateProps) {
  return (
    <Plate>
      <PlateHeader
        plate={plate}
        runningHead={project.category}
        folio={`${project.carousel.length} sheets`}
      />

      <PlateBody className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-6">
          <PlateTitle as="h1" className="max-w-[18ch]">
            {project.title}
          </PlateTitle>
          <PlateLead>{project.summary}</PlateLead>

          {project.links?.length ? (
            <ul className="flex flex-wrap gap-x-8 gap-y-3 font-spec text-spec uppercase tracking-[0.08em]">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    className="text-spot underline decoration-rule underline-offset-[6px] transition-colors duration-200 hover:decoration-spot focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spot"
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* The sheets no longer share one ratio — the frame takes each sheet's
            own proportions — so the old hardcoded "16:9" here was a lie. */}
        <AnnotatedFrame
          className="lg:w-4/5"
          dimensions={`${project.carousel.length} sheets`}
        >
          <CarouselFrame items={project.carousel} label={project.title} />
        </AnnotatedFrame>

        <div className="grid gap-10 border-t border-rule pt-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-8">
            <PlateMeta items={project.stack.items} label={project.stack.label} />
            <PlateMeta items={project.skills.items} label={project.skills.label} />
          </div>

          <dl className="flex flex-col gap-8">
            {project.notes.map((note, index) => (
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
        </div>
      </PlateBody>
    </Plate>
  );
}
