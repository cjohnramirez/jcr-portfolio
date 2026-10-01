import { HeroSection } from "@/components/portfolio/hero/hero-section";
import { ServicesSection } from "@/components/portfolio/services/services-section";
import { IndexGrid } from "@/components/portfolio/shared/index-grid";
import { PageShell } from "@/components/portfolio/shared/page-shell";
import { FeaturedBand } from "@/components/portfolio/work/featured-band";
import {
  creativePortfolioData,
  heroData,
  projectsData,
  servicesData,
} from "@/lib/portfolio-data";
import { getDesignPlate, getWorkPlate, PLATES } from "@/lib/routes";

export default function Home() {
  const featuredWork = projectsData.projects
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

  const workEntries = projectsData.projects
    .filter((project) => !project.featured)
    .map((project) => ({
      href: `${PLATES.work.path}/${project.id}`,
      plate: getWorkPlate(project.id),
      title: project.title,
      meta: project.category,
      summary: project.summary,
    }));

  const designEntries = creativePortfolioData.brands.map((brand) => ({
    href: `${PLATES.designs.path}/${brand.id}`,
    plate: getDesignPlate(brand.id),
    title: brand.title,
    meta: brand.deliverables.join(" · "),
    summary: brand.details.join(" · "),
  }));

  return (
    <PageShell>
      <HeroSection data={heroData} />
      <ServicesSection data={servicesData} />
      <FeaturedBand entries={featuredWork} label="Selected work" />
      <IndexGrid entries={workEntries} label="Case plates" />
      <IndexGrid entries={designEntries} label="Identity work" />
    </PageShell>
  );
}
