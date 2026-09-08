import type { ActionLink } from "@/lib/portfolio-types";
import { CloudinaryImage } from "../shared/cloudinary-image";

type FooterLinkProps = {
  link: ActionLink;
};

export function FooterLink({ link }: FooterLinkProps) {
  const externalProps = link.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      className="inline-flex min-h-12 items-center justify-center gap-3 border border-rule bg-plate-2 px-4 py-3 text-xs font-normal uppercase leading-none text-ink transition-colors hover:border-spot focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spot lg:min-h-[63px] lg:gap-5 lg:px-5 lg:py-5 lg:text-[14px]"
      href={link.href}
      {...externalProps}
    >
      {link.iconSrc ? (
        <CloudinaryImage
          alt=""
          aria-hidden="true"
          className="portfolio-icon size-5 shrink-0"
          height={22}
          sizes="22px"
          src={link.iconSrc}
          width={22}
        />
      ) : null}
      <span>{link.label}</span>
      {link.external ? (
        <span className="sr-only">(opens in a new tab)</span>
      ) : null}
    </a>
  );
}
