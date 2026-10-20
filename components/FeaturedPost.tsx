import Link from "next/link";
import { type PostMeta, formatDate } from "@/lib/types";
import { ArrowRight, Sparkles } from "lucide-react";
import { TagChip } from "@/components/TagChip";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/**
 * Large editorial "featured" card for the newest post. Visually heavier than
 * the standard PostCard used in lists. Takes `PostMeta` — it never needs the
 * Markdown body, so listings (which omit `content`) can render it too.
 */
export function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <Card className="cta-glow group relative gap-0 overflow-hidden p-7 shadow-[var(--shadow-card)] transition-all duration-200 hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)] sm:p-9">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Badge className="bg-brand-gradient text-white">
          <Sparkles aria-hidden="true" />
          Featured
        </Badge>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h3 className="font-display mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
        <Link
          href={`/blog/${post.slug}`}
          className="rounded-sm text-foreground outline-none transition-colors after:absolute after:inset-0 group-hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        {post.excerpt}
      </p>

      {post.tags.length > 0 && (
        <div className="relative mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      )}

      <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Read article
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </Card>
  );
}
