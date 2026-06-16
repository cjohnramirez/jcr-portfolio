"use client";

import { useState } from "react";
import { Moon } from "lucide-react";

const storageKey = "portfolio-theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "dark",
  );

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(storageKey, nextTheme);
    setIsDark(!isDark);
  }

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="inline-flex min-h-12 min-w-12 items-center justify-center border border-[var(--portfolio-action-border)] bg-[var(--portfolio-theme-bg)] p-3 transition-colors hover:border-[var(--portfolio-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--portfolio-accent)] lg:min-h-[63px] lg:min-w-[63px] lg:p-5"
      suppressHydrationWarning
      type="button"
      onClick={toggleTheme}
    >
      <Moon aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
    </button>
  );
}
