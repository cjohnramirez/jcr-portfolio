"use client";

import { X } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";

type MediaDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

/**
 * A modal built on the native <dialog> element.
 *
 * `showModal()` gives the hard parts for free: focus moves inside, the rest
 * of the page becomes inert, Escape closes it, and the top layer sits above
 * the sticky header. Focus is returned to the opener by hand: browsers do not
 * all restore it when the dialog closes from a state change.
 * The entry animation is CSS on [open], in the spirit of Aceternity's
 * Animated Modal, and the global reduced-motion rule switches it off.
 */
export function MediaDialog({ open, onClose, title, subtitle, children }: MediaDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
    }
    if (!open) {
      if (dialog.open) dialog.close();
      opener.current?.focus();
      opener.current = null;
    }
  }, [open]);

  return (
    <dialog
      aria-label={title}
      className="m-auto max-h-[92svh] w-[min(1100px,94vw)] overflow-hidden bg-plate p-0 text-ink opacity-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-[dialog-in_280ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself.
        if (event.target === ref.current) onClose();
      }}
      onClose={onClose}
      ref={ref}
    >
      <div className="flex items-start justify-between gap-6 border-b border-rule px-5 py-4 md:px-6">
        <div className="flex flex-col gap-1">
          <p className="font-serif text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-none">{title}</p>
          {subtitle ? <p className="label text-ink-2">{subtitle}</p> : null}
        </div>
        <button
          aria-label="Close"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-rule transition-colors duration-200 hover:border-ink"
          onClick={onClose}
          type="button"
        >
          <X aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </button>
      </div>
      <div className="max-h-[calc(92svh-5rem)] overflow-y-auto p-4 md:p-6">{open ? children : null}</div>
    </dialog>
  );
}
