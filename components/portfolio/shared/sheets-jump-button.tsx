"use client";

type SheetsJumpButtonProps = {
  /** id of the AnnotatedFrame figure that wraps the carousel. */
  targetId: string;
  count: number;
};

/**
 * Scrolls the carousel to the centre of the space below the fixed nav, then
 * moves focus to it so keyboard users land on the controls they came for.
 *
 * `scrollIntoView({ block: "center" })` centres against the full viewport and
 * ignores the fixed header, which leaves the frame visibly low; the offset is
 * computed here instead.
 */
export function SheetsJumpButton({ targetId, count }: SheetsJumpButtonProps) {
  function jump() {
    const frame = document.getElementById(targetId);
    if (!frame) return;

    const nav = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const rect = frame.getBoundingClientRect();
    const slack = Math.max(0, (window.innerHeight - nav - rect.height) / 2);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: window.scrollY + rect.top - nav - slack,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    frame
      .querySelector<HTMLElement>('[aria-roledescription="carousel"]')
      ?.focus({ preventScroll: true });
  }

  return (
    <button
      className="font-spec uppercase tracking-[0.08em] text-spot underline decoration-rule underline-offset-[6px] transition-colors duration-200 hover:decoration-spot focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spot"
      onClick={jump}
      type="button"
    >
      View {count} sheets ↓
    </button>
  );
}
