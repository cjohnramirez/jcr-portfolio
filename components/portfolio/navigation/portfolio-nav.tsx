"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { isPlateActive, NAV_PLATES } from "@/lib/routes";
import type { ActionLink } from "@/lib/portfolio-types";
import { ActionButton } from "../shared/action-button";
import { ThemeToggle } from "../shared/theme-toggle";

type PortfolioNavProps = {
  action: ActionLink;
};

export function PortfolioNav({ action }: PortfolioNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const linkClass =
    "transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spot";

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-rule bg-plate">
      <div className="flex h-20 items-center justify-between gap-5 px-5 lg:h-[100px] xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center">
        <Link
          className={`flex items-center gap-[15px] text-xs font-normal uppercase leading-none text-ink lg:text-[14px] ${linkClass}`}
          href="/"
        >
          <span
            aria-hidden="true"
            className="size-[21px] bg-spot"
          />
          <span>JCR.DEV / DESIGN</span>
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-normal uppercase leading-none text-ink lg:gap-x-10 lg:text-[14px]">
            {NAV_PLATES.map((plate) => {
              const isActive = isPlateActive(pathname, plate.path);

              return (
                <li key={plate.path}>
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={`${linkClass} ${isActive ? "text-spot" : ""}`}
                    href={plate.path}
                  >
                    {isActive ? "> " : ""}
                    {plate.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5 xl:justify-end">
          <ActionButton action={action} iconOnlyOnMobile />
          <ThemeToggle />
          <button
            aria-controls={menuId}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex size-[42px] items-center justify-center border border-rule bg-plate-2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spot xl:hidden"
            onClick={() => setIsOpen((open) => !open)}
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

      {/* Rendered but hidden when closed, so aria-controls always resolves. */}
      <nav
        aria-label="Primary mobile"
        className={`max-h-[70vh] overflow-y-auto overscroll-contain border-t border-rule bg-plate xl:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        id={menuId}
      >
        <ul className="flex flex-col text-xs font-normal uppercase leading-none text-ink">
          {NAV_PLATES.map((plate) => {
            const isActive = isPlateActive(pathname, plate.path);

            return (
              <li key={plate.path}>
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 border-b border-rule px-5 py-5 ${linkClass} ${
                    isActive ? "text-spot" : ""
                  }`}
                  href={plate.path}
                  // Closed here rather than in an effect on pathname: the click
                  // is the actual intent, and an effect would fight the linter.
                  onClick={() => setIsOpen(false)}
                >
                  <span aria-hidden="true" className="text-rule">
                    {plate.plate}
                  </span>
                  {plate.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
