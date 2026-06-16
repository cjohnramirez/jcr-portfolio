import { CircleUserRound, Database, Monitor } from "lucide-react";
import type { ServiceCardData } from "@/lib/portfolio-types";

type ServiceCardProps = {
  data: ServiceCardData;
};

const serviceIcons = {
  screen: Monitor,
  database: Database,
  interface: CircleUserRound,
} satisfies Record<ServiceCardData["icon"], typeof Monitor>;

export function ServiceCard({ data }: ServiceCardProps) {
  const Icon = serviceIcons[data.icon];

  return (
    <article className="flex min-h-[320px] flex-col justify-between gap-12 border border-[var(--portfolio-button)] p-7 text-[var(--portfolio-text)] sm:min-h-[480px] lg:min-h-[539px] lg:p-10">
      <div className="flex flex-col gap-5">
        <Icon aria-hidden="true" className="size-9" strokeWidth={1.5} />
        <div className="flex flex-col gap-2.5">
          <h3 className="max-w-[260px] text-[28px] font-normal uppercase leading-none tracking-normal lg:max-w-[242px] lg:text-[36px]">
            {data.title}
          </h3>
          <p className="text-xs font-normal uppercase leading-normal lg:text-[14px]">
            {data.description}
          </p>
        </div>
      </div>

      <ul className="space-y-0 text-xs font-normal uppercase leading-normal lg:text-[14px]">
        {data.items.map((item) => (
          <li key={item} className="before:mr-2 before:content-['>']">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
