"use client";

import Image, {
  type ImageLoaderProps,
  type ImageProps,
} from "next/image";
import { useState } from "react";
import {
  CLOUDINARY_SOURCE_PREFIX,
  getLocalAssetFallback,
} from "@/lib/cloudinary";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

type CloudinaryImageProps = Omit<ImageProps, "alt" | "src"> & {
  alt: string;
  showLoader?: boolean;
  src: string;
};

function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  const publicId = src.slice(CLOUDINARY_SOURCE_PREFIX.length);
  const transformations = [
    "f_auto",
    "c_limit",
    `w_${width}`,
    `q_${quality ?? "auto"}`,
  ];

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations.join(",")}/${publicId}`;
}

export function CloudinaryImage({
  alt,
  className,
  onError,
  onLoad,
  showLoader = true,
  src,
  ...props
}: CloudinaryImageProps) {
  const shouldUseCloudinary =
    Boolean(cloudName) && src.startsWith(CLOUDINARY_SOURCE_PREFIX);
  const resolvedSrc = shouldUseCloudinary ? src : getLocalAssetFallback(src);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const isLoaded = loadedSrc === resolvedSrc;

  return (
    <>
      {showLoader && !isLoaded && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
        >
          <div className="flex items-center gap-2.5">
            <span className="portfolio-loader-box portfolio-loader-box-1 size-[21px]" />
            <span className="portfolio-loader-box portfolio-loader-box-2 size-[21px]" />
            <span className="portfolio-loader-box portfolio-loader-box-3 size-[21px]" />
          </div>
        </div>
      )}
      <Image
        {...props}
        alt={alt}
        className={`${className ?? ""} ${isLoaded ? "opacity-100" : "opacity-0"}`}
        loader={shouldUseCloudinary ? cloudinaryLoader : undefined}
        src={resolvedSrc}
        onError={(event) => {
          setLoadedSrc(resolvedSrc);
          onError?.(event);
        }}
        onLoad={(event) => {
          setLoadedSrc(resolvedSrc);
          onLoad?.(event);
        }}
      />
    </>
  );
}
