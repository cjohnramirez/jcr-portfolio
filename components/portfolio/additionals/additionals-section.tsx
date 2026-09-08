import type { AdditionalsData } from "@/lib/portfolio-types";
import {
  Plate,
  PlateBody,
  PlateHeader,
  PlateLead,
  PlateTitle,
} from "../shared/plate";
import { AdditionalBlock } from "./additional-block";

type AdditionalsSectionProps = {
  data: AdditionalsData;
  headingLevel?: "h1" | "h2";
};

/** Plate 04 — Appendix. */
export function AdditionalsSection({
  data,
  headingLevel = "h2",
}: AdditionalsSectionProps) {
  return (
    <>
      <Plate id="additionals">
        <PlateHeader
          plate="04"
          runningHead="Appendix"
          folio={`${data.blocks.length} sections`}
        />
        <PlateBody className="flex flex-col gap-6">
          <PlateTitle as={headingLevel} className="max-w-[14ch]">
            {data.title.before}{" "}
            <span className="text-spot">{data.title.accented}</span>
          </PlateTitle>
          <PlateLead>{data.summary}</PlateLead>
        </PlateBody>
      </Plate>

      {data.blocks.map((block, index) => (
        <AdditionalBlock block={block} key={block.id} plate={`04.${index + 1}`} />
      ))}
    </>
  );
}
