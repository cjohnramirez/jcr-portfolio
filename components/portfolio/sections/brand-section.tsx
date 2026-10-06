import type { MotionPiece, PortfolioBrand, PrintPiece } from "@/lib/portfolio-types";
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

type BrandSectionProps = {
  identity: PortfolioBrand[];
  interfaces: PortfolioBrand[];
  motion: MotionPiece[];
  print: PrintPiece[];
};

export function BrandSection({ identity, interfaces, motion, print }: BrandSectionProps) {
  const [featured, ...restIdentity] = identity.map(fromBrand);

  const items: BrowserItem[] = [
    ...restIdentity,
    ...interfaces.map(fromBrand),
    ...motion.map((piece) => ({
      id: piece.id,
      kind: "motion" as const,
      title: piece.title,
      meta: piece.format,
      summary: piece.format,
      image: { src: piece.poster, alt: "" },
      motion: piece,
    })),
    ...print.map((piece) => ({
      id: piece.id,
      kind: "print" as const,
      title: piece.title,
      meta: piece.format,
      summary: `${piece.format} · ${piece.items.length} images`,
      image: piece.cover,
      print: piece,
    })),
  ];

  return (
    <SectionBand section={SECTIONS.brand}>
      <SectionHeader
        lead="Identity systems, interfaces, motion and print. Search the index or filter by discipline."
        section={SECTIONS.brand}
        title="Brand and design"
      />
      {featured ? <WorkBrowser featured={featured} items={items} /> : null}
    </SectionBand>
  );
}
