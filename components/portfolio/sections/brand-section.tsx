import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { MotionPiece, PortfolioBrand, PrintPiece } from "@/lib/portfolio-types";
import { SECTIONS } from "@/lib/routes";
import { DirectionAwareHover } from "../fx/direction-aware-hover";
import { HoverHighlight } from "../fx/hover-highlight";
import { MotionCard } from "../fx/motion-card";
import { PrintCard } from "../fx/print-card";
import { Tabs } from "../fx/tabs";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { Reveal } from "../shared/reveal";
import { SectionBand, SectionHeader } from "../shared/section-header";

function BrandCard({ brand }: { brand: PortfolioBrand }) {
  const image = brand.cover ?? {
    src: brand.carousel[0]?.imageSrc ?? "",
    alt: brand.carousel[0]?.imageAlt ?? brand.title,
  };
  const descriptor = brand.summary?.split(". ")[0];

  return (
    <Link
      className="group flex h-full flex-col border border-rule bg-plate"
      href={`/designs/${brand.id}`}
    >
      <DirectionAwareHover
        className="aspect-[4/3] w-full bg-plate-2"
        overlay={
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] font-medium">
            {brand.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        }
      >
        <CloudinaryImage
          alt={image.alt}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          fill
          sizes="(min-width: 1440px) 330px, (min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          src={image.src}
        />
      </DirectionAwareHover>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="label text-ink-2">{brand.kind === "interface" ? brand.meta.replace(/^>\s*/, "") : brand.deliverables[1] ?? brand.deliverables[0]}</p>
        <h3 className="text-[clamp(1.75rem,1.4rem+0.8vw,2.125rem)] leading-none text-ink">
          {brand.title}
        </h3>
        {descriptor ? (
          <p className="text-[15px] leading-snug text-ink-2">
            {descriptor.endsWith(".") ? descriptor : `${descriptor}.`}
          </p>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[15px] font-medium text-spot">
          {brand.kind === "interface" ? "View design" : "View brand system"}
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </span>
      </div>
    </Link>
  );
}

function CardGrid({ brands, label }: { brands: PortfolioBrand[]; label: string }) {
  return (
    <HoverHighlight
      className="gap-6 md:grid-cols-2 md:gap-5 xl:grid-cols-4"
      items={brands.map((brand, index) => ({
        key: brand.id,
        node: (
          <Reveal className="h-full" order={index}>
            <BrandCard brand={brand} />
          </Reveal>
        ),
      }))}
      label={label}
    />
  );
}

type BrandSectionProps = {
  identity: PortfolioBrand[];
  interfaces: PortfolioBrand[];
  motion: MotionPiece[];
  print: PrintPiece[];
};

export function BrandSection({ identity, interfaces, motion, print }: BrandSectionProps) {
  return (
    <SectionBand section={SECTIONS.brand}>
      <SectionHeader
        lead="Identity systems, interfaces, motion and print. Each identity opens its full guidelines."
        section={SECTIONS.brand}
        title="Brand and design"
      />
      <Tabs
        items={[
          {
            id: "identity",
            label: "Identity",
            count: identity.length,
            panel: <CardGrid brands={identity} label="Brand identity" />,
          },
          {
            id: "interface",
            label: "Interface",
            count: interfaces.length,
            panel: <CardGrid brands={interfaces} label="Interface design" />,
          },
          {
            id: "motion",
            label: "Motion",
            count: motion.length,
            lazy: true,
            panel: (
              <ul aria-label="Motion" className="grid gap-6 sm:grid-cols-2 md:gap-5 xl:grid-cols-3">
                {motion.map((piece) => (
                  <li key={piece.id}>
                    <MotionCard piece={piece} />
                  </li>
                ))}
              </ul>
            ),
          },
          {
            id: "print",
            label: "Print and apparel",
            shortLabel: "Print",
            count: print.length,
            lazy: true,
            panel: (
              <ul aria-label="Print and apparel" className="grid gap-6 sm:grid-cols-2 md:gap-5 xl:grid-cols-3">
                {print.map((piece) => (
                  <li key={piece.id}>
                    <PrintCard piece={piece} />
                  </li>
                ))}
              </ul>
            ),
          },
        ]}
        label="Design disciplines"
      />
    </SectionBand>
  );
}
