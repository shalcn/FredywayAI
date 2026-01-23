import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/6.html',
        destination: '/6',
      },
    ];
  },
};

export default nextConfig;
