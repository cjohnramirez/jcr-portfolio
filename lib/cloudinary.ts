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

/**
 * Full-length motion pieces are too large for the repository, so they are
 * served from Cloudinary's video pipeline. Without a cloud name configured
 * (local development) they fall back to `public/`, where the encode script
 * leaves them.
 */
export function videoUrl(publicId: string) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const id = publicId.replace(/^\/+/, "");

  return cloudName
    ? `https://res.cloudinary.com/${cloudName}/video/upload/q_auto/${id}`
    : `/${id}`;
}
