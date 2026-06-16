"use client";

import { useState } from "react";
import type { PortfolioBrand } from "@/lib/portfolio-types";
import { BrandTab } from "./brand-tab";

type BrandTabListProps = {
  brands: PortfolioBrand[];
};

export function BrandTabList({ brands }: BrandTabListProps) {
  const [activeId, setActiveId] = useState(brands[0]?.id ?? "");

  if (brands.length === 0) {
    return null;
  }

  return (
    <div className="border border-[var(--portfolio-border)]">
      {brands.map((brand) => (
        <BrandTab
          brand={brand}
          isActive={brand.id === activeId}
          key={brand.id}
          onSelect={setActiveId}
        />
      ))}
    </div>
  );
}
