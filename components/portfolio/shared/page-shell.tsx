import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
};

/**
 * The main column every route renders into.
 *
 * Structural only — Step 5 replaces this with the `Plate` primitive that
 * carries the manual's document furniture (plate number, running head, folio).
 */
export function PageShell({ children }: PageShellProps) {
  return (
    <main
      className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-5 bg-ground p-5 pt-[100px] text-ink lg:pt-[120px]"
      id="main"
    >
      {children}
    </main>
  );
}
