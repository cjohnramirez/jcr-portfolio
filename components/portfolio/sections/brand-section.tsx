import type { MotionPiece, PortfolioBrand, PrintPiece, ProjectCaseStudy } from "@/lib/portfolio-types";
import { SECTIONS } from "@/lib/routes";
import { type BrowserItem, WorkBrowser } from "../fx/work-browser";
import { SectionBand, SectionHeader } from "../shared/section-header";

/** First sentence of a summary, as a one-line descriptor. */
function firstSentence(text = "") {
  const sentence = text.split(/(?<=[a-z])\. /)[0] ?? text;
  return sentence.endsWith(".") ? sentence : `${sentence}.`;
}

function fromBrand(brand: PortfolioBrand): BrowserItem {
  const kind = brand.kind ?? "identity";

  return {
    id: brand.id,
    kind,
    title: brand.title,
    meta:
      kind === "interface"
        ? brand.meta.replace(/^>\s*/, "")
        : brand.deliverables.slice(0, 2).join(" · "),
    summary: firstSentence(brand.summary),
    image: brand.cover ?? {
      src: brand.carousel[0]?.imageSrc ?? "",
      alt: brand.carousel[0]?.imageAlt ?? brand.title,
    },
    href: `/designs/${brand.id}`,
  };
}

/**
 * The Enduro Group case study as an identity tile: it is filed under work,
 * but it is brand work, and it leads the Enduro identities that follow it.
 */
function fromProject(project: ProjectCaseStudy, name: string): BrowserItem {
  const image = project.galleries?.[0]?.items[0];

  return {
    id: project.id,
    kind: "identity",
    title: name,
    meta: "Brand guidelines · Four brand systems",
    summary: firstSentence(project.summary),
    image: { src: image?.src ?? "", alt: image?.alt ?? name },
    href: `/work/${project.id}`,
  };
}

type BrandSectionProps = {
  /** A work case study that leads the identity tab. */
  lead?: { project: ProjectCaseStudy; name: string };
  identity: PortfolioBrand[];
  interfaces: PortfolioBrand[];
  motion: MotionPiece[];
  print: PrintPiece[];
};

export function BrandSection({ lead, identity, interfaces, motion, print }: BrandSectionProps) {
  const items: BrowserItem[] = [
    ...(lead ? [fromProject(lead.project, lead.name)] : []),
    ...identity.map(fromBrand),
    ...motion.map((piece) => ({
      id: piece.id,
      kind: "motion" as const,
      title: piece.title,
      meta: piece.format,
      summary: piece.summary ?? "",
      image: { src: piece.poster, alt: "" },
      motion: piece,
    })),
    ...print.map((piece) => ({
      id: piece.id,
      kind: "print" as const,
      title: piece.title,
      meta: piece.format,
      summary: piece.summary ?? `${piece.items.length} images`,
      image: piece.cover,
      print: piece,
    })),
    ...interfaces.map(fromBrand),
  ];

  return (
    <SectionBand section={SECTIONS.brand}>
      <SectionHeader
        lead="Identity systems, interfaces, motion and print. Each identity opens its full guidelines."
        section={SECTIONS.brand}
        title="Brand and design"
      />
      <WorkBrowser items={items} />
    </SectionBand>
  );
}
