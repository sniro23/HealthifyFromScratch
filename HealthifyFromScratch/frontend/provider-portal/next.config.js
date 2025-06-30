/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    // Fix for React 18 + Next.js 14 SSR issues
    esmExternals: true,
  },
  // Disable static generation for pages with SSR issues during build
  output: 'standalone',
  // Ensure proper error handling during build
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // React strict mode for better error detection
  reactStrictMode: true,
  // Improve build stability
  swcMinify: true,
  // Fix for component rendering issues
  transpilePackages: ['@healthify/shared-components'],
}

module.exports = nextConfig;
