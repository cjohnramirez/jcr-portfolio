import type { Gallery } from "@/lib/portfolio-types";
import { CloudinaryImage } from "./cloudinary-image";
import { Reveal } from "./reveal";

/**
 * Supporting imagery under a plate's sheets: mockups, original designs,
 * collateral. Full-length page captures sit in a fixed-height frame that
 * scrolls, so they stay readable instead of shrinking to a sliver.
 */
export function GalleryGrid({ gallery }: { gallery: Gallery }) {
  const single = gallery.items.length === 1;

  return (
    <section aria-labelledby={`${gallery.id}-heading`} className="flex flex-col gap-6 border-t border-rule pt-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-[clamp(1.75rem,1.3rem+1.4vw,2.75rem)] leading-none text-ink" id={`${gallery.id}-heading`}>
          {gallery.title}
        </h2>
        {gallery.summary ? <p className="max-w-[62ch] text-[16px] leading-relaxed text-ink-2">{gallery.summary}</p> : null}
      </div>

      <ul className={`grid gap-5 ${single ? "" : "md:grid-cols-2"}`}>
        {gallery.items.map((item, index) => (
          <li className="flex flex-col gap-2" key={item.src}>
            <Reveal order={index % 2}>
              {item.tall ? (
                <div
                  aria-label={`${item.alt} Scroll to see the full page.`}
                  className="max-h-[80svh] overflow-y-auto border border-rule bg-plate-2"
                  role="region"
                  tabIndex={0}
                >
                  {/* Plain img: next/image needs a box, and this one is as tall as the page. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={item.alt} className="block h-auto w-full" decoding="async" loading="lazy" src={`/${item.src.replace(/^\/?cloudinary\//, "")}`} />
                </div>
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden border border-rule bg-plate-2">
                  <CloudinaryImage
                    alt={item.alt}
                    className="object-contain"
                    fill
                    sizes="(min-width: 1440px) 660px, (min-width: 768px) 50vw, 100vw"
                    src={item.src}
                  />
                </div>
              )}
              {item.caption ? <p className="label mt-2 text-ink-2">{item.caption}</p> : null}
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
