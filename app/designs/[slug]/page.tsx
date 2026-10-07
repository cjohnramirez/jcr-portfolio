import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandStudy } from "@/components/portfolio/case/brand-study";
import { CaseStudy } from "@/components/portfolio/case/case-study";
import { WebsiteSplit } from "@/components/portfolio/case/website-split";
import { getCaseContent } from "@/lib/case-studies";
import type { CarouselItem, MediaItem, PortfolioBrand } from "@/lib/portfolio-types";
import { getAllDesignSlugs, getDesignBySlug, getDesignPlate, getNextDesign } from "@/lib/routes";

type DesignPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllDesignSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: DesignPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getDesignBySlug(slug);

  if (!brand) return {};

  const path = `/designs/${slug}`;
  const description = brand.summary ?? brand.details.join(", ");
  return {
    title: brand.title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", title: brand.title, description, url: path },
  };
}

function toMedia(items: CarouselItem[]): MediaItem[] {
  return items
    .filter((item) => item.imageSrc)
    .map((item) => ({ src: item.imageSrc as string, alt: item.imageAlt ?? item.title, caption: item.title }));
}

/** Interface studies keep their facts in `details`, not long notes. */
function notesFor(brand: PortfolioBrand) {
  if (brand.notes?.length) return brand.notes;
  return [
    { title: "At a glance", description: `${brand.details.join(". ")}.` },
    { title: "Deliverables", description: `${brand.deliverables.join(", ")}.` },
  ];
}

export default async function DesignDetailPage({ params }: DesignPageProps) {
  const { slug } = await params;
  const brand = getDesignBySlug(slug);
  const content = getCaseContent(slug);

  if (!brand || !content) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: brand.title,
    description: brand.summary ?? brand.details.join(", "),
    creator: { "@type": "Person", name: "John Carl Ramirez" },
    keywords: brand.deliverables.join(", "),
  };

  const plate = getDesignPlate(slug);
  const next = getNextDesign(slug);
  const sheets = toMedia(brand.carousel);
  let body;

  if (content.layout === "brand") {
    const hero = brand.cover ?? sheets[0];
    const applications = (brand.galleries?.[0]?.items ?? []).filter((item) => item.src !== hero?.src);
    body = (
      <BrandStudy
        applications={applications}
        content={content}
        deck={brand.carousel}
        hero={hero}
        meta={brand.meta.replace(/^>\s*/, "")}
        next={next}
        plate={plate}
        title={brand.title}
      />
    );
  } else {
    const shared = {
      title: brand.title,
      plate,
      kicker: "Identity Work",
      back: { href: "/#brand", label: "All brand and design" },
      content,
      notes: notesFor(brand),
      stack: brand.deliverables,
      next,
    };
    // The CS Website sheets are slices of the same page the frame already
    // shows, so they are not repeated as separate screens.
    body =
      content.layout === "website" ? (
        <WebsiteSplit {...shared} screens={slug === "cs-website" ? [] : sheets} />
      ) : (
        <CaseStudy {...shared} cover={sheets[0]} screens={sheets.slice(1)} />
      );
  }

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
      {body}
    </>
  );
}
