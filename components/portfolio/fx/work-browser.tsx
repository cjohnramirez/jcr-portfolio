"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Images, Play } from "lucide-react";
import Link from "next/link";
import { type KeyboardEvent, useId, useRef, useState } from "react";
import type { MotionPiece, PrintPiece } from "@/lib/portfolio-types";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { GlowingEffect } from "./glowing-effect";
import { MotionDialog, PrintDialog } from "./media-dialogs";
import { MotionPreview } from "./motion-preview";

export type BrowserKind = "identity" | "interface" | "motion" | "print";

export type BrowserItem = {
  id: string;
  kind: BrowserKind;
  title: string;
  meta: string;
  summary: string;
  image: { src: string; alt: string };
  /** Identity and interface entries open their own page. */
  href?: string;
  motion?: MotionPiece;
  print?: PrintPiece;
};

const TABS: { id: BrowserKind; label: string; short?: string }[] = [
  { id: "identity", label: "Identity" },
  { id: "interface", label: "Interface" },
  { id: "motion", label: "Motion" },
  { id: "print", label: "Print and apparel", short: "Print" },
];

const CTA: Record<BrowserKind, string> = {
  identity: "View brand system",
  interface: "View design",
  motion: "Watch",
  print: "View gallery",
};

function CardBody({ item, active = false }: { item: BrowserItem; active?: boolean }) {
  const Icon = item.kind === "motion" ? Play : item.kind === "print" ? Images : ArrowUpRight;

  return (
    <>
      <GlowingEffect />
      <span className="relative block aspect-[4/3] w-full overflow-hidden bg-plate-2">
        <CloudinaryImage
          alt={item.href ? item.image.alt : ""}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          fill
          sizes="(min-width: 1440px) 330px, (min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          src={item.image.src}
        />
        {item.motion ? <MotionPreview active={active} piece={item.motion} /> : null}
        {item.kind === "motion" ? (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 bg-black/65 px-3 py-1.5 text-[13px] font-medium text-white backdrop-blur-sm">
            <Play aria-hidden="true" className="size-3.5 fill-current" />
            Muted
          </span>
        ) : null}
      </span>
      <span className="flex flex-1 flex-col gap-3 p-6">
        <span className="label text-ink-2">{item.meta}</span>
        <span className="font-serif text-[clamp(1.75rem,1.4rem+0.8vw,2.125rem)] leading-none text-ink">
          {item.title}
        </span>
        {item.summary ? (
          <span className="line-clamp-3 text-[15px] leading-snug text-ink-2">{item.summary}</span>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[15px] font-medium text-spot">
          {CTA[item.kind]}
          <Icon
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </span>
      </span>
    </>
  );
}

const cardClass =
  "group relative flex h-full w-full flex-col border border-rule bg-plate text-left transition-colors duration-300 hover:bg-plate-2";

/**
 * Brand and design: WAI-ARIA tabs with a sliding indicator (Aceternity's
 * Tabs pattern) over a card grid.
 *
 * Every panel is rendered and the inactive ones are `hidden`, so all the
 * links are in the HTML for crawlers. Arrow keys move between tabs, Home and
 * End jump to the ends, and only the selected tab is in the tab order.
 * Videos and galleries load nothing until their dialog is opened.
 */
export function WorkBrowser({ items }: { items: BrowserItem[] }) {
  const [selected, setSelected] = useState<BrowserKind>("identity");
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const current = TABS.findIndex((tab) => tab.id === selected);
    const last = TABS.length - 1;
    const next =
      event.key === "ArrowRight"
        ? current === last ? 0 : current + 1
        : event.key === "ArrowLeft"
          ? current === 0 ? last : current - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setSelected(TABS[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <div
        aria-label="Design disciplines"
        className="inline-flex max-w-full self-start overflow-x-auto border border-rule bg-plate p-1"
        role="tablist"
      >
        {TABS.map((tab, index) => {
          const active = selected === tab.id;

          return (
            <button
              aria-controls={`${baseId}-panel-${tab.id}`}
              aria-selected={active}
              className={`relative inline-flex h-10 shrink-0 items-center px-3 text-[14px] font-medium transition-colors duration-200 sm:px-4 sm:text-[15px] ${
                active ? "text-plate" : "text-ink-2 hover:text-ink"
              }`}
              id={`${baseId}-tab-${tab.id}`}
              key={tab.id}
              onClick={() => setSelected(tab.id)}
              onKeyDown={onKeyDown}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role="tab"
              tabIndex={active ? 0 : -1}
              type="button"
            >
              {active ? (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink"
                  layoutId={`${baseId}-indicator`}
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              <span className="relative">
                {tab.short ? (
                  <>
                    <span className="sm:hidden">{tab.short}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </>
                ) : (
                  tab.label
                )}
              </span>
            </button>
          );
        })}
      </div>

      {TABS.map((tab) => {
        const active = selected === tab.id;
        const panelItems = items.filter((item) => item.kind === tab.id);

        return (
          <div
            aria-labelledby={`${baseId}-tab-${tab.id}`}
            hidden={!active}
            id={`${baseId}-panel-${tab.id}`}
            key={tab.id}
            role="tabpanel"
            tabIndex={0}
          >
            <ul
              className={`grid gap-6 sm:grid-cols-2 md:gap-5 ${tab.id === "identity" ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}
            >
              {panelItems.map((item, index) => (
                <motion.li
                  animate={active ? { opacity: 1, y: 0 } : undefined}
                  initial={tab.id === "identity" ? false : { opacity: 0, y: 12 }}
                  key={item.id}
                  transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.href ? (
                    <Link className={cardClass} href={item.href}>
                      <CardBody item={item} />
                    </Link>
                  ) : (
                    <button
                      aria-label={`${item.kind === "motion" ? "Play" : "View"} ${item.title}, ${item.meta}`}
                      className={cardClass}
                      onBlur={() => setHoveredId(null)}
                      onClick={() => setOpenId(item.id)}
                      onFocus={() => setHoveredId(item.id)}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      type="button"
                    >
                      <CardBody active={hoveredId === item.id} item={item} />
                    </button>
                  )}
                  {item.motion ? (
                    <MotionDialog onClose={() => setOpenId(null)} open={openId === item.id} piece={item.motion} />
                  ) : null}
                  {item.print ? (
                    <PrintDialog onClose={() => setOpenId(null)} open={openId === item.id} piece={item.print} />
                  ) : null}
                </motion.li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
