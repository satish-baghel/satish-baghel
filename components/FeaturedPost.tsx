import Link from "next/link";
import { type Post, formatDate } from "@/lib/types";
import { TagChip } from "@/components/TagChip";

/**
 * Large editorial "featured" card for the newest post. Visually heavier than
 * the standard PostCard used in lists.
 */
export function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card)] transition-all duration-200 hover:border-accent/60 hover:shadow-[var(--shadow-card-hover)] sm:p-9">
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
        <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 font-medium text-accent">
          Featured
        </span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h3 className="font-display mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
        <Link
          href={`/blog/${post.slug}`}
          className="text-foreground transition-colors after:absolute after:inset-0 group-hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 max-w-2xl leading-relaxed text-muted">{post.excerpt}</p>

      {post.tags.length > 0 && (
        <div className="relative mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      )}

      <span className="font-mono relative mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
        Read article
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </article>
  );
}
