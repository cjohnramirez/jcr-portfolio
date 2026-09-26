import Link from "next/link";
import { PageShell } from "@/components/portfolio/shared/page-shell";
import {
  Plate,
  PlateBody,
  PlateHeader,
  PlateLead,
  PlateTitle,
} from "@/components/portfolio/shared/plate";
import { NAV_PLATES } from "@/lib/routes";

export default function NotFound() {
  return (
    <PageShell>
      <Plate>
        <PlateHeader plate="404" runningHead="Plate not found" folio="Index" />

        <PlateBody className="flex flex-col gap-10">
          <PlateTitle as="h1" className="max-w-[16ch]">
            Plate not found
          </PlateTitle>

          <PlateLead>
            Select a plate below or return to the cover.
          </PlateLead>

          <ul className="flex flex-col border-t border-rule">
            <li>
              <Link
                className="flex items-baseline gap-4 border-b border-rule py-4 font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink transition-colors duration-200 hover:text-spot focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spot"
                href="/"
              >
                <span className="tabular-nums text-mark">00</span>
                <span>Cover</span>
              </Link>
            </li>
            {NAV_PLATES.map((plate) => (
              <li key={plate.path}>
                <Link
                  className="flex items-baseline gap-4 border-b border-rule py-4 font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink transition-colors duration-200 hover:text-spot focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spot"
                  href={plate.path}
                >
                  <span className="tabular-nums text-ink-2">{plate.plate}</span>
                  <span>{plate.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </PlateBody>
      </Plate>
    </PageShell>
  );
}
