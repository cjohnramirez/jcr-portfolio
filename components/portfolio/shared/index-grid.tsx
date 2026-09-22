import Link from "next/link";
import { Reveal } from "./reveal";

export type IndexEntry = {
  href: string;
  /** Plate number shown in the spec face, e.g. `02.1`. */
  plate: string;
  title: string;
  meta: string;
  summary?: string;
};

type IndexGridProps = {
  entries: IndexEntry[];
  label: string;
};

/**
 * The manual's contents listing — used on `/`, `/work` and `/designs`.
 *
 * A 1px-gap grid rather than separated cards: the entries are rows of one
 * table of contents, not floating objects. The plate number leads, because
 * that is how you find a page in a manual.
 *
 * `h-full` has to run unbroken from the grid cell down to the link, or the
 * link only covers its own content and the hover wash stops short of the
 * bottom of the tile. The Reveal wrapper was the break.
 */
export function IndexGrid({ entries, label }: IndexGridProps) {
  return (
    <ul aria-label={label} className="grid gap-px bg-rule sm:grid-cols-2">
      {entries.map((entry, index) => (
        <li key={entry.href} className="bg-plate">
          <Reveal className="h-full" order={index}>
            <Link
              className="group flex h-full flex-col gap-4 p-6 transition-colors duration-200 hover:bg-plate-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-spot lg:p-9"
              href={entry.href}
            >
              <span className="flex items-baseline gap-3 font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2">
                <span className="tabular-nums text-mark">{entry.plate}</span>
                <span>{entry.meta}</span>
              </span>

              <span className="text-[clamp(1.375rem,1rem+1.2vw,2rem)] leading-[1.05] text-ink">
                {entry.title}
              </span>

              {entry.summary ? (
                <span className="line-clamp-3 text-sm leading-relaxed text-ink-2">
                  {entry.summary}
                </span>
              ) : null}

              <span
                aria-hidden="true"
                className="mt-auto pt-4 font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2 transition-colors duration-200 group-hover:text-spot"
              >
                Open plate →
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
