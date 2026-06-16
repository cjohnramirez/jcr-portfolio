"use client";

import { useEffect, useMemo, useState } from "react";
import type { ActionLink, NavItem } from "@/lib/portfolio-types";
import { ActionButton } from "../shared/action-button";
import { ThemeToggle } from "../shared/theme-toggle";

type PortfolioNavProps = {
  items: NavItem[];
  action: ActionLink;
};

export function PortfolioNav({ items, action }: PortfolioNavProps) {
  const defaultActiveHref = useMemo(
    () => items.find((item) => item.active)?.href ?? items[0]?.href ?? "#home",
    [items],
  );
  const [activeHref, setActiveHref] = useState(defaultActiveHref);

  useEffect(() => {
    function syncActiveHash() {
      setActiveHref(window.location.hash || defaultActiveHref);
    }

    syncActiveHash();
    window.addEventListener("hashchange", syncActiveHash);

    return () => {
      window.removeEventListener("hashchange", syncActiveHash);
    };
  }, [defaultActiveHref]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-[var(--portfolio-border)] bg-[var(--portfolio-surface)]">
      <div className="flex h-20 items-center justify-between gap-5 px-5 lg:h-[100px] xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center">
        <a
          className="flex items-center gap-[15px] text-xs font-normal uppercase leading-none text-[var(--portfolio-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--portfolio-accent)] lg:text-[14px]"
          href="#home"
          onClick={() => setActiveHref("#home")}
        >
          <span aria-hidden="true" className="size-[21px] bg-[var(--portfolio-brand-mark)]" />
          <span>JCR.DEV / DESIGN</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden xl:block">
          <ul className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-normal uppercase leading-none text-[var(--portfolio-text)] lg:gap-x-10 lg:text-[14px]">
            {items.map((item) => {
              const isActive = activeHref === item.href;

              return (
                <li key={item.href}>
                  <a
                    aria-current={isActive ? "page" : undefined}
                    className={`transition-colors hover:text-[var(--portfolio-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--portfolio-accent)] ${
                      isActive ? "text-[var(--portfolio-accent)]" : ""
                    }`}
                    href={item.href}
                    onClick={() => setActiveHref(item.href)}
                  >
                    {isActive ? "> " : ""}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 gap-3 sm:gap-5 xl:justify-end">
          <ActionButton action={action} iconOnlyOnMobile />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
