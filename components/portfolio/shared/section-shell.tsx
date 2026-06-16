import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({ id, children, className = "" }: SectionShellProps) {
  return (
    <section
      id={id}
      className={`w-full overflow-hidden bg-[var(--portfolio-surface)] ${className}`}
    >
      {children}
    </section>
  );
}
