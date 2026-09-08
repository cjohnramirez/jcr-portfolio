import {
  creativePortfolioData,
  projectsData,
} from "./portfolio-data";
import type { PortfolioBrand, ProjectCaseStudy } from "./portfolio-types";

/**
 * The manual's table of contents.
 *
 * Plate numbers are structural, not decorative — a manual is an ordered
 * sequence, so the numbering carries real information. Detail routes derive
 * their numbers from their position within a parent (02.1, 02.2, …).
 */
export type PlateRoute = {
  path: string;
  /** Shown in the spec face as the plate's identifier. */
  plate: string;
  /** Nav label and running head. */
  label: string;
};

export const PLATES = {
  cover: { path: "/", plate: "00", label: "Cover" },
  about: { path: "/about", plate: "01", label: "The Mark" },
  work: { path: "/work", plate: "02", label: "Case Plates" },
  designs: { path: "/designs", plate: "03", label: "Identity Work" },
  archive: { path: "/archive", plate: "04", label: "Appendix" },
  contact: { path: "/contact", plate: "05", label: "Colophon" },
} as const satisfies Record<string, PlateRoute>;

/** Routes offered in the primary navigation, in reading order. */
export const NAV_PLATES: PlateRoute[] = [
  PLATES.about,
  PLATES.work,
  PLATES.designs,
  PLATES.archive,
  PLATES.contact,
];

// --- Work -----------------------------------------------------------------

export function getAllWorkSlugs(): string[] {
  return projectsData.projects.map((project) => project.id);
}

export function getWorkBySlug(slug: string): ProjectCaseStudy | undefined {
  return projectsData.projects.find((project) => project.id === slug);
}

/** `02.1`-style plate number derived from position in the index. */
export function getWorkPlate(slug: string): string {
  const index = projectsData.projects.findIndex((p) => p.id === slug);
  return index === -1 ? PLATES.work.plate : `${PLATES.work.plate}.${index + 1}`;
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
    ? PLATES.designs.plate
    : `${PLATES.designs.plate}.${index + 1}`;
}

// --- Active-route matching ------------------------------------------------

/**
 * True when `pathname` is the plate itself or one of its detail pages, so
 * `/work/gcs-system` still marks `/work` as current in the navigation.
 */
export function isPlateActive(pathname: string, platePath: string): boolean {
  if (platePath === "/") return pathname === "/";
  return pathname === platePath || pathname.startsWith(`${platePath}/`);
}
