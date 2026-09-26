import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesignPlate } from "@/components/portfolio/creative/design-plate";
import { PageShell } from "@/components/portfolio/shared/page-shell";
import {
  getAllDesignSlugs,
  getDesignBySlug,
  getDesignPlate,
} from "@/lib/routes";

type DesignPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllDesignSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: DesignPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getDesignBySlug(slug);

  if (!brand) return {};

  const path = `/designs/${slug}`;
  const description = brand.details.join(" · ");
  return {
    title: brand.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: brand.title,
      description,
      url: path,
    },
  };
}

export default async function DesignDetailPage({ params }: DesignPageProps) {
  const { slug } = await params;
  const brand = getDesignBySlug(slug);

  if (!brand) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: brand.title,
    description: brand.details.join(" · "),
    creator: { "@type": "Person", name: "John Carl Ramirez" },
    keywords: brand.deliverables.join(", "),
  };

  return (
    <PageShell>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <DesignPlate brand={brand} plate={getDesignPlate(slug)} />
    </PageShell>
  );
}
