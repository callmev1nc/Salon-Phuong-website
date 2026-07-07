import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Prefer AVIF then WebP for the heavy gallery payload.
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
