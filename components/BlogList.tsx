import Link from "next/link";
import { ChevronLeft, ChevronRight, Hash, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Pagination, type PostMeta, blogPath } from "@/lib/types";
import { PostCard } from "@/components/PostCard";
import { FeaturedPost } from "@/components/FeaturedPost";

/** Shared pill styling for tag filters + page numbers on top of shadcn Button. */
const chip = "rounded-full";
const chipIdle = "text-muted-foreground hover:text-foreground";

export function BlogList({
  posts,
  tags,
  activeTag,
  pagination,
  featured = null,
}: {
  posts: PostMeta[];
  tags: string[];
  activeTag: string | null;
  pagination: Pagination;
  /** Optional lead post rendered as a large editorial card above the list. */
  featured?: PostMeta | null;
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
            <Button
              key={tag ?? "all"}
              asChild
              size="sm"
              variant={selected ? "default" : "outline"}
              className={selected ? chip : `${chip} ${chipIdle}`}
            >
              <Link
                href={blogPath(tag, 1)}
                aria-current={selected ? "true" : undefined}
              >
                {tag === null ? (
                  <Layers aria-hidden="true" />
                ) : (
                  <Hash aria-hidden="true" />
                )}
                {tag ?? "all"}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {featured && <FeaturedPost post={featured} />}
        {posts.length > 0
          ? posts.map((post) => <PostCard key={post.slug} post={post} />)
          : !featured && (
              <p className="text-muted-foreground">
                No posts match this filter.
              </p>
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

  return (
    <nav
      className="mt-10 flex items-center justify-between gap-3"
      aria-label="Blog pagination"
    >
      {hasPrev ? (
        <Button asChild variant="outline" size="sm" className={chip}>
          <Link href={blogPath(activeTag, page - 1)} rel="prev">
            <ChevronLeft aria-hidden="true" /> Prev
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" className={chip} disabled>
          <ChevronLeft aria-hidden="true" /> Prev
        </Button>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {pages.map((n) => {
          const current = n === page;
          return (
            <Button
              key={n}
              asChild
              size="icon-sm"
              variant={current ? "default" : "ghost"}
              className={current ? chip : `${chip} ${chipIdle}`}
            >
              <Link
                href={blogPath(activeTag, n)}
                aria-current={current ? "page" : undefined}
              >
                {n}
              </Link>
            </Button>
          );
        })}
      </div>

      {hasNext ? (
        <Button asChild variant="outline" size="sm" className={chip}>
          <Link href={blogPath(activeTag, page + 1)} rel="next">
            Next <ChevronRight aria-hidden="true" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" className={chip} disabled>
          Next <ChevronRight aria-hidden="true" />
        </Button>
      )}
    </nav>
  );
}
