import type { ServicesData } from "@/lib/portfolio-types";
import { SECTIONS } from "@/lib/routes";
import { SpotlightCard } from "../fx/spotlight-card";
import { Reveal } from "../shared/reveal";
import { SectionBand, SectionHeader } from "../shared/section-header";

/** Plain-language titles for the three practice areas. */
const TITLES = ["Full-stack development", "Data and machine learning", "UI/UX and brand design"];

export function ServicesSection({ data }: { data: ServicesData }) {
  return (
    <SectionBand section={SECTIONS.services} tone="plate">
      <SectionHeader
        lead="Three practice areas, one standard: the data model first, then the interface."
        section={SECTIONS.services}
      />
      <ul className="grid gap-5 lg:grid-cols-3 xl:gap-8">
        {data.cards.map((card, index) => (
          <li key={card.title}>
            <Reveal className="h-full" order={index}>
              <SpotlightCard className="h-full border border-rule bg-plate">
                <article className="flex min-h-[280px] flex-col gap-4 p-7 md:p-9">
                  <span className="label text-spot">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-[clamp(1.875rem,1.5rem+0.9vw,2.25rem)] leading-none text-ink">
                    {TITLES[index] ?? card.title}
                  </h3>
                  <p className="text-[16px] leading-relaxed text-ink-2">{card.description}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                    {card.items.map((item) => (
                      <li
                        className="rounded-full border border-rule px-3 py-1.5 text-[13px] text-ink"
                        key={item}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </SectionBand>
  );
}
