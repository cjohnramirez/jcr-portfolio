import type { Metadata } from "next";
import { AdditionalsSection } from "@/components/portfolio/additionals/additionals-section";
import { PageShell } from "@/components/portfolio/shared/page-shell";
import { additionalsData } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Archive",
  description: additionalsData.summary,
  alternates: { canonical: "/archive" },
};

export default function ArchivePage() {
  return (
    <PageShell>
      <AdditionalsSection data={additionalsData} headingLevel="h1" />
    </PageShell>
  );
}
