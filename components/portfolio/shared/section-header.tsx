type SectionHeaderProps = {
  label: string;
  rightLabel?: string;
};

export function SectionHeader({ label, rightLabel }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-[var(--portfolio-border)] px-5 py-4 text-[11px] font-medium uppercase leading-none sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="size-3 bg-[var(--portfolio-text)]" />
        <span aria-hidden="true" className="size-3 bg-[var(--portfolio-border)]" />
        <span className="hidden text-[var(--portfolio-muted)] lg:inline">{label}</span>
      </div>
      {rightLabel ? (
        <span className="text-[var(--portfolio-muted)]">{rightLabel}</span>
      ) : null}
    </div>
  );
}
