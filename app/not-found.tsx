import Link from "next/link";
import { PageShell } from "@/components/portfolio/shared/page-shell";
import {
  Plate,
  PlateBody,
  PlateHeader,
  PlateLead,
  PlateTitle,
} from "@/components/portfolio/shared/plate";
import { NAV_SECTIONS, sectionHref } from "@/lib/routes";

export default function NotFound() {
  return (
    <PageShell>
      <Plate>
        <PlateHeader plate="404" runningHead="Page not found" folio="Index" />

        <PlateBody className="flex flex-col gap-10">
          <PlateTitle as="h1" className="max-w-[16ch]">
            Page not found
          </PlateTitle>

          <PlateLead>Pick a section below or return to the start.</PlateLead>

          <ul className="flex flex-col border-t border-rule">
            <li>
              <Link
                className="flex items-baseline gap-4 border-b border-rule py-4 text-[17px] font-medium text-ink transition-colors duration-200 hover:text-spot"
                href="/"
              >
                <span className="label text-ink-2">00</span>
                <span>Home</span>
              </Link>
            </li>
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <Link
                  className="flex items-baseline gap-4 border-b border-rule py-4 text-[17px] font-medium text-ink transition-colors duration-200 hover:text-spot"
                  href={sectionHref(section)}
                >
                  <span className="label text-ink-2">{section.number}</span>
                  <span>{section.label}</span>
                  <span className="font-serif italic text-ink-2">{section.subtitle}</span>
                </Link>
              </li>
            ))}
          </ul>
        </PlateBody>
      </Plate>
    </PageShell>
  );
}
