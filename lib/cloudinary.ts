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
