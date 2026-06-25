import type { PortfolioBrand } from "@/lib/portfolio-types";

type BrandIdentityProps = {
  brand: PortfolioBrand;
};

export function BrandIdentity({ brand }: BrandIdentityProps) {
  return (
    <div className="flex min-w-0 items-center gap-6 lg:gap-10">
      <div className="min-w-0 text-[var(--portfolio-text)] ">
        <h3 className="truncate text-[26px] font-normal uppercase leading-none tracking-normal lg:text-[26px]">
          {brand.title}
        </h3>
        <p className="mt-2 text-xs font-normal uppercase leading-normal lg:text-[14px]">
          {brand.meta}
        </p>
      </div>
    </div>
  );
}
