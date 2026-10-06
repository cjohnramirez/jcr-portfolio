"use client";

import { useEffect, useState } from "react";

/**
 * Scroll spy: the id of the section currently under the reading line.
 *
 * Progressive enhancement only. The navigation is plain anchors that work
 * without JavaScript; this adds the "you are here" state on top.
 *
 * The root margin turns the viewport into a thin band 35% of the way down, so
 * exactly one section intersects at a time and the active one changes as its
 * heading crosses that band, not when its last pixel leaves the screen.
 */
export function useActiveSection(ids: readonly string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -64% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    // Above the first section (the hero) nothing is active.
    function onScroll() {
      if (elements[0] && elements[0].getBoundingClientRect().top > window.innerHeight * 0.35) {
        setActive(null);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids, enabled]);

  return enabled ? active : null;
}
