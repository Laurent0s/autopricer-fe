const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  async rewrites() {
    return isDev
      ? [
          { source: "/api/price-analyze/:path*", destination: "http://46.62.152.2/price-analyze/:path*" },
          { source: "/api/price-years/:path*",   destination: "http://46.62.152.2/price-years/:path*" },
          { source: "/api/price-budget/:path*",  destination: "http://46.62.152.2/price-budget/:path*" },
        ]
      : [];
  },
};
export default nextConfig;