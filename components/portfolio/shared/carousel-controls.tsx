import { ArrowLeft, ArrowRight } from "lucide-react";

type CarouselControlsProps = {
  /** What the current slide is, e.g. "Home page" or a deck page title. */
  title: string;
  index: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
  /** Names the thing being paged, for the button labels: "sheet", "screen". */
  unit?: string;
};

const button =
  "inline-flex h-11 items-center gap-2 border border-rule bg-plate px-4 text-[14px] text-ink transition-colors duration-200 hover:border-ink disabled:pointer-events-none disabled:opacity-40";

/**
 * The bottom bar every carousel on the site shares: what you are looking at
 * and where you are on the left, Prev and Next on the right. The buttons are
 * the navbar's buttons, bordered boxes with text, inset from the edge rather
 * than welded to it.
 */
export function CarouselControls({ title, index, count, onPrev, onNext, unit = "sheet" }: CarouselControlsProps) {
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-3 border-t border-rule bg-plate p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pl-5">
      <p className="flex min-w-0 items-baseline gap-3">
        <span className="label shrink-0 tabular-nums text-spot">{counter}</span>
        <span className="truncate text-[14px] text-ink">{title}</span>
      </p>
      <div className="flex shrink-0 items-center gap-2">
        <button aria-label={`Previous ${unit}`} className={button} disabled={count < 2} onClick={onPrev} type="button">
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
          Prev
        </button>
        <button aria-label={`Next ${unit}`} className={button} disabled={count < 2} onClick={onNext} type="button">
          Next
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {`${unit} ${index + 1} of ${count}: ${title}`}
      </p>
    </div>
  );
}
