# Cloudinary setup

This portfolio uses Cloudinary only for image delivery. It does not need an API
key or API secret at runtime.

1. Upload every portfolio asset to Cloudinary under the `portfolio/` folder with
   the same public IDs, including nested folders. For example:

   - `portfolio/profile-image.png`
   - `portfolio/projects/gcs-system/gcs-homepage.png`
   - `portfolio/designs/snap-engineering/snap-homepage.png`
   - `portfolio/additionals/student-leadership/agrivanture.JPG`
   - `portfolio/brands/icon-instagram.svg`

2. Copy `.env.example` to `.env.local`.

3. Set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` to the cloud name shown in the
   Cloudinary dashboard. Do not paste a full `CLOUDINARY_URL` here.

4. Restart the Next.js development server.

When the environment variable is present, portfolio images are delivered from
Cloudinary with automatic format, responsive width, and automatic quality
transformations. Without it, the same data automatically falls back to files in
`public/portfolio`.

To add a new image, upload it to Cloudinary and store its public ID in
`lib/portfolio-data.ts`:

```ts
imageSrc: cloudinaryAsset("portfolio/projects/example.png")
```

Do not add `CLOUDINARY_API_SECRET` to client-side code or prefix it with
`NEXT_PUBLIC_`.
