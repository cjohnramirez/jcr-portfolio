"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowRight, Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { ALL_SECTIONS, NAV_SECTIONS, sectionHref } from "@/lib/routes";
import { GlowingEffect } from "../fx/glowing-effect";
import { ThemeToggle } from "../shared/theme-toggle";

const SECTION_IDS = ALL_SECTIONS.map((section) => section.id);

/**
 * Sticky header for the one-page home and the detail routes.
 *
 * Links are plain `/#id` anchors, so the header works before hydration and
 * without JavaScript. Scripting adds three things: the active-section state
 * (scroll spy), the compact height once the page has moved (lg and up only,
 * where the centre links show), and the reading progress bar. The shrinking
 * header follows Aceternity's Resizable Navbar; the sliding underline is its
 * Tabs pattern, a shared `layoutId`.
 */
/**
 * The nav item that owns a section. Sections without a nav item of their own
 * (How I work, Experience) belong to the nav item above them, so the
 * underline stays on Brand through them and then slides straight to About,
 * instead of vanishing and reappearing.
 */
function nearestNavSection(id: string | null): string | null {
  if (!id) return null;
  const index = ALL_SECTIONS.findIndex((section) => section.id === id);
  for (let i = index; i >= 0; i -= 1) {
    const candidate = ALL_SECTIONS[i];
    if (NAV_SECTIONS.some((section) => section.id === candidate.id)) return candidate.id;
  }
  return null;
}

export function PortfolioNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(SECTION_IDS, isHome);
  const navActive = nearestNavSection(active);

  const [isOpen, setIsOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => setCompact(value > 40));

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-20 border-b border-rule bg-plate transition-[height] duration-300 ${
        compact ? "lg:h-16" : "lg:h-[88px]"
      }`}
    >
      {/* Three columns from lg, so the links sit at the true centre of the viewport
          whatever the widths of the logo and the actions. */}
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-6 px-4 md:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] xl:px-16">
        <Link
          aria-label="John Carl Ramirez, home"
          className="flex shrink-0 items-center gap-3 text-[15px] font-normal tracking-tight text-ink"
          href="/"
        >
          <span aria-hidden="true" className="size-[18px] bg-spot" />
          <span>JCR.DEV</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {NAV_SECTIONS.map((section) => {
              const isActive = navActive === section.id;

              return (
                <li className="border-b border-rule last:border-b-0" key={section.id}>
                  <Link
                    aria-current={isActive ? "location" : undefined}
                    className="group relative flex py-2 leading-none"
                    href={sectionHref(section)}
                  >
                    <span
                      className={`text-[15px] font-normal transition-colors duration-200 ${
                        isActive ? "text-spot" : "text-ink group-hover:text-spot"
                      }`}
                    >
                      {section.label}
                    </span>
                    <AnimatePresence>
                      {isActive ? (
                        <motion.span
                          animate={{ opacity: 1 }}
                          aria-hidden="true"
                          className="absolute -bottom-0.5 left-0 h-px w-full bg-spot"
                          exit={{ opacity: 0 }}
                          initial={{ opacity: 0 }}
                          layoutId="nav-underline"
                          transition={{ type: "spring", stiffness: 380, damping: 38 }}
                        />
                      ) : null}
                    </AnimatePresence>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:justify-self-end">
          <a
            className="relative inline-flex h-11 items-center gap-2 border border-rule bg-plate px-4 text-[14px] font-normal text-ink transition-colors duration-200 hover:border-ink"
            download
            href="/cv.pdf"
          >
            <GlowingEffect proximity={32} />
            <Download aria-hidden="true" className="size-4" strokeWidth={1.75} />
            <span>
              <span className="sm:hidden">CV</span>
              <span className="hidden sm:inline">Download CV</span>
            </span>
          </a>
          <ThemeToggle />
          <button
            aria-controls={menuId}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center border border-rule bg-plate text-ink transition-colors duration-200 hover:border-ink lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
            ref={toggleRef}
            type="button"
          >
            {isOpen ? (
              <X aria-hidden="true" className="size-4" strokeWidth={1.75} />
            ) : (
              <Menu aria-hidden="true" className="size-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-spot motion-reduce:hidden"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Rendered but hidden when closed, so aria-controls always resolves. */}
      <nav
        aria-label="Primary mobile"
        className={`max-h-[calc(100svh-5rem)] overflow-y-auto overscroll-contain border-b border-rule bg-plate lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        id={menuId}
      >
        <ul className="flex flex-col px-4 md:px-8">
          {NAV_SECTIONS.map((section) => {
            const isActive = navActive === section.id;

            return (
              <li className="border-b border-rule last:border-b-0" key={section.id}>
                <Link
                  aria-current={isActive ? "location" : undefined}
                  className="group flex items-center justify-between gap-5 py-5"
                  href={sectionHref(section)}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center gap-3 font-serif text-[26px] leading-none">
                    <span className="w-[1.4em] shrink-0 text-spot">{section.number}</span>
                    <span className={isActive ? "text-spot" : "text-ink"}>{section.label}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-[0.7em] shrink-0 text-[26px] text-spot transition-transform duration-300 group-hover:translate-x-1.5"
                    strokeWidth={1.25}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
