import type { MetadataRoute } from "next";
import { getAllDesignSlugs, getAllWorkSlugs } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // One page: every section is an anchor on `/`, so it is the only static
  // route. Fragments are not separate documents to a crawler.
  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
  ];

  const detailRoutes = [
    ...getAllWorkSlugs().map((slug) => `/work/${slug}`),
    ...getAllDesignSlugs().map((slug) => `/designs/${slug}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...detailRoutes];
}
