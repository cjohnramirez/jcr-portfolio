import { AboutSection } from "@/components/portfolio/sections/about-section";
import { BrandSection } from "@/components/portfolio/sections/brand-section";
import { ContactSection } from "@/components/portfolio/sections/contact-section";
import { ExperienceSection } from "@/components/portfolio/sections/experience-section";
import { HeroSection } from "@/components/portfolio/sections/hero-section";
import { ServicesSection } from "@/components/portfolio/sections/services-section";
import { WorkSection } from "@/components/portfolio/sections/work-section";
import {
  aboutData,
  contactData,
  creativePortfolioData,
  experienceData,
  featuredBrandIds,
  featuredWorkIds,
  heroData,
  homeHero,
  interfaceIds,
  motionData,
  printData,
  projectsData,
  recordData,
  servicesData,
} from "@/lib/portfolio-data";

/** Looks entries up by id, in the given order, and drops any that are missing. */
function pick<T extends { id: string }>(items: T[], ids: readonly string[]): T[] {
  return ids
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is T => item !== undefined);
}

export default function Home() {
  return (
    <main className="flex flex-col" id="main">
      <HeroSection data={homeHero} email={contactData.email} />
      <WorkSection projects={pick(projectsData.projects, featuredWorkIds)} />
      <BrandSection
        identity={pick(creativePortfolioData.brands, featuredBrandIds)}
        interfaces={pick(creativePortfolioData.brands, interfaceIds)}
        motion={motionData}
        print={printData}
      />
      <ServicesSection data={servicesData} />
      <ExperienceSection entries={experienceData} record={recordData} />
      <AboutSection data={aboutData} portrait={heroData.portrait} />
      <ContactSection data={contactData} />
    </main>
  );
}
