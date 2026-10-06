import { getImageMeta } from "@/lib/image-manifest";
import type { MediaItem } from "@/lib/portfolio-types";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { Reveal } from "../shared/reveal";

/** An image at its own proportions, from the build-time manifest. */
export function NaturalImage({
  item,
  sizes,
  transparent = false,
  priority = false,
  className = "",
}: {
  item: MediaItem;
  sizes: string;
  transparent?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const meta = getImageMeta(item.src);

  return (
    <CloudinaryImage
      alt={item.alt}
      className={`block h-auto w-full ${transparent ? "" : "border border-rule bg-plate-2"} ${className}`}
      height={meta?.height ?? 900}
      priority={priority}
      sizes={sizes}
      src={item.src}
      transparent={transparent}
      width={meta?.width ?? 1440}
    />
  );
}

/**
 * An asymmetric collage: images alternate between a wide left placement and
 * a narrower, offset right placement, each with a short caption set against
 * the empty side. The rhythm comes from the offsets and the space, not from
 * frames around the pictures.
 */
export function Collage({ items, transparent = false }: { items: MediaItem[]; transparent?: boolean }) {
  return (
    <ul className="flex flex-col gap-14 md:gap-20 lg:gap-24">
      {items.map((item, index) => {
        const pattern = index % 3;
        const image =
          pattern === 0
            ? "lg:col-span-8 lg:col-start-1"
            : pattern === 1
              ? "lg:col-span-6 lg:col-start-7 lg:row-start-1"
              : "lg:col-span-7 lg:col-start-3";
        const caption =
          pattern === 0
            ? "lg:col-span-3 lg:col-start-10 lg:self-end"
            : pattern === 1
              ? "lg:col-span-4 lg:col-start-2 lg:row-start-1 lg:self-center"
              : "lg:col-span-2 lg:col-start-10 lg:self-start";

        return (
          <li className="grid gap-4 lg:grid-cols-12 lg:gap-x-6" key={item.src}>
            <Reveal className={image} order={0}>
              <NaturalImage
                item={item}
                sizes="(min-width: 1440px) 860px, (min-width: 1024px) 60vw, 100vw"
                transparent={transparent}
              />
            </Reveal>
            {item.caption ? (
              <Reveal className={`flex flex-col gap-2 ${caption}`} from="none" order={1}>
                <span className="label text-ink-2">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-serif text-[clamp(1.5rem,1.2rem+0.8vw,2rem)] italic leading-tight text-ink">
                  {item.caption}
                </span>
              </Reveal>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
