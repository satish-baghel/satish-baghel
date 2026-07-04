/**
 * Pure types and helpers with NO Node.js (`fs`) dependency, so they are safe to
 * import from client components. The `fs`-based loaders live in `lib/posts.ts`.
 */

/** A single Q&A pair, rendered on the page and emitted as FAQPage JSON-LD. */
export type Faq = { q: string; a: string };

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO date (YYYY-MM-DD)
  updated?: string; // ISO date; falls back to `date`
  excerpt: string;
  tags: string[];
  keyword?: string; // primary SEO keyword/intent
  /** "article" (default) | "howto" — drives which JSON-LD schema is emitted. */
  type?: "article" | "howto";
  content: string; // raw Markdown body (frontmatter stripped)
  readingMinutes: number;
  faq?: Faq[];
};

/**
 * A post without its Markdown `content` — the shape used for listings, where
 * shipping every post's full body would bloat the payload for no benefit.
 */
export type PostMeta = Omit<Post, "content">;

/** Pagination envelope returned alongside a page of results. */
export type Pagination = {
  page: number; // 1-based current page
  perPage: number; // items per page (after clamping)
  total: number; // total items across all pages
  totalPages: number; // total number of pages (>= 1)
  hasPrev: boolean;
  hasNext: boolean;
};

/**
 * URL-safe slug for a tag. Mirrors the heading `slugify` in `lib/markdown.ts`
 * (lowercased, punctuation stripped, spaces → dashes) so e.g. `next.js` →
 * `nextjs`. Kept here — with no `fs` dependency — so it is safe to import from
 * client components and from `lib/types` consumers alike.
 */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Canonical `/blog` path for a given tag + page. Shared by the listing UI and
 * its metadata so links, canonicals, and prev/next hints never drift.
 *
 * Path-based (not query-string) so every listing is a distinct, statically
 * prerendered route:
 *   - no tag, page 1        → `/blog`
 *   - no tag, page N        → `/blog/page/N`
 *   - tag, page 1           → `/blog/tag/<slug>`
 *   - tag, page N           → `/blog/tag/<slug>/page/N`
 */
export function blogPath(tag: string | null, page: number): string {
  const base = tag ? `/blog/tag/${tagSlug(tag)}` : "/blog";
  return page > 1 ? `${base}/page/${page}` : base;
}

/** Format an ISO date for display, e.g. "Jun 20, 2026". */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
