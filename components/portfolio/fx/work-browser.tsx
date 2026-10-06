"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Images, Play, Search, X } from "lucide-react";
import Link from "next/link";
import { useDeferredValue, useId, useMemo, useState } from "react";
import type { MotionPiece, PrintPiece } from "@/lib/portfolio-types";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { GlowingEffect } from "./glowing-effect";
import { MotionDialog, PrintDialog } from "./media-dialogs";

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

const FILTERS: { id: BrowserKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "identity", label: "Identity" },
  { id: "interface", label: "Interface" },
  { id: "motion", label: "Motion" },
  { id: "print", label: "Print and apparel" },
];

const KIND_LABEL: Record<BrowserKind, string> = {
  identity: "Identity",
  interface: "Interface",
  motion: "Motion",
  print: "Print",
};

/** Every query word must appear somewhere in the entry. */
function matches(item: BrowserItem, query: string) {
  const haystack = `${item.title} ${item.meta} ${item.summary} ${KIND_LABEL[item.kind]}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

function FeaturedCard({ item }: { item: BrowserItem }) {
  return (
    <Link
      className="group relative grid border border-rule bg-plate transition-colors duration-300 hover:bg-plate-2 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
      href={item.href ?? "#"}
    >
      <GlowingEffect />
      <div className="relative aspect-[4/3] overflow-hidden bg-plate-2 md:aspect-auto md:min-h-[360px]">
        <CloudinaryImage
          alt={item.image.alt}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          fill
          sizes="(min-width: 1440px) 700px, (min-width: 768px) 55vw, 100vw"
          src={item.image.src}
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <p className="label text-spot">Featured · {KIND_LABEL[item.kind]}</p>
        <h3 className="text-[clamp(2rem,1.5rem+1.6vw,3.25rem)] leading-none text-ink">{item.title}</h3>
        <p className="label text-ink-2">{item.meta}</p>
        <p className="max-w-[44ch] text-[17px] leading-relaxed text-ink-2">{item.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[15px] font-medium text-spot">
          View brand system
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </span>
      </div>
    </Link>
  );
}

function RowBody({ item }: { item: BrowserItem }) {
  const Icon = item.kind === "motion" ? Play : item.kind === "print" ? Images : ArrowUpRight;

  return (
    <>
      <span className="relative block aspect-[4/3] w-24 shrink-0 overflow-hidden border border-rule bg-plate-2 sm:w-32">
        <CloudinaryImage
          alt=""
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          fill
          sizes="128px"
          src={item.image.src}
        />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="text-[clamp(1.375rem,1.2rem+0.6vw,1.75rem)] font-serif leading-none text-ink">
          {item.title}
        </span>
        <span className="line-clamp-2 text-[15px] leading-snug text-ink-2">{item.summary}</span>
      </span>
      <span className="label hidden w-24 shrink-0 text-ink-2 md:block">{KIND_LABEL[item.kind]}</span>
      <span className="inline-flex size-10 shrink-0 items-center justify-center border border-rule text-ink transition-colors duration-200 group-hover:border-spot group-hover:text-spot">
        <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
      </span>
    </>
  );
}

const rowClass =
  "group flex w-full items-center gap-4 py-5 text-left transition-colors duration-200 hover:bg-plate-2 sm:gap-6 sm:px-3";

/**
 * Brand and design, as Aceternity's Blog with Search: one featured entry,
 * then a search box and category filters over a divided list.
 *
 * Every row is in the HTML on first render, so crawlers and no-JS readers
 * see the whole index; search and filtering only hide rows. Videos and
 * galleries load nothing until their dialog is opened.
 */
export function WorkBrowser({ featured, items }: { featured: BrowserItem; items: BrowserItem[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<BrowserKind | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);
  const searchId = useId();

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: items.length };
    for (const item of items) result[item.kind] = (result[item.kind] ?? 0) + 1;
    return result;
  }, [items]);

  const visible = items.filter(
    (item) => (filter === "all" || item.kind === filter) && matches(item, deferredQuery),
  );

  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <FeaturedCard item={featured} />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-[360px]">
          <label className="sr-only" htmlFor={searchId}>
            Search brand and design work
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-2"
            strokeWidth={1.75}
          />
          <input
            className="h-12 w-full border border-rule bg-plate pl-11 pr-11 text-[15px] text-ink placeholder:text-ink-2 focus-visible:border-spot"
            id={searchId}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search work"
            type="search"
            value={query}
          />
          {query ? (
            <button
              aria-label="Clear search"
              className="absolute right-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center text-ink-2 hover:text-ink"
              onClick={() => setQuery("")}
              type="button"
            >
              <X aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </button>
          ) : null}
        </div>

        <div aria-label="Filter by discipline" className="flex flex-wrap gap-2" role="group">
          {FILTERS.map((option) => {
            const active = filter === option.id;

            return (
              <button
                aria-pressed={active}
                className={`inline-flex h-10 items-center gap-2 border px-3.5 text-[14px] font-medium transition-colors duration-200 ${
                  active ? "border-ink bg-ink text-plate" : "border-rule bg-plate text-ink hover:border-ink"
                }`}
                key={option.id}
                onClick={() => setFilter(option.id)}
                type="button"
              >
                {option.label}
                <span
                  className={`inline-flex size-5 items-center justify-center rounded-full text-[11px] tabular-nums ${
                    active ? "bg-plate text-ink" : "bg-plate-2 text-ink-2 ring-1 ring-rule"
                  }`}
                >
                  {counts[option.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "result" : "results"}
      </p>

      <ul className="border-t border-rule">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((item) => (
            <motion.li
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-rule"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              initial={{ opacity: 0, y: 8 }}
              key={item.id}
              layout="position"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.href ? (
                <Link className={rowClass} href={item.href}>
                  <RowBody item={item} />
                </Link>
              ) : (
                <button
                  aria-label={`${item.kind === "motion" ? "Play" : "View"} ${item.title}, ${item.meta}`}
                  className={rowClass}
                  onClick={() => setOpenId(item.id)}
                  type="button"
                >
                  <RowBody item={item} />
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
        </AnimatePresence>
      </ul>

      {visible.length === 0 ? (
        <div className="flex flex-col items-start gap-3 border border-dashed border-rule p-8">
          <p className="font-serif text-[24px] leading-none text-ink">Nothing matches “{query}”.</p>
          <button
            className="text-[15px] font-medium text-spot underline underline-offset-4"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            type="button"
          >
            Show all work
          </button>
        </div>
      ) : null}
    </div>
  );
}
