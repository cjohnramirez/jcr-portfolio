import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { ContactData } from "@/lib/portfolio-types";
import { SECTIONS } from "@/lib/routes";
import { AsciiField } from "../fx/ascii-field";
import { Reveal } from "../shared/reveal";
import { SectionBand, SectionHeader } from "../shared/section-header";
import { CopyEmail } from "./copy-email";

export function ContactSection({ data }: { data: ContactData }) {
  return (
    <SectionBand className="relative isolate overflow-hidden" section={SECTIONS.contact} tone="ink">
      <AsciiField className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 text-plate/[0.16]" />
      <SectionHeader inverted lead={data.summary} section={SECTIONS.contact} title={data.title} />

      <Reveal order={3}>
        <div className="flex flex-col gap-5 border-y border-plate/20 py-7 md:flex-row md:items-center md:justify-between">
          <a
            className="break-all font-serif text-[clamp(1.625rem,1rem+2.6vw,3rem)] leading-none text-plate underline decoration-plate/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-plate"
            href={`mailto:${data.email}`}
          >
            {data.email}
          </a>
          <CopyEmail email={data.email} />
        </div>
      </Reveal>

      <Reveal order={4}>
        <ul className="flex flex-col gap-4 sm:flex-row sm:gap-10">
          {data.links.map((link) => {
            const isDownload = link.icon === "download";

            return (
              <li key={link.label}>
                <a
                  className="inline-flex items-center gap-1.5 text-[17px] font-medium text-plate underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-plate"
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(isDownload ? { download: true } : {})}
                >
                  {link.label}
                  {isDownload ? (
                    <ArrowDown aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  ) : (
                    <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  )}
                  {link.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </SectionBand>
  );
}
