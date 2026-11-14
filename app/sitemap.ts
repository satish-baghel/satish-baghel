import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { blogPath, type PostMeta } from "@/lib/types";
import { isIndexedListing, pageCount, resolveListing } from "@/lib/blog-listing";
import { site } from "@/lib/site";

/** Newest edit among a set of posts. Undefined for an empty set. */
function latestChange(posts: PostMeta[]): Date | undefined {
  const times = posts.map((post) => new Date(post.updated ?? post.date).getTime());
  return times.length > 0 ? new Date(Math.max(...times)) : undefined;
}

// lastModified comes from post dates, never the build time: Google stops
// trusting lastmod on a site where it changes on every deploy. changefreq and
// priority are left out because Google ignores both.
export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts();

  const posts: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
  }));

  // The indexable listing routes: the all-posts pages plus every tag with
  // enough posts to be indexed (see isIndexedListing). Noindexed tag pages are
  // left out so the sitemap only lists URLs we want in search.
  const listings: MetadataRoute.Sitemap = [null, ...getAllTags()]
    .filter(isIndexedListing)
    .flatMap((tag) =>
      Array.from({ length: pageCount(tag) }, (_, i) => ({
        url: `${site.url}${blogPath(tag, i + 1)}`,
        lastModified: latestChange(resolveListing(tag, i + 1).posts),
      })),
    );

  return [
    // The home page lists the newest posts, so it changes when they do.
    { url: site.url, lastModified: latestChange(allPosts) },
    ...listings,
    { url: `${site.url}/about` },
    ...posts,
  ];
}
