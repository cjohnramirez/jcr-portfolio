import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ExperienceEntry, RecordEntry } from "@/lib/portfolio-types";
import { SECTIONS } from "@/lib/routes";
import { TimelineBeam } from "../fx/timeline-beam";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { Reveal } from "../shared/reveal";
import { SectionBand, SectionHeader } from "../shared/section-header";

function EntryLink({ entry }: { entry: ExperienceEntry }) {
  const className =
    "inline-flex items-center gap-1.5 text-[15px] font-medium text-spot underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-current";
  const content = (
    <>
      {entry.hrefLabel}
      <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
    </>
  );

  return entry.external ? (
    <a className={className} href={entry.href} rel="noopener noreferrer" target="_blank">
      {content}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  ) : (
    <Link className={className} href={entry.href}>
      {content}
    </Link>
  );
}

type ExperienceSectionProps = {
  entries: ExperienceEntry[];
  record: RecordEntry[];
};

export function ExperienceSection({ entries, record }: ExperienceSectionProps) {
  return (
    <SectionBand section={SECTIONS.experience}>
      <SectionHeader
        lead="Industry work, published research, and the academic record behind them."
        section={SECTIONS.experience}
        title="Experience and research"
      />

      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
        <TimelineBeam>
          <ol className="flex flex-col">
            {entries.map((entry, index) => (
              <li className="relative pb-14 pl-7 last:pb-0 md:pl-10" key={entry.title}>
                <span
                  aria-hidden="true"
                  className="absolute left-[-4px] top-1 size-[9px] rounded-full border border-spot bg-ground"
                />
                <Reveal className="flex flex-col gap-3" order={index}>
                  <p className="label text-spot">{entry.date}</p>
                  <h3 className="text-[clamp(1.75rem,1.3rem+1.2vw,2.375rem)] leading-[1.05] text-ink">
                    {entry.title}
                  </h3>
                  <p className="text-[15px] font-medium text-ink">{entry.org}</p>
                  <p className="max-w-[54ch] text-[16px] leading-relaxed text-ink-2">{entry.summary}</p>
                  {entry.image ? (
                    <div className="relative mt-2 aspect-[1520/830] w-full overflow-hidden border border-rule bg-plate-2">
                      <CloudinaryImage
                        alt={entry.image.alt}
                        className="object-cover dark:hidden"
                        fill
                        sizes="(min-width: 1440px) 640px, (min-width: 1024px) 50vw, 100vw"
                        src={entry.image.light}
                      />
                      <CloudinaryImage
                        alt={entry.image.alt}
                        className="hidden object-cover dark:block"
                        fill
                        sizes="(min-width: 1440px) 640px, (min-width: 1024px) 50vw, 100vw"
                        src={entry.image.dark}
                      />
                    </div>
                  ) : null}
                  <EntryLink entry={entry} />
                </Reveal>
              </li>
            ))}
          </ol>
        </TimelineBeam>

        <div className="flex flex-col">
          <h3 className="label pb-4 text-ink-2">Education and recognition</h3>
          <ul className="border-t border-rule">
            {record.map((item, index) => (
              <li key={item.title}>
                <Reveal
                  className="grid gap-1.5 border-b border-rule py-5 sm:grid-cols-[150px_1fr] sm:gap-6"
                  from="left"
                  order={index}
                >
                  <span className="label pt-1 text-ink-2">{item.date}</span>
                  <span className="text-[16px] leading-snug text-ink">{item.title}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionBand>
  );
}
