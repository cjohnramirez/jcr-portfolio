"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const storageKey = "portfolio-theme";

/**
 * Theme switch.
 *
 * The current theme lives on `document.documentElement` as `data-theme`, set by
 * the inline script in app/layout.tsx before first paint. That is an external
 * store, so it is read with `useSyncExternalStore` rather than mirrored into
 * component state.
 *
 * The two alternatives both fail. Reading `document` inside `useState` makes
 * the server render one value and the client another — the same hydration
 * mismatch that left Reveal stuck at opacity 0, and `suppressHydrationWarning`
 * hides the warning without correcting the attribute. Syncing in an effect
 * causes the cascading render the lint rule warns about.
 *
 * `getServerSnapshot` returns light because the paper ground is the
 * unconditional default; only an explicit choice departs from it.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme ?? "light",
    () => "light",
  );

  const isDark = theme === "dark";

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch {
      // Private browsing can refuse storage; the toggle should still work.
    }
  }

  const Icon = isDark ? Sun : Moon;

  return (
    <button
      aria-label="Dark mode"
      aria-pressed={isDark}
      className="inline-flex size-11 items-center justify-center border border-rule bg-plate text-ink transition-colors hover:border-ink"
      onClick={toggleTheme}
      type="button"
    >
      {/* The icon shows the destination, not the current state. */}
      <Icon aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
    </button>
  );
}
