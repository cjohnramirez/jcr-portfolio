import { CircleUserRound, Database, Monitor } from "lucide-react";
import type { ServiceCardData } from "@/lib/portfolio-types";

type ServiceCardProps = {
  data: ServiceCardData;
  /**
   * The longest item list in the group. Shorter lists reserve the difference
   * so every divider lands on the same line across the row.
   */
  listRows: number;
};

const serviceIcons = {
  screen: Monitor,
  database: Database,
  interface: CircleUserRound,
} satisfies Record<ServiceCardData["icon"], typeof Monitor>;

/**
 * A capability card. Sits in a 1px-gap grid so the cards read as cells of one
 * specification table rather than as floating tiles.
 *
 * Horizontal padding matches PlateBody's (`px-5`, `lg:px-10`) so the card text
 * sits on the same line as the lead paragraph above the grid. It used to be
 * `p-7 lg:p-9`, which was 4px adrift at `lg` — invisible while the grid was
 * inset, obvious once the tiles went flush to the plate.
 */
export function ServiceCard({ data, listRows }: ServiceCardProps) {
  const Icon = serviceIcons[data.icon];

  // The list is bottom-aligned, so a card with fewer items started its rule
  // one line lower than its neighbours. Empty rows make every list the same
  // height — chosen over a calculated min-height because it needs no
  // arithmetic about the list's own padding, border or line height, and so
  // cannot drift when any of those change.
  const padding = Math.max(0, listRows - data.items.length);

  return (
    <article className="flex h-full min-h-[300px] flex-col justify-between gap-10 bg-plate px-5 py-7 transition-colors duration-200 hover:bg-plate-2 lg:min-h-[420px] lg:px-10 lg:py-9">
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
      <ul className="-mx-5 flex flex-col gap-2 border-t border-rule px-5 pt-5 font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2 lg:-mx-10 lg:px-10">
        {data.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
        {Array.from({ length: padding }, (_, index) => (
          <li aria-hidden="true" className="h-[1em]" key={`reserved-${index}`} />
        ))}
      </ul>
    </article>
  );
}
