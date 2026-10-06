import {
  creativePortfolioData,
  projectsData,
} from "./portfolio-data";
import type { PortfolioBrand, ProjectCaseStudy } from "./portfolio-types";

/**
 * The home page's table of contents.
 *
 * Everything outside the case studies lives on one page, so navigation is a
 * set of in-page anchors. Numbers run 01 to 06 down the page; detail routes
 * borrow their parent's number (01.2 is the second case study).
 */
export type Section = {
  id: string;
  /** Two-digit section number, shown in the spec face. */
  number: string;
  /** Plain heading and nav label. */
  label: string;
  /** The editorial name, set as a small italic subtitle. */
  subtitle: string;
};

export const SECTIONS = {
  work: { id: "work", number: "01", label: "Work", subtitle: "Case Plates" },
  brand: { id: "brand", number: "02", label: "Brand", subtitle: "Identity Work" },
  services: { id: "services", number: "03", label: "How I work", subtitle: "Practice" },
  experience: {
    id: "experience",
    number: "04",
    label: "Experience",
    subtitle: "Record",
  },
  about: { id: "about", number: "05", label: "About", subtitle: "The Mark" },
  contact: { id: "contact", number: "06", label: "Contact", subtitle: "Colophon" },
} as const satisfies Record<string, Section>;

/** Sections offered in the primary navigation, in reading order. */
export const NAV_SECTIONS: Section[] = [
  SECTIONS.work,
  SECTIONS.brand,
  SECTIONS.about,
  SECTIONS.contact,
];

/** Every section, in page order. The scroll spy watches these. */
export const ALL_SECTIONS: Section[] = Object.values(SECTIONS);

/** Absolute in-page link, so it works from detail routes too. */
export function sectionHref(section: Section): string {
  return `/#${section.id}`;
}

// --- Work -----------------------------------------------------------------

export function getAllWorkSlugs(): string[] {
  return projectsData.projects.map((project) => project.id);
}

export function getWorkBySlug(slug: string): ProjectCaseStudy | undefined {
  return projectsData.projects.find((project) => project.id === slug);
}

/** `01.1`-style plate number derived from position in the index. */
export function getWorkPlate(slug: string): string {
  const index = projectsData.projects.findIndex((p) => p.id === slug);
  return index === -1 ? SECTIONS.work.number : `${SECTIONS.work.number}.${index + 1}`;
}

// --- Designs --------------------------------------------------------------

export function getAllDesignSlugs(): string[] {
  return creativePortfolioData.brands.map((brand) => brand.id);
}

export function getDesignBySlug(slug: string): PortfolioBrand | undefined {
  return creativePortfolioData.brands.find((brand) => brand.id === slug);
}

export function getDesignPlate(slug: string): string {
  const index = creativePortfolioData.brands.findIndex((b) => b.id === slug);
  return index === -1
    ? SECTIONS.brand.number
    : `${SECTIONS.brand.number}.${index + 1}`;
}
