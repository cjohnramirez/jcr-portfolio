import Link from "next/link";
import type { ProjectCaseStudy } from "@/lib/portfolio-types";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { Reveal } from "../shared/reveal";

export type FeaturedEntry = {
  href: string;
  /** Plate number shown in the spec face, e.g. `02.1`. */
  plate: string;
  title: string;
  meta: string;
  summary: string;
  sheet?: ProjectCaseStudy["carousel"][number];
  stack: string[];
};

type FeaturedBandProps = {
  entries: FeaturedEntry[];
  label: string;
};

/**
 * The selected-work band, above the index on `/` and `/work`.
 *
 * The index grid treats every plate as one row of a contents listing, which is
 * right for finding a page and wrong for saying which pages matter. This band
 * is the editorial answer: the same entries, given a sheet and room to breathe,
 * so the two builds read as the work and the rest as the record.
 *
 * Membership comes from `featured` on the case study itself rather than a list
 * of ids kept here, so promoting the next project is a one-line change in
 * lib/portfolio-data.ts with nothing on this side to keep in sync.
 *
 * Only the first few stack items are shown. The full list lives on the plate,
 * and a band that prints sixteen technologies stops being a summary.
 */
const STACK_SHOWN = 6;

export function FeaturedBand({ entries, label }: FeaturedBandProps) {
  if (entries.length === 0) return null;

  return (
    <ul aria-label={label} className="grid gap-px bg-rule lg:grid-cols-2">
      {entries.map((entry, index) => (
        <li className="bg-plate" key={entry.href}>
          <Reveal order={index}>
            <Link
              className="group flex h-full flex-col transition-colors duration-200 hover:bg-plate-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-spot"
              href={entry.href}
            >
              {entry.sheet?.imageSrc ? (
                <div className="relative aspect-[1.86] w-full overflow-hidden bg-plate-2">
                  <CloudinaryImage
                    alt={entry.sheet.imageAlt ?? ""}
                    className="h-full w-full object-cover object-top"
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    src={entry.sheet.imageSrc}
                  />
                </div>
              ) : null}

              <div className="flex flex-1 flex-col gap-4 p-6 lg:p-9">
                <span className="flex items-baseline gap-3 font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2">
                  <span className="tabular-nums text-mark">{entry.plate}</span>
                  <span className="text-spot">Selected</span>
                  <span>{entry.meta}</span>
                </span>

                <span className="text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] leading-[1.05] text-ink">
                  {entry.title}
                </span>

                <span className="line-clamp-4 text-sm leading-relaxed text-ink-2">
                  {entry.summary}
                </span>

                <span className="flex flex-wrap gap-x-3 gap-y-1 font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2">
                  {entry.stack.slice(0, STACK_SHOWN).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </span>

                <span
                  aria-hidden="true"
                  className="mt-auto pt-4 font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2 transition-colors duration-200 group-hover:text-spot"
                >
                  Open plate →
                </span>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
