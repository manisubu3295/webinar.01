/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` produces an `out/` folder that can be
  // served from any static file server (or opened via a local server) at
  // the venue, with no Node process required at presentation time.
  output: 'export',
  reactStrictMode: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
