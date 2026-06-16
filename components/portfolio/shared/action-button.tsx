import Image from "next/image";
import { Download, Send } from "lucide-react";
import type { ActionLink } from "@/lib/portfolio-types";

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
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <a
      className={`inline-flex min-h-12 min-w-12 items-center justify-center gap-3 border border-[var(--portfolio-action-border)] bg-[var(--portfolio-action-bg)] px-3 py-3 text-[12px] font-normal uppercase leading-none text-[var(--portfolio-action-text)] transition-colors hover:border-[var(--portfolio-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--portfolio-accent)] lg:min-h-[63px] lg:gap-5 lg:px-5 lg:py-5 lg:text-[14px] ${className}`}
      href={action.href}
      {...externalProps}
    >
      {action.iconSrc ? (
        <Image
          alt=""
          aria-hidden="true"
          className="portfolio-icon"
          height={20}
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
    </a>
  );
}
