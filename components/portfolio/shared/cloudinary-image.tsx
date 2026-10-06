"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";
import { useState } from "react";
import { CLOUDINARY_SOURCE_PREFIX, getLocalAssetFallback } from "@/lib/cloudinary";
import { getImageMeta } from "@/lib/image-manifest";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

type CloudinaryImageProps = Omit<ImageProps, "alt" | "src" | "sizes"> & {
  alt: string;
  src: string;
  /**
   * Required, not optional. Omitting it makes the browser assume 100vw and
   * download a variant far wider than the element ever renders.
   */
  sizes: string;
  /** Flat artwork — type and solid colour — where q_auto:eco shows artefacts. */
  highFidelity?: boolean;
  /**
   * Cut-outs with their own transparency: the blurred placeholder would show
   * through the transparent areas as a pale box, so it is skipped.
   */
  transparent?: boolean;
};

function buildLoader(highFidelity: boolean) {
  return function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
    const publicId = src.slice(CLOUDINARY_SOURCE_PREFIX.length);
    const transformations = [
      "f_auto",
      "c_limit",
      `w_${width}`,
      `q_${quality ?? (highFidelity ? "auto:good" : "auto")}`,
    ];

    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations.join(",")}/${publicId}`;
  };
}

/**
 * Image delivery with a two-layer loading state.
 *
 * The LQIP from lib/image-manifest.ts paints immediately via
 * `placeholder="blur"`, so the frame is never empty; the full image crossfades
 * over it. Combined with AnnotatedFrame's registration marks — which need no
 * network at all — something intentional is on screen in the first frame.
 *
 * This replaces a blinking three-box loader that sat over an empty box for the
 * entire download, which was both the slowest-feeling option and the most
 * generic-looking one.
 */
export function CloudinaryImage({
  alt,
  className,
  highFidelity = false,
  transparent = false,
  onError,
  onLoad,
  sizes,
  src,
  ...props
}: CloudinaryImageProps) {
  const shouldUseCloudinary =
    Boolean(cloudName) && src.startsWith(CLOUDINARY_SOURCE_PREFIX);
  const resolvedSrc = shouldUseCloudinary ? src : getLocalAssetFallback(src);
  const meta = getImageMeta(src);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image
      {...props}
      alt={alt}
      className={`${className ?? ""} transition-opacity duration-500 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      loader={shouldUseCloudinary ? buildLoader(highFidelity) : undefined}
      sizes={sizes}
      src={resolvedSrc}
      {...(meta && !transparent
        ? { placeholder: "blur" as const, blurDataURL: meta.blurDataURL }
        : {})}
      onError={(event) => {
        setIsLoaded(true);
        onError?.(event);
      }}
      onLoad={(event) => {
        setIsLoaded(true);
        onLoad?.(event);
      }}
    />
  );
}
