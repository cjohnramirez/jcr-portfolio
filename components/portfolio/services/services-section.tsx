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
          `gap-px` over `bg-rule` draws the rules BETWEEN cells; the border
          closes the outer edge, so the group reads as one bounded table
          rather than three cells with two lines floating between them.
        */}
        <div className="grid gap-px border border-rule bg-rule md:grid-cols-2 xl:grid-cols-3">
          {data.cards.map((card, index) => (
            <Reveal className="h-full" key={card.title} order={index + 1}>
              <ServiceCard data={card} />
            </Reveal>
          ))}
        </div>
      </PlateBody>
    </Plate>
  );
}
