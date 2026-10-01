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
  cover?: ProjectCaseStudy["cover"];
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
 * With an odd count the last tile takes the whole row, image beside text,
 * rather than leaving an empty cell of rule colour beside it.
 *
 * Only the first few stack items are shown. The full list lives on the plate,
 * and a band that prints sixteen technologies stops being a summary.
 */
const STACK_SHOWN = 6;

export function FeaturedBand({ entries, label }: FeaturedBandProps) {
  if (entries.length === 0) return null;

  return (
    <ul aria-label={label} className="grid gap-px bg-rule lg:grid-cols-2">
      {entries.map((entry, index) => {
        const wide = entries.length % 2 === 1 && index === entries.length - 1;

        return (
          <li
            className={`bg-plate ${wide ? "lg:col-span-2" : ""}`}
            key={entry.href}
          >
            {/* h-full unbroken from cell to link, so hover covers the whole tile. */}
            <Reveal className="h-full" order={index}>
              <Link
                className={`group flex h-full flex-col ${wide ? "lg:flex-row" : ""} transition-colors duration-200 hover:bg-plate-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-spot`}
                href={entry.href}
              >
                {entry.cover ? (
                <div className="relative aspect-[1.86] w-full overflow-hidden bg-plate-2">
                  {/* Both renders ship; the theme decides which one shows. */}
                  <CloudinaryImage
                    alt={entry.cover.alt}
                    className="h-full w-full object-cover object-bottom dark:hidden"
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    src={entry.cover.light}
                  />
                  <CloudinaryImage
                    alt={entry.cover.alt}
                    className="hidden h-full w-full object-cover object-bottom dark:block"
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    src={entry.cover.dark}
                  />
                </div>
              ) : entry.sheet?.imageSrc ? (
                  <div
                    className={`relative aspect-[1.86] w-full overflow-hidden bg-plate-2 ${wide ? "lg:w-1/2 lg:shrink-0" : ""}`}
                  >
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
        );
      })}
    </ul>
  );
}
