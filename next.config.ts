import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      // Silence multiple lockfiles warning
    },
  },
};

export default nextConfig;
