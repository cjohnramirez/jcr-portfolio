import type { ServicesData } from "@/lib/portfolio-types";
import { Plate, PlateBody, PlateHeader, PlateLead, PlateTitle } from "../shared/plate";
import { Reveal } from "../shared/reveal";
import { ServiceCard } from "./service-card";

type ServicesSectionProps = {
  data: ServicesData;
  headingLevel?: "h1" | "h2";
};

export function ServicesSection({
  data,
  headingLevel = "h2",
}: ServicesSectionProps) {
  // Every card reserves room for the longest list, so the dividers land on one
  // line across the row instead of stepping with each card's item count.
  const listRows = Math.max(...data.cards.map((card) => card.items.length));

  return (
    <Plate id="services">
      <PlateHeader plate="00.1" runningHead="Capabilities" folio={data.status} />

      <PlateBody className="flex flex-col gap-10 lg:gap-14">
        <div className="flex flex-col gap-6">
          <PlateTitle as={headingLevel} className="max-w-[18ch]">
            {data.title.before}{" "}
            <span className="text-spot">{data.title.accented}</span>{" "}
            {data.title.after}
          </PlateTitle>
          <PlateLead>{data.summary}</PlateLead>
        </div>

        {/*
          Full-bleed to the plate on three sides: the negative margins cancel
          PlateBody's padding so the tiles meet the plate's left, right and
          bottom edges, and only the top keeps a rule — that one is doing real
          work, separating the lead from the grid. A box drawn on all four
          sides left a strip of plate showing outside it, which read as the
          table floating rather than as part of the plate.

          `gap-px` over `bg-rule` still draws the rules BETWEEN cells.
        */}
        <div className="-mx-5 -mb-8 grid gap-px border-t border-rule bg-rule md:grid-cols-2 lg:-mx-10 lg:-mb-12 xl:grid-cols-3">
          {data.cards.map((card, index) => (
            <Reveal className="h-full" key={card.title} order={index + 1}>
              <ServiceCard data={card} listRows={listRows} />
            </Reveal>
          ))}
        </div>
      </PlateBody>
    </Plate>
  );
}
