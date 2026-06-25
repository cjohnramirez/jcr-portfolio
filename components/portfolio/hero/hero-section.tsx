import type { HeroData } from "@/lib/portfolio-types";
import { ActionButton } from "../shared/action-button";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { MetaRow } from "../shared/meta-row";
import { SectionShell } from "../shared/section-shell";

type HeroSectionProps = {
  data: HeroData;
};

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <SectionShell id="home" className="flex flex-col gap-10 p-5 lg:min-h-[552px] lg:p-10">
      <MetaRow left={data.kicker} right={data.status} />

      <div className="flex flex-1 flex-col justify-between gap-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          <div className="relative size-[180px] shrink-0 overflow-hidden bg-[var(--portfolio-button)] sm:size-[220px] lg:size-[252px]">
            <CloudinaryImage
              alt={data.portrait.alt}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 252px, 220px"
              src={data.portrait.src}
            />
          </div>

          <div className="flex flex-col gap-3 text-[var(--portfolio-text)]">
            <h1 className="max-w-[663px] text-[38px] font-normal uppercase leading-none tracking-normal sm:text-[52px] lg:text-[64px]">
              {data.title.before}{" "}
              <span className="text-[var(--portfolio-accent)]">
                {data.title.accented[0]}
              </span>{" "}
              {data.title.after}{" "}
              <span className="text-[var(--portfolio-accent)]">
                {data.title.accented[1]}
              </span>
            </h1>
            <p className="max-w-[462px] text-xs font-normal uppercase leading-normal lg:text-[14px]">
              {data.summary}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <ul className="space-y-1 text-xs font-normal uppercase leading-normal text-[var(--portfolio-text)] lg:text-[14px]">
            {data.details.map((detail) => (
              <li key={detail} className="before:mr-2 before:content-['>']">
                {detail}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-5">
            {data.actions.map((action) => (
              <ActionButton key={action.label} action={action} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
