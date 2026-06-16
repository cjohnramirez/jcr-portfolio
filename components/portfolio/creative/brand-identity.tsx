import type { PortfolioBrand } from "@/lib/portfolio-types";

type BrandIdentityProps = {
  brand: PortfolioBrand;
};

export function BrandIdentity({ brand }: BrandIdentityProps) {
  return (
    <div className="flex min-w-0 items-center gap-6 lg:gap-10">
      <div
        aria-hidden="true"
        className="size-[54px] shrink-0 border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] lg:size-[66px]"
      />
      <div className="min-w-0 text-[var(--portfolio-text)]">
        <h3 className="truncate text-[28px] font-normal uppercase leading-none tracking-normal lg:text-[36px]">
          {brand.title}
        </h3>
        <p className="mt-2 text-xs font-normal uppercase leading-normal lg:text-[14px]">
          {brand.meta}
        </p>
      </div>
    </div>
  );
}
