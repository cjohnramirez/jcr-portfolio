import type { TimelineEntry } from "@/lib/portfolio-types";

type TimelineRowProps = {
  entry: TimelineEntry;
};

export function TimelineRow({ entry }: TimelineRowProps) {
  return (
    <div className="grid gap-4 text-xs font-normal uppercase leading-normal text-[var(--portfolio-text)] md:grid-cols-[160px_1fr] lg:text-[14px] xl:grid-cols-[200px_1fr]">
      <p className="whitespace-nowrap leading-normal">{entry.date}</p>
      <div className="space-y-4">
        <p>{entry.title}</p>
        {entry.description ? <p>{entry.description}</p> : null}
        {entry.details?.length ? (
          <ul className="space-y-1">
            {entry.details.map((detail) => (
              <li key={detail}>{`> ${detail}`}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
