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

/**
 * A capability card. Sits in a 1px-gap grid so the cards read as cells of one
 * specification table rather than as floating tiles.
 */
export function ServiceCard({ data }: ServiceCardProps) {
  const Icon = serviceIcons[data.icon];

  return (
    <article className="flex h-full min-h-[300px] flex-col justify-between gap-10 bg-plate p-7 transition-colors duration-200 hover:bg-plate-2 lg:min-h-[420px] lg:p-9">
      <div className="flex flex-col gap-5">
        <Icon aria-hidden="true" className="size-7 text-ink-2" strokeWidth={1.5} />
        <div className="flex flex-col gap-3">
          <h3 className="max-w-[18ch] text-[clamp(1.5rem,1rem+1.4vw,2rem)] leading-[1.05] text-ink">
            {data.title}
          </h3>
          <p className="text-sm leading-relaxed text-ink-2">{data.description}</p>
        </div>
      </div>

      {/*
        The rule above the list is a divider across the whole tile, not a
        short line floating inside the text column. Negative margins cancel
        the card's padding so it meets both edges, and the padding is put
        back on the list itself so the items stay aligned with the prose.
      */}
      <ul className="-mx-7 flex flex-col gap-2 border-t border-rule px-7 pt-5 font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2 lg:-mx-9 lg:px-9">
        {data.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
