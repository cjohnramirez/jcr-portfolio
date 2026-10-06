import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ProjectCaseStudy } from "@/lib/portfolio-types";
import { SECTIONS } from "@/lib/routes";
import { GlowingEffect } from "../fx/glowing-effect";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { Reveal } from "../shared/reveal";
import { SectionBand, SectionHeader } from "../shared/section-header";

/** "TrailVenture: Tour Package Booking Platform" → name and descriptor. */
function splitTitle(title: string) {
  const [name, ...rest] = title.split(": ");
  return { name, descriptor: rest.join(": ") };
}

function WorkCard({ project, priority }: { project: ProjectCaseStudy; priority: boolean }) {
  const { name, descriptor } = splitTitle(project.title);

  return (
    <Link
      className="group relative flex h-full flex-col border border-rule bg-plate transition-colors duration-300 hover:bg-plate-2"
      href={`/work/${project.id}`}
    >
      <GlowingEffect />
      {project.cover ? (
        <div className="relative aspect-[1.86] w-full overflow-hidden bg-plate-2">
          {/* Both renders ship; the theme decides which one shows. */}
          <CloudinaryImage
            alt={project.cover.alt}
            className="object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.03] dark:hidden"
            fill
            priority={priority}
            sizes="(min-width: 1440px) 660px, (min-width: 768px) 50vw, 100vw"
            src={project.cover.light}
          />
          <CloudinaryImage
            alt={project.cover.alt}
            className="hidden object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.03] dark:block"
            fill
            sizes="(min-width: 1440px) 660px, (min-width: 768px) 50vw, 100vw"
            src={project.cover.dark}
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
        <p className="label text-ink-2">{project.category}</p>
        <h3 className="text-[clamp(1.875rem,1.4rem+1.2vw,2.5rem)] leading-none text-ink">{name}</h3>
        {descriptor ? <p className="text-[16px] leading-snug text-ink-2">{descriptor}</p> : null}

        {project.result ? (
          <p className="mt-2 flex gap-3 border-t border-rule pt-4 text-[15px] font-medium leading-snug text-ink">
            <span aria-hidden="true" className="pulse-dot mt-[0.45em] size-2 shrink-0 rounded-full bg-current text-spot" />
            <span>{project.result}</span>
          </p>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[15px] font-medium text-spot">
          View case study
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
        </span>
      </div>
    </Link>
  );
}

export function WorkSection({ projects }: { projects: ProjectCaseStudy[] }) {
  return (
    <SectionBand section={SECTIONS.work} tone="plate">
      <SectionHeader
        lead="Four products, built end to end. Each card opens the full case study."
        section={SECTIONS.work}
        title="Selected work"
      />
      <ul aria-label="Selected work" className="grid gap-6 md:grid-cols-2 md:gap-5 xl:gap-8">
        {projects.map((project, index) => (
          <li key={project.id}>
            <Reveal className="h-full" order={index % 2}>
              <WorkCard priority={false} project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </SectionBand>
  );
}
