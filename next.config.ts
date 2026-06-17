import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
