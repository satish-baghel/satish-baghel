import Link from "next/link";
import { type PostMeta, formatDate } from "@/lib/types";
import { TagChip } from "@/components/TagChip";
import { noteColorClass, noteStyle } from "@/lib/notes";

/**
 * A blog post as a pinned sticky note. `index` (its position in a list) drives
 * the paper colour and tilt; a push-pin tacks it to the board.
 */
export function PostCard({
  post,
  index = 0,
}: {
  post: PostMeta;
  index?: number;
}) {
  return (
    <article
      className={`note group flex flex-col p-5 ${noteColorClass(index)}`}
      style={noteStyle(index)}
    >
      <span className="pin" aria-hidden="true" />
      <div className="flex items-center justify-between gap-2 font-mono text-xs note-ink-soft">
        <div className="flex items-center gap-2">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          →
        </span>
      </div>
      <h3 className="note-hand mt-2 text-2xl font-bold leading-tight">
        {/* Stretched link — the whole note is one click/tap target. */}
        <Link
          href={`/blog/${post.slug}`}
          className="note-ink transition-transform after:absolute after:inset-0 hover:-rotate-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--note-ink)] rounded"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed note-ink-soft">{post.excerpt}</p>
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagChip key={tag} tag={tag} onNote />
          ))}
        </div>
      )}
    </article>
  );
}
