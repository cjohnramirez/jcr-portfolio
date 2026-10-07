"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { resolveChain } from "@/lib/next-chain";
import type { NextEntry } from "@/lib/routes";
import { GlowingEffect } from "../fx/glowing-effect";

const noSubscribe = () => () => {};

/**
 * The Next target. Grouped pages (see lib/next-chain) read where the reader
 * started from `?from=`; the server render uses the page itself as the start,
 * which is also the answer when the parameter is absent.
 */
function useNext(next: NextEntry): { href: string; title: string } {
  const from = useSyncExternalStore(
    noSubscribe,
    () => new URLSearchParams(window.location.search).get("from"),
    () => null,
  );
  return next.chain ? resolveChain(next.chain, from) : next;
}

/** The compact "Next: Steady →" link every detail page carries. */
export function NextInline({ next }: { next: NextEntry }) {
  const target = useNext(next);

  return (
    <Link
      className="group inline-flex items-center gap-1.5 text-[15px] text-spot"
      href={target.href}
    >
      <span className="text-ink-2">Next:</span> {target.title}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        strokeWidth={1.75}
      />
    </Link>
  );
}

/** The full-width next-project block at the end of the long templates. */
export function NextBlock({ next, label }: { next: NextEntry; label: string }) {
  const target = useNext(next);

  return (
    <Link className="group relative block border-t border-rule bg-plate transition-colors duration-300 hover:bg-plate-2" href={target.href}>
      <GlowingEffect />
      <span className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-16 md:px-8 md:py-24 xl:px-16">
        <span className="label text-ink-2">{label}</span>
        <span className="flex items-center gap-4 font-serif text-[clamp(2.75rem,1.6rem+4.4vw,6rem)] leading-[0.95] text-ink">
          {target.title}
          <ArrowRight
            aria-hidden="true"
            className="size-[0.6em] shrink-0 text-spot transition-transform duration-300 group-hover:translate-x-2"
            strokeWidth={1.25}
          />
        </span>
      </span>
    </Link>
  );
}
