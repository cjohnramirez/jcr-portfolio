type BrandInfoBlockProps = {
  align?: "start" | "end";
  items: string[];
  title: string;
};

export function BrandInfoBlock({
  align = "start",
  items,
  title,
}: BrandInfoBlockProps) {
  return (
    <div
      className={`text-xs font-normal uppercase leading-normal text-[var(--portfolio-text)] lg:text-[14px] ${
        align === "end" ? "lg:text-left" : ""
      }`}
    >
      <p>{title}</p>
      {items.map((item) => (
        <p key={item}>{`> ${item}`}</p>
      ))}
    </div>
  );
}
