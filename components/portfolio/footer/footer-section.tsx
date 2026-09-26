import Link from "next/link";
import type { FooterData } from "@/lib/portfolio-types";
import { PLATES } from "@/lib/routes";
import { FooterLink } from "./footer-link";

type FooterSectionProps = {
  data: FooterData;
};

/**
 * The colophon.
 *
 * Deliberately NOT the call to action. The CTA used to live here and rendered
 * on every route, which meant `/contact` showed the same "Got a vision?"
 * heading twice — once as its own h1 and once in the footer. The CTA now
 * belongs to `/contact` alone; this is the imprint at the back of the manual.
 */
export function FooterSection({ data }: FooterSectionProps) {
  return (
    // Full-bleed, like the fixed header. Capped at 1440 it stopped short of
    // the window on wide screens while the nav ran edge to edge, which read
    // as the page ending twice.
    <footer className="flex w-full flex-col gap-8 border-t border-rule bg-plate px-5 py-10 lg:flex-row lg:items-end lg:justify-between lg:px-10">
      <div className="flex max-w-[36ch] flex-col gap-3">
        <p className="text-[clamp(1.375rem,1rem+1.2vw,2rem)] leading-[1.05] text-ink">
          {data.brandLine.before}{" "}
          <span className="text-spot">{data.brandLine.accented[0]}</span>{" "}
          {data.brandLine.after}{" "}
          <span className="text-spot">{data.brandLine.accented[1]}</span>
        </p>
        <p className="font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2">
          {data.copyright}
        </p>
      </div>

      <div className="flex flex-col gap-5 lg:items-end">
        <Link
          className="font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink transition-colors duration-200 hover:text-spot focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spot"
          href={PLATES.contact.path}
        >
          {PLATES.contact.plate} / Colophon &amp; contact →
        </Link>

        <nav aria-label="Social links">
          <ul className="flex flex-wrap gap-3">
            {data.links.map((link) => (
              <li key={link.label}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
