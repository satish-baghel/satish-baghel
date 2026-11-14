import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Clean .md URLs for the Markdown copy of each post (app/blog/[slug]/md).
  async rewrites() {
    return [{ source: "/blog/:slug.md", destination: "/blog/:slug/md" }];
  },
};

export default nextConfig;
