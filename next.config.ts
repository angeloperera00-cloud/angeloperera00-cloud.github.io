import type { NextConfig } from 'next';

/**
 * Static export: the whole site builds to /out and can be hosted anywhere
 * (Vercel, Netlify, GitHub Pages, any CDN). Remove `output` if you later want
 * server features such as on-demand Medium syncing via a route handler.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
