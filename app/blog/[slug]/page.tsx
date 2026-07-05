import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, formatDate, type Post } from "@/lib/posts";
import { parseMarkdown, slugify } from "@/lib/markdown";
import { JsonLd } from "@/components/JsonLd";
import { CodeBlock } from "@/components/CodeBlock";
import { TagChip } from "@/components/TagChip";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keyword ? [post.keyword, ...post.tags] : post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

/** H2 headings, excluding meta sections — used for HowTo step schema. */
function stepHeadings(content: string): string[] {
  const skip = ["tl;dr", "faq", "related"];
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.replace(/^##\s+/, "").trim())
    .filter((heading) => !skip.includes(heading.toLowerCase()));
}

function buildSchemas(post: Post): Record<string, unknown>[] {
  const pageUrl = `${site.url}/blog/${post.slug}`;
  const schemas: Record<string, unknown>[] = [];

  schemas.push({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: site.name, url: `${site.url}/about` },
    publisher: { "@type": "Person", name: site.name },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    keywords: post.tags.join(", "),
    audience: { "@type": "Audience", audienceType: "Software developers" },
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
    ],
  });

  if (post.faq && post.faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  if (post.type === "howto") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: post.title,
      description: post.excerpt,
      step: stepHeadings(post.content).map((heading) => ({
        "@type": "HowToStep",
        name: heading,
        url: `${pageUrl}#${slugify(heading)}`,
      })),
    });
  }

  return schemas;
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const segments = parseMarkdown(post.content);
  const schemas = buildSchemas(post);

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16">
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}

      <Link
        href="/blog"
        className="font-mono text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
      >
        ← Back to blog
      </Link>

      <header className="mt-6 border-b border-border pb-8">
        <p className="font-mono text-sm font-medium text-accent">
          {post.type === "howto" ? "Guide" : "Article"}
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.updated && post.updated !== post.date && (
            <>
              <span aria-hidden="true">·</span>
              <span>updated {formatDate(post.updated)}</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>

      <div className="mt-10 space-y-6">
        {segments.map((segment, index) =>
          segment.type === "code" ? (
            <CodeBlock
              key={index}
              code={segment.code}
              lang={segment.lang}
              filename={segment.filename}
            />
          ) : (
            <div
              key={index}
              className="prose"
              dangerouslySetInnerHTML={{ __html: segment.html }}
            />
          ),
        )}
      </div>

      <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
        <p className="text-sm text-muted">
          Written by <span className="text-foreground">{site.name}</span>
        </p>
        <Link
          href="/blog"
          className="font-mono inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span aria-hidden="true">←</span> All posts
        </Link>
      </footer>
    </article>
  );
}
