import { getAllTags } from "@/lib/posts";
import { blogPath } from "@/lib/types";
import { site } from "@/lib/site";
import { BlogList } from "@/components/BlogList";
import { resolveListing } from "@/lib/blog-listing";

/**
 * Rendered view shared by every blog listing route. Given a tag filter and a
 * page number (both already validated by the route's `generateStaticParams`),
 * it resolves the slice, emits rel=prev/next hints, and renders the list.
 */
export function BlogListing({
  activeTag,
  page,
}: {
  activeTag: string | null;
  page: number;
}) {
  const { posts, pagination } = resolveListing(activeTag, page);
  const tags = getAllTags();

  // rel=prev/next hints for search engines. Absolute URLs; React 19 hoists
  // these <link> tags into <head>. Kept alongside the canonical in metadata.
  const prevUrl = pagination.hasPrev
    ? `${site.url}${blogPath(activeTag, pagination.page - 1)}`
    : null;
  const nextUrl = pagination.hasNext
    ? `${site.url}${blogPath(activeTag, pagination.page + 1)}`
    : null;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        All posts
      </h1>
      <p className="mt-3 text-muted">
        {pagination.total} {pagination.total === 1 ? "post" : "posts"}
        {activeTag ? ` tagged "${activeTag}"` : " on web engineering"}. Filter by
        tag below.
      </p>
      <div className="mt-10">
        <BlogList
          posts={posts}
          tags={tags}
          activeTag={activeTag}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
