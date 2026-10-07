import type { CSSProperties } from "react";
import { getImageMeta } from "@/lib/image-manifest";
import type { CarouselItem } from "@/lib/portfolio-types";
import { CarouselFrame } from "../shared/carousel-frame";
import { Label } from "./parts";

/**
 * The "Full guidelines" section: heading, sheet and controls together fit one
 * viewport. The sheet is as wide as the height left over allows, at its own
 * ratio. The reserve is the header, the heading row, the control bar (two rows
 * on phones) and the gaps between them.
 */
export function GuidelinesDeck({ deck, title }: { deck: CarouselItem[]; title: string }) {
  const meta = deck[0]?.imageSrc ? getImageMeta(deck[0].imageSrc) : undefined;
  const ratio = meta ? meta.width / meta.height : 16 / 9;

  return (
    <section className="mx-auto flex max-w-[1440px] justify-center px-4 pb-16 md:px-8 lg:pb-24 xl:px-16">
      <div
        className="flex w-full flex-col gap-6 [--deck-reserve:21rem] sm:[--deck-reserve:18rem] lg:[--deck-reserve:17rem]"
        style={{ maxWidth: `max(18rem, calc((100svh - var(--deck-reserve)) * ${ratio.toFixed(4)}))` } as CSSProperties}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[clamp(2rem,1.5rem+1.6vw,3.25rem)] leading-none text-ink">Full guidelines</h2>
          <Label>{deck.length} pages</Label>
        </div>
        <CarouselFrame items={deck} label={`${title} guidelines`} />
      </div>
    </section>
  );
}
