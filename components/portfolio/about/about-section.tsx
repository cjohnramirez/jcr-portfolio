import type { AboutData } from "@/lib/portfolio-types";
import { ActionButton } from "../shared/action-button";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { SectionShell } from "../shared/section-shell";
import { StatusMarker } from "../shared/status-marker";

type AboutSectionProps = {
  data: AboutData;
};

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <SectionShell id="about" className="flex flex-col gap-10 p-5 lg:min-h-[847px] lg:p-10">
      <div className="flex items-center justify-between gap-4 text-[var(--portfolio-text)]">
        <StatusMarker label={data.sectionLabel} />
        <p className="text-xs uppercase leading-none lg:text-[14px]">{data.status}</p>
      </div>

      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-5 text-[var(--portfolio-text)]">
          <h2 className="text-[38px] font-normal uppercase leading-none tracking-normal sm:text-[52px] lg:text-[64px]">
            {data.title.before}{" "}
            <span className="text-[var(--portfolio-accent)]">
              {data.title.accented}
            </span>
          </h2>
          <p className="max-w-[1013px] text-xs font-normal uppercase leading-normal lg:text-[14px]">
            {data.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-5">
          {data.actions.map((action) => (
            <ActionButton key={action.label} action={action} />
          ))}
        </div>
      </div>

      <div className="relative min-h-[180px] overflow-hidden border border-[var(--portfolio-button)] bg-[var(--portfolio-surface)] sm:min-h-[220px] lg:min-h-[252px]">
        <CloudinaryImage
          alt={data.media.alt}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 1120px, 100vw"
          src={data.media.src}
          loading="eager"
        />
      </div>

      <div className="grid gap-6 text-[var(--portfolio-text)] lg:grid-cols-[242px_1fr_1fr] lg:gap-[51px]">
        <h3 className="max-w-[242px] text-[30px] font-normal uppercase leading-none tracking-normal lg:text-[36px]">
          <span className="text-[var(--portfolio-accent)]">DESIGN</span> AND{" "}
          <span className="text-[var(--portfolio-accent)]">DEVELOPMENT</span>
        </h3>
        {data.columns.map((column) => (
          <article key={column.title}>
            <p className="text-xs font-normal uppercase leading-normal lg:text-[14px]">
              {column.body}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
