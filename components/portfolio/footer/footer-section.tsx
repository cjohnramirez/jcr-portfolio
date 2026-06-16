import type { FooterData } from "@/lib/portfolio-types";
import { ActionButton } from "../shared/action-button";
import { SectionShell } from "../shared/section-shell";
import { FooterLink } from "./footer-link";

type FooterSectionProps = {
  data: FooterData;
};

export function FooterSection({ data }: FooterSectionProps) {
  return (
    <>
      <SectionShell
        id="contact"
        className="flex min-h-[430px] flex-col items-center justify-center gap-[30px] p-5 text-center lg:min-h-[541px] lg:p-10"
      >
        <div className="flex max-w-[838px] flex-col items-center gap-2.5 text-[var(--portfolio-text)]">
          <h2 className="text-[38px] font-normal uppercase leading-none tracking-normal sm:text-[52px] lg:text-[64px]">
            {data.cta.title.before}{" "}
            <span className="text-[var(--portfolio-accent)]">
              {data.cta.title.accented}
            </span>
          </h2>
          <p className="max-w-[528px] text-xs font-normal uppercase leading-normal lg:text-[14px]">
            {data.cta.summary}
          </p>
        </div>
        <ActionButton action={data.cta.action} />
      </SectionShell>

      <footer className="flex flex-col gap-8 bg-[var(--portfolio-surface)] p-5 text-[var(--portfolio-text)] lg:flex-row lg:items-center lg:justify-between lg:p-10">
        <div className="flex max-w-[499px] flex-col gap-2.5">
          <p className="text-[28px] font-normal uppercase leading-none tracking-normal lg:text-4xl">
            {data.brandLine.before}{" "}
            <span className="text-[var(--portfolio-accent)]">
              {data.brandLine.accented[0]}
            </span>{" "}
            {data.brandLine.after}{" "}
            <span className="text-[var(--portfolio-accent)]">
              {data.brandLine.accented[1]}
            </span>
          </p>
          <p className="text-xs font-normal uppercase leading-normal lg:text-[14px]">
            {data.copyright}
          </p>
        </div>

        <nav aria-label="Social links">
          <ul className="flex flex-wrap gap-3 lg:gap-5">
            {data.links.map((link) => (
              <li key={link.label}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </>
  );
}
