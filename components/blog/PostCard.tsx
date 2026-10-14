import Link from "next/link";
import { type PostMeta, formatDate } from "@/lib/types";
import { TagChip } from "@/components/blog/TagChip";
import { Card } from "@/components/ui/card";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Card asChild>
      <article className="group relative flex flex-col p-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-clay-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <span
            aria-hidden="true"
            className="transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
          >
            →
          </span>
        </div>
        <h3 className="font-display mt-2 text-lg font-semibold tracking-tight">
          {/* Stretched link — the whole card is one click/tap target (Fitts's law). */}
          <Link
            href={`/blog/${post.slug}`}
            className="text-foreground transition-colors after:absolute after:inset-0 group-hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        )}
      </article>
    </Card>
  );
}
