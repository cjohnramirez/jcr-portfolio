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
 * frames around the pictures. Transparent phone renders instead all take half
 * the row, alternating sides.
 *
 * With `fit`, every image gets a section one viewport tall, capped in height
 * and centred in it, alternating sides; a very wide image takes the full row
 * with its caption underneath.
 */
export function Collage({
  items,
  transparent = false,
  fit = false,
}: {
  items: MediaItem[];
  transparent?: boolean;
  fit?: boolean;
}) {
  if (fit) {
    return (
      <ul className="flex flex-col gap-14 md:gap-20 lg:gap-0">
        {items.map((item, index) => {
          const meta = getImageMeta(item.src);
          const wide = meta ? meta.width / meta.height > 2 : false;
          const right = index % 2 === 1;
          const image = wide
            ? "lg:col-span-12"
            : right
              ? "lg:col-span-7 lg:col-start-6 lg:row-start-1"
              : "lg:col-span-7 lg:col-start-1";
          const caption = wide
            ? "lg:col-span-6 lg:col-start-1"
            : right
              ? "lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:self-center"
              : "lg:col-span-4 lg:col-start-9 lg:self-center";

          return (
            <li
              className="grid content-center gap-4 lg:min-h-[calc(100svh-88px)] lg:grid-cols-12 lg:gap-x-6 lg:py-10"
              key={item.src}
            >
              <Reveal className={`flex justify-center ${image}`} order={0}>
                <NaturalImage
                  className="lg:max-h-[56svh] lg:w-auto"
                  item={item}
                  sizes="(min-width: 1440px) 1100px, (min-width: 1024px) 76vw, 100vw"
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

  return (
    <ul className="flex flex-col gap-14 md:gap-20 lg:gap-24">      {items.map((item, index) => {
        // Phone renders all take one size, half the row, alternating left and
        // right with the caption centred on the empty side.
        const pattern = transparent ? (index % 2 ? 1 : 3) : index % 3;
        const image = [
          "lg:col-span-8 lg:col-start-1",
          "lg:col-span-6 lg:col-start-7 lg:row-start-1",
          "lg:col-span-7 lg:col-start-3",
          "lg:col-span-6 lg:col-start-1",
        ][pattern];
        const caption = [
          "lg:col-span-3 lg:col-start-10 lg:self-end",
          "lg:col-span-4 lg:col-start-2 lg:row-start-1 lg:self-center",
          "lg:col-span-2 lg:col-start-10 lg:self-start",
          "lg:col-span-4 lg:col-start-8 lg:self-center",
        ][pattern];

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
