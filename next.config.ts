import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    nodeMiddleware: true, // Bật Node.js Runtime cho middleware
  },
};

export default nextConfig;
