import { Download, Send } from "lucide-react";
import type { ActionLink } from "@/lib/portfolio-types";
import { CloudinaryImage } from "./cloudinary-image";

type ActionButtonProps = {
  action: ActionLink;
  className?: string;
  iconOnlyOnMobile?: boolean;
};

const iconMap: Record<NonNullable<ActionLink["icon"]>, string> = {
  download: "↓",
  github: "◆",
  mail: "□",
  arrow: "→",
  social: "◦",
  send: "→",
};

export function ActionButton({
  action,
  className = "",
  iconOnlyOnMobile = false,
}: ActionButtonProps) {
  const externalProps = action.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      className={`inline-flex min-h-12 min-w-12 items-center justify-center gap-3 border border-rule bg-plate-2 px-3 py-3 text-[12px] font-normal uppercase leading-none text-ink transition-colors hover:border-spot focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spot lg:min-h-[63px] lg:gap-5 lg:px-5 lg:py-5 lg:text-[14px] ${className}`}
      href={action.href}
      {...externalProps}
    >
      {action.iconSrc ? (
        <CloudinaryImage
          alt=""
          aria-hidden="true"
          className="portfolio-icon"
          height={20}
          sizes="20px"
          src={action.iconSrc}
          width={20}
        />
      ) : action.icon === "download" ? (
        <Download aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
      ) : action.icon === "send" ? (
        <Send aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
      ) : action.icon ? (
        <span aria-hidden="true" className="text-[12px] leading-none">
          {iconMap[action.icon]}
        </span>
      ) : null}
      <span className={iconOnlyOnMobile ? "sr-only lg:not-sr-only" : ""}>
        {action.label}
      </span>
      {action.external ? (
        <span className="sr-only">(opens in a new tab)</span>
      ) : null}
    </a>
  );
}
