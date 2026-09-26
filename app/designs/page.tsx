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
import { creativePortfolioData } from "@/lib/portfolio-data";
import { getDesignPlate, PLATES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Designs",
  description: creativePortfolioData.summary,
  alternates: { canonical: "/designs" },
};

export default function DesignsIndexPage() {
  const entries = creativePortfolioData.brands.map((brand) => ({
    href: `${PLATES.designs.path}/${brand.id}`,
    plate: getDesignPlate(brand.id),
    title: brand.title,
    meta: brand.deliverables.join(" · "),
    summary: brand.details.join(" · "),
  }));

  return (
    <PageShell>
      <Plate>
        <PlateHeader
          plate={PLATES.designs.plate}
          runningHead={PLATES.designs.label}
          folio={`${entries.length} plates`}
        />
        <PlateBody className="flex flex-col gap-6">
          <PlateTitle as="h1" className="max-w-[14ch]">
            <span className="text-spot">Creative</span> portfolio
          </PlateTitle>
          <PlateLead>{creativePortfolioData.summary}</PlateLead>
        </PlateBody>
      </Plate>

      <IndexGrid entries={entries} label="Identity work" />
    </PageShell>
  );
}
