import Link from "next/link";
import { type PostMeta, formatDate } from "@/lib/types";
import { TagChip } from "@/components/TagChip";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:border-accent/60 hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex items-center gap-2 font-mono text-xs text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min read</span>
      </div>
      <h3 className="font-display mt-2 text-lg font-semibold tracking-tight">
        <Link
          href={`/blog/${post.slug}`}
          className="text-foreground transition-colors group-hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
