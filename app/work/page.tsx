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
import { projectsData } from "@/lib/portfolio-data";
import { getWorkPlate, PLATES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Work",
  description: projectsData.summary,
  alternates: { canonical: "/work" },
};

export default function WorkIndexPage() {
  const entries = projectsData.projects.map((project) => ({
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
          folio={`${entries.length} plates`}
        />
        <PlateBody className="flex flex-col gap-6">
          <PlateTitle as="h1" className="max-w-[14ch]">
            Projects and <span className="text-spot">roles</span>
          </PlateTitle>
          <PlateLead>{projectsData.summary}</PlateLead>
        </PlateBody>
      </Plate>

      <IndexGrid entries={entries} label="Case plates" />
    </PageShell>
  );
}
