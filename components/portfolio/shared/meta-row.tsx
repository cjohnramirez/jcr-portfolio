type MetaRowProps = {
  left: string;
  right?: string;
};

export function MetaRow({ left, right }: MetaRowProps) {
  return (
    <div className="flex flex-col gap-4 text-xs uppercase leading-none text-[var(--portfolio-text)] sm:flex-row sm:items-center sm:justify-between lg:text-[14px]">
      <p className="hidden lg:block">{left}</p>
      {right ? (
        <div className="flex items-center gap-5">
          <p>{right}</p>
          <div className="flex items-center gap-2.5" aria-hidden="true">
            <span className="portfolio-loader-box portfolio-loader-box-1 size-[21px]" />
            <span className="portfolio-loader-box portfolio-loader-box-2 size-[21px]" />
            <span className="portfolio-loader-box portfolio-loader-box-3 size-[21px]" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
