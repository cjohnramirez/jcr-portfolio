import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/portfolio/case/case-study";
import { WebsiteSplit } from "@/components/portfolio/case/website-split";
import { getCaseContent } from "@/lib/case-studies";
import type { CarouselItem, MediaItem } from "@/lib/portfolio-types";
import { getAllWorkSlugs, getNextWork, getWorkBySlug, getWorkPlate } from "@/lib/routes";

type WorkPageProps = {
  // `params` is a Promise in this version of Next — see
  // node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

// Every case study is known at build time, so an unlisted slug is a 404
// rather than an on-demand render.
export const dynamicParams = false;

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);

  if (!project) return {};

  const path = `/work/${slug}`;
  const description = getCaseContent(slug)?.tagline ?? project.summary;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: { type: "article", title: project.title, description, url: path },
  };
}

function toMedia(items: CarouselItem[]): MediaItem[] {
  return items
    .filter((item) => item.imageSrc)
    .map((item) => ({ src: item.imageSrc as string, alt: item.imageAlt ?? item.title, caption: item.title }));
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  const content = getCaseContent(slug);

  if (!project || !content) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    creator: { "@type": "Person", name: "John Carl Ramirez" },
    about: project.category,
    keywords: [...project.stack.items, ...project.skills.items].join(", "),
  };

  const shared = {
    title: content.name ?? project.title.split(": ")[0],
    plate: getWorkPlate(slug),
    kicker: "Case Plates",
    back: { href: "/#work", label: "All work" },
    content,
    notes: project.notes,
    stack: project.stack.items,
    next: getNextWork(slug),
  };

  // A brand-system project shows its applications as the screens, and keeps
  // its deck as the full guidelines.
  const applications = project.galleries?.[0]?.items.filter((item) => !/dark/i.test(item.caption ?? "")) ?? [];
  const isBrand = applications.length > 0 && project.carousel.length > 10;
  const screens = content.screens ?? (isBrand ? applications : toMedia(project.carousel));

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
      {content.layout === "website" ? (
        <WebsiteSplit {...shared} screens={toMedia(project.carousel).slice(1)} />
      ) : (
        <CaseStudy
          {...shared}
          cover={content.coverPair ? undefined : screens[0]}
          deck={isBrand ? project.carousel : undefined}
          links={project.links}
          screens={content.coverPair ? screens : screens.slice(1)}
        />
      )}
    </>
  );
}
