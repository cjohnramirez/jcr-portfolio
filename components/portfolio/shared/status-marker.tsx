type StatusMarkerProps = {
  label: string;
};

export function StatusMarker({ label }: StatusMarkerProps) {
  return (
    <div className="flex items-center gap-5 text-xs uppercase leading-none text-[var(--portfolio-text)] lg:text-[14px]">
      <div className="flex items-center gap-2.5" aria-hidden="true">
        <span className="portfolio-loader-box portfolio-loader-box-1 size-[21px]" />
        <span className="portfolio-loader-box portfolio-loader-box-2 size-[21px]" />
        <span className="portfolio-loader-box portfolio-loader-box-3 size-[21px]" />
      </div>
      <p className="hidden lg:block">{label}</p>
    </div>
  );
}
