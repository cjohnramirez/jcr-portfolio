import type { AboutData } from "@/lib/portfolio-types";
import { SECTIONS } from "@/lib/routes";
import { AnnotatedFrame } from "../shared/annotated-frame";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { Reveal } from "../shared/reveal";
import { SectionBand, SectionHeader } from "../shared/section-header";

type AboutSectionProps = {
  data: AboutData;
  portrait: { src: string; alt: string };
};

export function AboutSection({ data, portrait }: AboutSectionProps) {
  return (
    <SectionBand section={SECTIONS.about} tone="plate">
      <div className="grid items-start gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Reveal>
          <AnnotatedFrame clearspace="1×" dimensions="Portrait / 1:1">
            <div className="relative aspect-square w-full">
              <CloudinaryImage
                alt={portrait.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1440px) 480px, (min-width: 768px) 38vw, 100vw"
                src={portrait.src}
              />
            </div>
          </AnnotatedFrame>
        </Reveal>

        <div className="flex flex-col gap-10">
          <SectionHeader lead={data.summary} section={SECTIONS.about} />
          <div className="grid gap-8 border-t border-rule pt-8 lg:grid-cols-2">
            {data.columns.map((column, index) => (
              <Reveal className="flex flex-col gap-3" key={column.title} order={index + 2}>
                <h3 className="label font-body text-ink">{column.title}</h3>
                <p className="text-[16px] leading-relaxed text-ink-2">{column.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionBand>
  );
}
