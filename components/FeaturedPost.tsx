import Link from "next/link";
import { type PostMeta, formatDate } from "@/lib/types";
import { TagChip } from "@/components/TagChip";

/**
 * Large "featured" note for the newest post — a big yellow Post-it held up with
 * a strip of tape and a corner pin. Visually heavier than the standard PostCard.
 * Takes `PostMeta`, so listings (which omit `content`) can render it too.
 */
export function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <article
      className="note note--yellow note--folded group p-7 sm:p-9"
      style={{ ["--rot"]: "-1.2deg" } as React.CSSProperties}
    >
      <span className="tape" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs note-ink-soft">
        <span className="note-hand inline-flex items-center gap-1.5 text-base leading-none note-ink">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--note-pin)]" />
          Featured
        </span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h3 className="note-hand mt-3 text-3xl font-bold leading-tight sm:text-4xl">
        <Link
          href={`/blog/${post.slug}`}
          className="note-ink transition-transform after:absolute after:inset-0 hover:-rotate-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--note-ink)] rounded"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 max-w-2xl leading-relaxed note-ink-soft">{post.excerpt}</p>

      {post.tags.length > 0 && (
        <div className="relative mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagChip key={tag} tag={tag} onNote />
          ))}
        </div>
      )}

      <span className="note-hand relative mt-6 inline-flex items-center gap-1 text-lg note-ink">
        Read article
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </article>
  );
}
