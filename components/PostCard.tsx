import Link from "next/link";
import { type PostMeta, formatDate } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import { TagChip } from "@/components/TagChip";
import { Card } from "@/components/ui/card";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Card className="spotlight group relative gap-0 p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </div>
      <h3 className="font-display mt-2 text-lg font-semibold tracking-tight">
        {/* Stretched link — the whole card is one click/tap target (Fitts's law). */}
        <Link
          href={`/blog/${post.slug}`}
          className="rounded-sm text-foreground outline-none transition-colors after:absolute after:inset-0 group-hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {post.excerpt}
      </p>
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      )}
    </Card>
  );
}
