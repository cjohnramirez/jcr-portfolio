import type { PortfolioBrand } from "@/lib/portfolio-types";
import { CarouselFrame } from "../shared/carousel-frame";
import { BrandIdentity } from "./brand-identity";
import { BrandInfoBlock } from "./brand-info-block";

type BrandTabProps = {
  brand: PortfolioBrand;
  isActive: boolean;
  onSelect: (id: string) => void;
};

export function BrandTab({ brand, isActive, onSelect }: BrandTabProps) {
  const panelId = `design-panel-${brand.id}`;

  return (
    <article className="border-t border-[var(--portfolio-border)] first:border-t-0">
      <button
        aria-controls={panelId}
        aria-expanded={isActive}
        className="portfolio-tab-button grid w-full gap-6 p-5 text-left focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--portfolio-accent)] lg:grid-cols-[1fr_307px_239px] lg:items-start lg:gap-10 lg:p-10"
        type="button"
        onClick={() => onSelect(brand.id)}
      >
        <BrandIdentity brand={brand} />
        <BrandInfoBlock items={brand.details} title="DETAILS" />
        <BrandInfoBlock items={brand.deliverables} title="DELIVERABLES" />
      </button>

      {isActive ? (
        <div id={panelId}>
          <CarouselFrame
            className="border-x-0 border-t-0"
            items={brand.carousel}
            label="Brand image"
          />
        </div>
      ) : null}
    </article>
  );
}
