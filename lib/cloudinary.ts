export const CLOUDINARY_SOURCE_PREFIX = "/cloudinary/";

export function cloudinaryAsset(publicId: string) {
  const normalizedPublicId = publicId.replace(/^\/+/, "");

  return `${CLOUDINARY_SOURCE_PREFIX}${normalizedPublicId}`;
}

export function getLocalAssetFallback(src: string) {
  if (!src.startsWith(CLOUDINARY_SOURCE_PREFIX)) {
    return src;
  }

  return `/${src.slice(CLOUDINARY_SOURCE_PREFIX.length)}`;
}

/** The cloud that holds the full-length motion encodes. */
const VIDEO_CLOUD = "dch6eenk5";

/**
 * Full-length motion pieces are too large for the repository (they are
 * gitignored), so they always stream from Cloudinary's video pipeline. This is
 * independent of NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, which only switches image
 * delivery: production serves images from `public/` and leaves it unset.
 */
export function videoUrl(publicId: string) {
  const id = publicId.replace(/^\/+/, "");
  return `https://res.cloudinary.com/${VIDEO_CLOUD}/video/upload/q_auto/${id}`;
}
