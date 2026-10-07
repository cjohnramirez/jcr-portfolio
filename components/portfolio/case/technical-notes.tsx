"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import type { CaseContent } from "@/lib/portfolio-types";
import { MediaDialog } from "../fx/media-dialog";

type Note = { title: string; description: string };

type TechnicalNotesProps = {
  notes: Note[];
  stack?: string[];
  decisions?: CaseContent["decisions"];
  /** `dialog` keeps a one-viewport layout intact; `inline` expands in place. */
  mode: "dialog" | "inline";
  title: string;
};

function NotesBody({ notes, stack, decisions }: Omit<TechnicalNotesProps, "mode" | "title">) {
  return (
    <div className="flex flex-col gap-10">
      {decisions?.length ? (
        <section className="flex flex-col gap-4">
          <h3 className="label text-ink-2">Decisions</h3>
          <ol className="border-t border-rule">
            {decisions.map((decision, index) => (
              <li className="flex items-baseline gap-4 border-b border-rule py-4" key={decision.title}>
                <span className="w-8 shrink-0 font-serif text-[20px] italic leading-none text-spot">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-serif text-[20px] leading-tight text-ink">{decision.title}</span>
                  <span className="text-[15px] leading-relaxed text-ink-2">{decision.line}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <dl className="grid gap-x-10 gap-y-8 md:grid-cols-2">
        {notes.map((note) => (
          <div className="flex flex-col gap-2" key={note.title}>
            <dt className="font-serif text-[22px] leading-tight text-ink">{note.title}</dt>
            <dd className="text-[15px] leading-relaxed text-ink-2">{note.description}</dd>
          </div>
        ))}
      </dl>

      {stack?.length ? (
        <section className="flex flex-col gap-3">
          <h3 className="label text-ink-2">Full stack</h3>
          <ul className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <li className="border border-rule px-3 py-1.5 text-[13px] text-ink" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

/**
 * The long-form record, behind one control.
 *
 * The page itself carries a handful of short statements; everything a
 * developer reviewer might want (architecture, money handling, tests) is
 * still here, unabridged, one click away.
 */
export function TechnicalNotes({ notes, stack, decisions, mode, title }: TechnicalNotesProps) {
  const [open, setOpen] = useState(false);
  const count = notes.length;

  if (mode === "inline") {
    return (
      <details className="group border border-rule bg-plate">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-[16px] text-ink md:px-6 [&::-webkit-details-marker]:hidden">
          <span>
            Technical notes <span className="text-ink-2">· {count} sections</span>
          </span>
          <Plus aria-hidden="true" className="size-4 transition-transform duration-300 group-open:rotate-45" strokeWidth={1.75} />
        </summary>
        <div className="border-t border-rule px-5 py-8 md:px-6">
          <NotesBody decisions={decisions} notes={notes} stack={stack} />
        </div>
      </details>
    );
  }

  return (
    <>
      <button
        className="inline-flex h-12 items-center gap-2 border border-rule bg-plate px-5 text-[15px] text-ink transition-colors duration-200 hover:border-ink"
        onClick={() => setOpen(true)}
        type="button"
      >
        Technical notes
      </button>
      <MediaDialog onClose={() => setOpen(false)} open={open} subtitle="Technical notes" title={title}>
        <NotesBody decisions={decisions} notes={notes} stack={stack} />
      </MediaDialog>
    </>
  );
}
