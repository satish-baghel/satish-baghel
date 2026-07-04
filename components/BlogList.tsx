import Link from "next/link";
import { type Pagination, type PostMeta, blogPath } from "@/lib/types";
import { PostCard } from "@/components/PostCard";

const chipBase =
  "inline-flex h-9 items-center rounded-full border px-3 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
const chipActive = "border-accent bg-accent/10 text-accent";
const chipIdle = "border-border bg-surface text-muted hover:text-foreground";

export function BlogList({
  posts,
  tags,
  activeTag,
  pagination,
}: {
  posts: PostMeta[];
  tags: string[];
  activeTag: string | null;
  pagination: Pagination;
}) {
  const filters: (string | null)[] = [null, ...tags];

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter posts by tag"
      >
        {filters.map((tag) => {
          const selected = activeTag === tag;
          return (
            <Link
              key={tag ?? "all"}
              href={blogPath(tag, 1)}
              aria-current={selected ? "true" : undefined}
              className={`${chipBase} ${selected ? chipActive : chipIdle}`}
            >
              {tag ?? "all"}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="text-muted">No posts match this filter.</p>
        )}
      </div>

      {pagination.totalPages > 1 && (
        <PaginationNav activeTag={activeTag} pagination={pagination} />
      )}
    </div>
  );
}

function PaginationNav({
  activeTag,
  pagination,
}: {
  activeTag: string | null;
  pagination: Pagination;
}) {
  const { page, totalPages, hasPrev, hasNext } = pagination;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const arrow =
    "inline-flex h-9 items-center rounded-full border px-3 font-mono text-xs transition-colors";

  return (
    <nav
      className="mt-10 flex items-center justify-between gap-3"
      aria-label="Blog pagination"
    >
      {hasPrev ? (
        <Link
          href={blogPath(activeTag, page - 1)}
          rel="prev"
          className={`${arrow} ${chipIdle} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
        >
          ← Prev
        </Link>
      ) : (
        <span className={`${arrow} border-border/50 text-muted/40`} aria-disabled="true">
          ← Prev
        </span>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {pages.map((n) => {
          const current = n === page;
          return (
            <Link
              key={n}
              href={blogPath(activeTag, n)}
              aria-current={current ? "page" : undefined}
              className={`${chipBase} ${current ? chipActive : chipIdle}`}
            >
              {n}
            </Link>
          );
        })}
      </div>

      {hasNext ? (
        <Link
          href={blogPath(activeTag, page + 1)}
          rel="next"
          className={`${arrow} ${chipIdle} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
        >
          Next →
        </Link>
      ) : (
        <span className={`${arrow} border-border/50 text-muted/40`} aria-disabled="true">
          Next →
        </span>
      )}
    </nav>
  );
}
