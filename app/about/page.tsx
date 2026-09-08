import type { Metadata } from "next";
import { AboutSection } from "@/components/portfolio/about/about-section";
import { PageShell } from "@/components/portfolio/shared/page-shell";
import { aboutData } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "About",
  description: aboutData.summary,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutSection data={aboutData} headingLevel="h1" />
    </PageShell>
  );
}
