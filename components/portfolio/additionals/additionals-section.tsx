import type { AdditionalsData } from "@/lib/portfolio-types";
import { SectionShell } from "../shared/section-shell";
import { StatusMarker } from "../shared/status-marker";
import { AdditionalBlock } from "./additional-block";

type AdditionalsSectionProps = {
  data: AdditionalsData;
};

export function AdditionalsSection({ data }: AdditionalsSectionProps) {
  return (
    <SectionShell id="additionals" className="flex flex-col gap-10 p-5 lg:p-10">
      <div className="flex items-center justify-between gap-4 text-[var(--portfolio-text)]">
        <StatusMarker label={data.sectionLabel} />
        <p className="text-xs uppercase leading-none lg:text-[14px]">{data.status}</p>
      </div>

      <div className="mx-auto flex max-w-[818px] flex-col items-center gap-5 text-center text-[var(--portfolio-text)]">
        <h2 className="text-[38px] font-normal uppercase leading-none tracking-normal sm:text-[52px] lg:text-[64px]">
          {data.title.before}{" "}
          <span className="text-[var(--portfolio-accent)]">{data.title.accented}</span>
        </h2>
        <p className="text-xs font-normal uppercase leading-normal lg:text-[14px]">
          {data.summary}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {data.blocks.map((block, index) => (
          <AdditionalBlock block={block} featured={index === 0} key={block.id} />
        ))}
      </div>
    </SectionShell>
  );
}
