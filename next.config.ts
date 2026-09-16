import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first — typically 20–30% smaller than WebP on the photographic
    // content here, with WebP as the fallback for older clients.
    formats: ["image/avif", "image/webp"],

    // Trimmed from the defaults, which ship eight breakpoints. These are the
    // widths this design actually renders at: the plate column maxes out at
    // 1440, and the 2x retina variant of that is 2560. Every unused entry is
    // another variant the optimiser can be asked to generate.
    deviceSizes: [375, 640, 828, 1080, 1440, 1920, 2560],
    imageSizes: [180, 220, 264, 384],

    // The Cloudinary loader is applied per-component rather than globally,
    // because the local /public fallback must keep using Next's own optimiser
    // when NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is unset. remotePatterns still
    // needs to allow the CDN host for the cases that do go through it.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  // The GCS System plate was rebuilt and rebranded as Steady, which moved its
  // slug. 308 rather than 307: the old address is never coming back, and the
  // plate has been linked to from outside the site.
  async redirects() {
    return [
      {
        source: "/work/gcs-system",
        destination: "/work/steady",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
