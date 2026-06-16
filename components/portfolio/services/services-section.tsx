import type { ServicesData } from "@/lib/portfolio-types";
import { ServiceCard } from "./service-card";
import { SectionShell } from "../shared/section-shell";
import { StatusMarker } from "../shared/status-marker";

type ServicesSectionProps = {
  data: ServicesData;
};

export function ServicesSection({ data }: ServicesSectionProps) {
  return (
    <SectionShell id="services" className="flex flex-col gap-10 p-5 lg:min-h-[928px] lg:p-10">
      <div className="flex items-center justify-between gap-4 text-[var(--portfolio-text)]">
        <StatusMarker label={data.sectionLabel} />
        <p className="text-xs uppercase leading-none lg:text-[14px]">{data.status}</p>
      </div>

      <div className="flex flex-col gap-5 text-[var(--portfolio-text)]">
        <h2 className="max-w-[739px] text-[38px] font-normal uppercase leading-none tracking-normal sm:text-[52px] lg:text-[64px]">
          {data.title.before}{" "}
          <span className="text-[var(--portfolio-accent)]">
            {data.title.accented}
          </span>{" "}
          {data.title.after}
        </h2>
        <p className="text-xs font-normal uppercase leading-normal lg:text-[14px]">
          {data.summary}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-[37px]">
        {data.cards.map((card) => (
          <ServiceCard key={card.title} data={card} />
        ))}
      </div>
    </SectionShell>
  );
}
