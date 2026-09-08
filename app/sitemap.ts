import type { MetadataRoute } from "next";
import { getAllDesignSlugs, getAllWorkSlugs, NAV_PLATES, PLATES } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [PLATES.cover, ...NAV_PLATES].map((plate) => ({
    url: `${SITE_URL}${plate.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: plate.path === "/" ? 1 : 0.8,
  }));

  const detailRoutes = [
    ...getAllWorkSlugs().map((slug) => `${PLATES.work.path}/${slug}`),
    ...getAllDesignSlugs().map((slug) => `${PLATES.designs.path}/${slug}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...detailRoutes];
}
