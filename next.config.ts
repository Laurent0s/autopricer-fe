// next.config.ts
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // other Next options …

  /**
   * In dev we proxy any request that starts with /api/price-analyze
   * to the real backend. In prod the array is empty → no rewrite.
   */
  async rewrites() {
    return isDev
      ? [
          {
            source: "/api/price-analyze/:path*",
            destination: "http://46.62.152.2/price-analyze/:path*",
          },
          {
            source: "/api/price-years/:path*",
            destination: "http://46.62.152.2/price-years/:path*",
          },
          {
            source: "/api/price-budget/:path*",
            destination: "http://46.62.152.2/price-budget/:path*",
          },
        ]
      : [];
  },
};

export default nextConfig;
