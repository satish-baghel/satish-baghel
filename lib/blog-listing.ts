import type { Metadata } from "next";
import { getPagedPostsMeta } from "@/lib/posts";
import { blogPath, tagLabel } from "@/lib/types";
import { shareImage, site } from "@/lib/site";

/**
 * Shared logic for the statically-generated blog listing routes:
 *   /blog, /blog/page/[page], /blog/tag/[tag], /blog/tag/[tag]/page/[page]
 *
 * Keeping the resolver, metadata builder, and page-count helper here means the
 * four thin route files never drift in how they paginate, filter, or describe
 * themselves.
 */

export const POSTS_PER_PAGE = 6;

/** Resolve one listing (tag filter + page) to its posts and pagination. */
export function resolveListing(activeTag: string | null, page: number) {
  return getPagedPostsMeta({
    page,
    perPage: POSTS_PER_PAGE,
    tag: activeTag ?? undefined,
  });
}

/** Total number of pages for a given tag filter (>= 1). */
export function pageCount(activeTag: string | null): number {
  return resolveListing(activeTag, 1).pagination.totalPages;
}

/**
 * Tags with fewer posts than this get noindex and stay out of the sitemap: a
 * page listing one or two posts is thin and near-duplicates the posts
 * themselves. Links are still followed, so the posts get crawled.
 */
export const MIN_INDEXED_TAG_POSTS = 3;

/** Whether a listing should be indexed. The unfiltered listings always are. */
export function isIndexedListing(activeTag: string | null): boolean {
  if (!activeTag) return true;
  return resolveListing(activeTag, 1).pagination.total >= MIN_INDEXED_TAG_POSTS;
}

/**
 * Metadata for a listing. Self-referencing canonical (via `blogPath`) so each
 * tag/page is indexed on its own terms rather than collapsing onto `/blog`.
 */
export function listingMetadata(activeTag: string | null, page: number): Metadata {
  const { pagination } = resolveListing(activeTag, page);

  const scope = activeTag
    ? `tagged “${tagLabel(activeTag)}”`
    : "on Next.js, React, and TypeScript";
  const pageSuffix =
    pagination.page > 1
      ? ` — Page ${pagination.page} of ${pagination.totalPages}`
      : "";
  const title = `${activeTag ? `${tagLabel(activeTag)} posts` : "Blog"}${pageSuffix}`;
  const description = `Articles ${scope} — tutorials, debugging guides, and tips for software engineers.${
    pagination.page > 1 ? ` Page ${pagination.page}.` : ""
  }`;

  const canonical = blogPath(activeTag, pagination.page);

  return {
    title,
    description,
    alternates: { canonical },
    ...(isIndexedListing(activeTag)
      ? {}
      : { robots: { index: false, follow: true } }),
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: canonical,
      type: "website",
      siteName: site.name,
      locale: site.locale,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [shareImage],
    },
  };
}
