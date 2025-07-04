import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
};

export default nextConfig;
