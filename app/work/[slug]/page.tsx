import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePlate } from "@/components/portfolio/work/case-plate";
import { PageShell } from "@/components/portfolio/shared/page-shell";
import { getAllWorkSlugs, getWorkBySlug, getWorkPlate } from "@/lib/routes";

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

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);

  if (!project) return {};

  const path = `/work/${slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: path,
    },
  };
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);

  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    creator: { "@type": "Person", name: "John Carl Ramirez" },
    about: project.category,
    keywords: [...project.stack.items, ...project.skills.items].join(", "),
  };

  return (
    <PageShell>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <CasePlate plate={getWorkPlate(slug)} project={project} />
    </PageShell>
  );
}
