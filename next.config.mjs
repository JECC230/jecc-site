import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Hardening headers. NOTE: `output: 'export'` produces plain static files, and
// GitHub Pages can't send custom headers — so these apply to `next dev` /
// `next start` and must be mirrored at the host (see public/_headers for
// Cloudflare Pages / Netlify) to protect production.
export const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

const isExport = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: __dirname,
  // `headers()` is unsupported with a static export (Next warns on build), so
  // it's only registered for the dev server.
  ...(!isExport && {
    async headers() {
      return [{ source: '/:path*', headers: securityHeaders }];
    },
  }),
};

export default nextConfig;
