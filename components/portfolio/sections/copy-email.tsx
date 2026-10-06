"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

/** Copies the address; the confirmation is announced as well as shown. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard can be refused (insecure context, permissions). The address
      // is on screen and in the mailto link, so nothing is lost.
    }
  }

  return (
    <>
      <button
        className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-plate/30 px-5 text-[14px] font-medium text-plate transition-colors duration-200 hover:border-plate"
        onClick={copy}
        type="button"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4" strokeWidth={1.75} />
        ) : (
          <Copy aria-hidden="true" className="size-4" strokeWidth={1.75} />
        )}
        {copied ? "Copied" : "Copy email"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to the clipboard" : ""}
      </span>
    </>
  );
}
