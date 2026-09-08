import type { Metadata } from "next";
import { ActionButton } from "@/components/portfolio/shared/action-button";
import { PageShell } from "@/components/portfolio/shared/page-shell";
import {
  Plate,
  PlateBody,
  PlateHeader,
  PlateLead,
  PlateTitle,
} from "@/components/portfolio/shared/plate";
import { Reveal } from "@/components/portfolio/shared/reveal";
import { contactAction, footerData, heroData } from "@/lib/portfolio-data";
import { PLATES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Contact",
  description: footerData.cta.summary,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell>
      <Plate id="contact">
        <PlateHeader
          plate={PLATES.contact.plate}
          runningHead={PLATES.contact.label}
          folio="End of manual"
        />

        <PlateBody className="flex flex-col gap-12 lg:gap-16">
          <div className="flex flex-col gap-6">
            <PlateTitle as="h1" className="max-w-[16ch]">
              {footerData.cta.title.before}{" "}
              <span className="text-spot">{footerData.cta.title.accented}</span>
            </PlateTitle>
            <PlateLead>{footerData.cta.summary}</PlateLead>
          </div>

          <div className="grid gap-10 border-t border-rule pt-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <dl className="flex flex-col gap-4 font-spec text-[11px] uppercase leading-none tracking-[0.08em] text-ink-2">
                {heroData.details.map((detail) => {
                  const [key, ...rest] = detail.split(":");
                  return (
                    <div className="flex gap-4" key={detail}>
                      <dt className="w-10 shrink-0 text-ink">{key}</dt>
                      <dd>{rest.join(":").trim()}</dd>
                    </div>
                  );
                })}
              </dl>
            </Reveal>

            <Reveal order={1}>
              <div className="flex flex-wrap gap-4">
                <ActionButton action={contactAction} />
                {footerData.links.map((link) => (
                  <ActionButton action={link} key={link.label} />
                ))}
              </div>
            </Reveal>
          </div>
        </PlateBody>
      </Plate>
    </PageShell>
  );
}
