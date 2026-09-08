/**
 * Canonical origin for metadata, sitemap, robots, and JSON-LD.
 *
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment. The fallback is a
 * placeholder — absolute URLs in Open Graph tags and the sitemap will point at
 * the wrong host until it is set.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jcr-portfolio.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "John Carl Ramirez";
export const SITE_TAGLINE = "Developer & Brand Designer";
export const SITE_DESCRIPTION =
  "Full-stack developer, researcher, and brand designer based in Cagayan de Oro. Systems, algorithm research, and identity work.";
