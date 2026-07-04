import type { Metadata } from "next";
import { getPagedPostsMeta } from "@/lib/posts";
import { blogPath } from "@/lib/types";

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
 * Metadata for a listing. Self-referencing canonical (via `blogPath`) so each
 * tag/page is indexed on its own terms rather than collapsing onto `/blog`.
 */
export function listingMetadata(activeTag: string | null, page: number): Metadata {
  const { pagination } = resolveListing(activeTag, page);

  const scope = activeTag
    ? `tagged “${activeTag}”`
    : "on Next.js, React, and TypeScript";
  const pageSuffix =
    pagination.page > 1
      ? ` — Page ${pagination.page} of ${pagination.totalPages}`
      : "";
  const title = `${activeTag ? `Blog: ${activeTag}` : "Blog"}${pageSuffix}`;
  const description = `Articles ${scope} — tutorials, debugging guides, and tips for software engineers.${
    pagination.page > 1 ? ` Page ${pagination.page}.` : ""
  }`;

  const canonical = blogPath(activeTag, pagination.page);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | Satish Baghel`,
      description,
      url: canonical,
      type: "website",
    },
  };
}
