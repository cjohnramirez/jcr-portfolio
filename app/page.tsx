import { AboutSection } from "@/components/portfolio/about/about-section";
import { AdditionalsSection } from "@/components/portfolio/additionals/additionals-section";
import { CreativeSection } from "@/components/portfolio/creative/creative-section";
import { FooterSection } from "@/components/portfolio/footer/footer-section";
import { HeroSection } from "@/components/portfolio/hero/hero-section";
import { PortfolioNav } from "@/components/portfolio/navigation/portfolio-nav";
import { ProjectsSection } from "@/components/portfolio/projects/projects-section";
import { ServicesSection } from "@/components/portfolio/services/services-section";
import {
  additionalsData,
  aboutData,
  contactAction,
  creativePortfolioData,
  footerData,
  heroData,
  navItems,
  projectsData,
  servicesData,
} from "@/lib/portfolio-data";

export default function Home() {
  return (
    <>
      <PortfolioNav items={navItems} action={contactAction} />
      <main className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-5 bg-[var(--portfolio-bg)] p-5 pt-[100px] text-[var(--portfolio-text)] lg:pt-[120px]">
        <HeroSection data={heroData} />
        <AboutSection data={aboutData} />
        <ServicesSection data={servicesData} />
        <ProjectsSection data={projectsData} />
        <CreativeSection data={creativePortfolioData} />
        <AdditionalsSection data={additionalsData} />
        <FooterSection data={footerData} />
      </main>
    </>
  );
}
