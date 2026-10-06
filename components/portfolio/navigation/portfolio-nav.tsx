"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { ALL_SECTIONS, NAV_SECTIONS, sectionHref } from "@/lib/routes";
import { ThemeToggle } from "../shared/theme-toggle";

const SECTION_IDS = ALL_SECTIONS.map((section) => section.id);

/**
 * Sticky header for the one-page home and the detail routes.
 *
 * Links are plain `/#id` anchors, so the header works before hydration and
 * without JavaScript. Scripting adds three things: the active-section state
 * (scroll spy), the compact height once the page has moved, and the reading
 * progress bar. The shrinking header follows Aceternity's Resizable Navbar;
 * the sliding underline is its Tabs pattern, a shared `layoutId`.
 */
export function PortfolioNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(SECTION_IDS, isHome);
  const activeSection = ALL_SECTIONS.find((section) => section.id === active);

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
      className={`fixed inset-x-0 top-0 z-50 border-b border-rule bg-plate/85 backdrop-blur-md transition-[height] duration-300 ${
        compact ? "h-16" : "h-20 lg:h-[88px]"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-6 px-4 md:px-8 xl:px-16">
        <Link
          aria-label="John Carl Ramirez, home"
          className="flex shrink-0 items-center gap-3 text-[15px] font-medium tracking-tight text-ink"
          href="/"
        >
          <span aria-hidden="true" className="size-[18px] bg-spot" />
          <span>JCR.DEV</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {NAV_SECTIONS.map((section) => {
              const isActive = active === section.id;

              return (
                <li key={section.id}>
                  <Link
                    aria-current={isActive ? "location" : undefined}
                    className="group relative flex flex-col py-2 leading-none"
                    href={sectionHref(section)}
                  >
                    <span
                      className={`text-[15px] font-medium transition-colors duration-200 ${
                        isActive ? "text-spot" : "text-ink group-hover:text-spot"
                      }`}
                    >
                      {section.label}
                    </span>
                    <span className="mt-1 font-serif text-[14px] italic text-ink-2">
                      {section.subtitle}
                    </span>
                    {isActive ? (
                      <motion.span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 h-px w-full bg-spot"
                        layoutId="nav-underline"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Where am I, below lg where the full nav does not fit. */}
        <p
          aria-live="polite"
          className="flex min-w-0 flex-1 items-baseline gap-2 truncate lg:hidden"
        >
          <AnimatePresence initial={false} mode="wait">
            {activeSection ? (
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                className="flex items-baseline gap-2 truncate"
                exit={{ opacity: 0, y: -6 }}
                initial={{ opacity: 0, y: 6 }}
                key={activeSection.id}
                transition={{ duration: 0.2 }}
              >
                <span className="label text-spot">{activeSection.number}</span>
                <span className="truncate text-[14px] font-medium text-ink sm:text-[15px]">
                  {activeSection.label}
                </span>
              </motion.span>
            ) : null}
          </AnimatePresence>
        </p>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            className="inline-flex h-11 items-center gap-2 rounded-full border border-rule bg-plate px-4 text-[14px] font-medium text-ink transition-colors duration-200 hover:border-ink"
            download
            href="/cv.pdf"
          >
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
            className="inline-flex size-11 items-center justify-center rounded-full border border-rule bg-plate text-ink transition-colors duration-200 hover:border-ink lg:hidden"
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
        className={`max-h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain border-b border-rule bg-plate lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        id={menuId}
      >
        <ul className="flex flex-col">
          {NAV_SECTIONS.map((section) => {
            const isActive = active === section.id;

            return (
              <li key={section.id}>
                <Link
                  aria-current={isActive ? "location" : undefined}
                  className="flex items-center gap-5 border-b border-rule px-4 py-5 md:px-8"
                  href={sectionHref(section)}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="label text-spot">{section.number}</span>
                  <span className="flex flex-col leading-none">
                    <span
                      className={`font-serif text-[32px] ${isActive ? "text-spot" : "text-ink"}`}
                    >
                      {section.label}
                    </span>
                    <span className="mt-1 font-serif text-[16px] italic text-ink-2">
                      {section.subtitle}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
