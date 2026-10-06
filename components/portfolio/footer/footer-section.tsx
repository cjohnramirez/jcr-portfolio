import { ArrowUp } from "lucide-react";
import Link from "next/link";
import type { FooterData } from "@/lib/portfolio-types";
import { NAV_SECTIONS, sectionHref } from "@/lib/routes";

type FooterSectionProps = {
  data: FooterData;
};

/**
 * The imprint: copyright, the section index, and a way back up.
 *
 * Deliberately quiet. The call to action is the Contact section on the home
 * page; repeating it here would print it twice on `/`.
 */
export function FooterSection({ data }: FooterSectionProps) {
  return (
    <footer className="border-t border-rule bg-plate">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8 xl:px-16">
        <p className="label text-ink-2">{data.copyright}</p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <Link
                  className="text-[14px] font-medium text-ink transition-colors duration-200 hover:text-spot"
                  href={sectionHref(section)}
                >
                  {section.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors duration-200 hover:text-spot"
                href="#top"
              >
                Back to top
                <ArrowUp aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
