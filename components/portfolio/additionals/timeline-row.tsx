import type { TimelineEntry } from "@/lib/portfolio-types";

type TimelineRowProps = {
  entry: TimelineEntry;
};

/**
 * One dated entry in the appendix.
 *
 * Returns the `<dt>`/`<dd>` pair without a wrapper. A `<dl>` may only directly
 * contain `dt`, `dd`, or a single `div` grouping them — nesting them two levels
 * deep inside the Reveal wrapper *and* a grid div made the list invalid, which
 * axe flags as `definition-list` and `dlitem`. The grid now lives on the Reveal.
 */
export function TimelineRow({ entry }: TimelineRowProps) {
  return (
    <>
      <dt className="font-spec text-[11px] uppercase leading-none tracking-[0.08em] tabular-nums text-ink-2">
        {entry.date}
      </dt>
      <dd className="flex flex-col gap-3 text-sm leading-relaxed text-ink lg:text-base">
        <p>{entry.title}</p>
        {entry.description ? (
          <p className="text-ink-2">{entry.description}</p>
        ) : null}
        {entry.details?.length ? (
          <ul className="flex flex-col gap-1 font-spec text-[11px] uppercase tracking-[0.08em] text-ink-2">
            {entry.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        ) : null}
      </dd>
    </>
  );
}
