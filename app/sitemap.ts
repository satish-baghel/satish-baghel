import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { blogPath } from "@/lib/types";
import { pageCount } from "@/lib/blog-listing";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Every statically-generated listing route: the all-posts pages plus one
  // series per tag. Mirrors what `generateStaticParams` builds.
  const listings: MetadataRoute.Sitemap = [null, ...getAllTags()].flatMap(
    (tag) =>
      Array.from({ length: pageCount(tag) }, (_, i) => ({
        url: `${site.url}${blogPath(tag, i + 1)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: tag ? 0.6 : 0.8,
      })),
  );

  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...listings,
    { url: `${site.url}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...posts,
  ];
}
