import type { Metadata } from "next";
import { IndexGrid } from "@/components/portfolio/shared/index-grid";
import { PageShell } from "@/components/portfolio/shared/page-shell";
import {
  Plate,
  PlateBody,
  PlateHeader,
  PlateLead,
  PlateTitle,
} from "@/components/portfolio/shared/plate";
import { FeaturedBand } from "@/components/portfolio/work/featured-band";
import { projectsData } from "@/lib/portfolio-data";
import { getWorkPlate, PLATES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Work",
  description: projectsData.summary,
  alternates: { canonical: "/work" },
};

export default function WorkIndexPage() {
  const projects = projectsData.projects;

  const featured = projects
    .filter((project) => project.featured)
    .map((project) => ({
      href: `${PLATES.work.path}/${project.id}`,
      plate: getWorkPlate(project.id),
      title: project.title,
      meta: project.category,
      summary: project.summary,
      sheet: project.carousel[0],
      cover: project.cover,
      stack: project.stack.items,
    }));

  const rest = projects
    .filter((project) => !project.featured)
    .map((project) => ({
      href: `${PLATES.work.path}/${project.id}`,
      plate: getWorkPlate(project.id),
      title: project.title,
      meta: project.category,
      summary: project.summary,
    }));

  return (
    <PageShell>
      <Plate>
        <PlateHeader
          plate={PLATES.work.plate}
          runningHead={PLATES.work.label}
          folio={`${projects.length} plates`}
        />
        <PlateBody className="flex flex-col gap-6">
          <PlateTitle as="h1" className="max-w-[14ch]">
            Projects and <span className="text-spot">roles</span>
          </PlateTitle>
          <PlateLead>{projectsData.summary}</PlateLead>
        </PlateBody>
      </Plate>

      <FeaturedBand entries={featured} label="Selected work" />
      <IndexGrid entries={rest} label="Case plates" />
    </PageShell>
  );
}
