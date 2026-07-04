import fs from "node:fs";
import path from "node:path";
import type { Faq, Pagination, Post, PostMeta } from "@/lib/types";
import { tagSlug } from "@/lib/types";

export type { Faq, Pagination, Post, PostMeta } from "@/lib/types";
export { formatDate } from "@/lib/types";

const POSTS_DIR = path.join(process.cwd(), "posts");

function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseInlineArray(value: string): string[] {
  return value
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((item) => stripQuotes(item))
    .filter(Boolean);
}

type Frontmatter = {
  title: string;
  date: string;
  updated?: string;
  excerpt: string;
  tags: string[];
  keyword?: string;
  type?: "article" | "howto";
  faq?: Faq[];
};

/**
 * Minimal YAML frontmatter parser for the subset used by this blog:
 * scalars, inline arrays (`[a, b]`), block list of scalars (`- item`), and a
 * `faq:` block list of `- q:` / `a:` maps. No external dependency.
 */
function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("Post is missing a frontmatter block");
  }
  const [, fm, body] = match;
  const lines = fm.split("\n");

  const data: Record<string, string | string[] | Faq[]> = {};
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i++;
      continue;
    }

    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) {
      i++;
      continue;
    }
    const key = kv[1];
    const value = kv[2];

    if (key === "faq" && value.trim() === "") {
      // Block list of { q, a } maps.
      const faq: Faq[] = [];
      i++;
      let current: Partial<Faq> = {};
      while (i < lines.length && /^\s+/.test(lines[i])) {
        const itemStart = lines[i].match(/^\s*-\s*q:\s*(.*)$/);
        const aLine = lines[i].match(/^\s*a:\s*(.*)$/);
        if (itemStart) {
          if (current.q && current.a) faq.push(current as Faq);
          current = { q: stripQuotes(itemStart[1]) };
        } else if (aLine) {
          current.a = stripQuotes(aLine[1]);
        }
        i++;
      }
      if (current.q && current.a) faq.push(current as Faq);
      data.faq = faq;
      continue;
    }

    if (value.trim() === "") {
      // Block list of scalars (`- item`).
      const items: string[] = [];
      i++;
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(stripQuotes(lines[i].replace(/^\s*-\s+/, "")));
        i++;
      }
      data[key] = items;
      continue;
    }

    if (value.trim().startsWith("[")) {
      data[key] = parseInlineArray(value);
      i++;
      continue;
    }

    data[key] = stripQuotes(value);
    i++;
  }

  const typeValue = data.type === "howto" ? "howto" : "article";

  return {
    data: {
      title: String(data.title ?? ""),
      date: String(data.date ?? ""),
      updated: data.updated ? String(data.updated) : undefined,
      excerpt: String(data.excerpt ?? ""),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      keyword: data.keyword ? String(data.keyword) : undefined,
      type: typeValue,
      faq: Array.isArray(data.faq) ? (data.faq as Faq[]) : undefined,
    },
    body: body.trim(),
  };
}

function readPost(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, body } = parseFrontmatter(raw);
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title,
    date: data.date,
    updated: data.updated,
    excerpt: data.excerpt,
    tags: data.tags,
    keyword: data.keyword,
    type: data.type,
    content: body,
    readingMinutes: Math.max(1, Math.ceil(words / 200)),
    faq: data.faq,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * In-memory metadata index keyed by file name. Parsing every `.md` file on
 * every request does not scale to 1000+ posts, so we cache the parsed metadata
 * and re-read a file only when its `mtime` changes. `stat`-ing the directory is
 * far cheaper than reading + parsing every body, and stays correct as posts are
 * added, edited, or removed. The full `content` is dropped — listings never
 * need it.
 */
type MetaEntry = { mtimeMs: number; meta: PostMeta };
const metaCache = new Map<string, MetaEntry>();

/**
 * All post metadata (no Markdown body), sorted newest-first. Uses `metaCache`
 * so repeated calls only re-parse files that changed on disk.
 */
export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"));
  const present = new Set(files);

  const metas: PostMeta[] = [];
  for (const file of files) {
    const { mtimeMs } = fs.statSync(path.join(POSTS_DIR, file));
    const cached = metaCache.get(file);
    if (cached && cached.mtimeMs === mtimeMs) {
      metas.push(cached.meta);
      continue;
    }
    // `content` is intentionally discarded — the index only holds metadata.
    const { content: _content, ...meta } = readPost(file);
    metaCache.set(file, { mtimeMs, meta });
    metas.push(meta);
  }

  // Evict entries for files that no longer exist.
  for (const key of metaCache.keys()) {
    if (!present.has(key)) metaCache.delete(key);
  }

  return metas.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export type PagedPosts = {
  posts: PostMeta[];
  pagination: Pagination;
};

export type PageQuery = {
  page?: number;
  perPage?: number;
  /** Restrict to posts carrying this tag (case-insensitive). */
  tag?: string;
  /** Full-text-ish filter over title, excerpt, and tags (case-insensitive). */
  query?: string;
};

export const DEFAULT_PER_PAGE = 10;
export const MAX_PER_PAGE = 100;

function clampInt(value: number | undefined, min: number, max: number, fallback: number): number {
  if (value === undefined || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(value)));
}

/**
 * Filter, sort, and paginate post metadata. Filtering runs against the cached
 * index (not the disk), and only the requested page's slice is returned, so the
 * response size is bounded by `perPage` regardless of how many posts exist.
 */
export function getPagedPostsMeta(opts: PageQuery = {}): PagedPosts {
  let posts = getAllPostsMeta();

  if (opts.tag) {
    const wanted = opts.tag.toLowerCase();
    posts = posts.filter((p) => p.tags.some((t) => t.toLowerCase() === wanted));
  }

  if (opts.query) {
    const q = opts.query.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  const total = posts.length;
  const perPage = clampInt(opts.perPage, 1, MAX_PER_PAGE, DEFAULT_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const page = clampInt(opts.page, 1, totalPages, 1);

  const start = (page - 1) * perPage;
  return {
    posts: posts.slice(start, start + perPage),
    pagination: {
      page,
      perPage,
      total,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages,
    },
  };
}

export function getPostBySlug(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(POSTS_DIR, file))) return null;
  return readPost(file);
}

/** All unique tags across posts, sorted alphabetically. */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    post.tags.forEach((tag) => tags.add(tag));
  }
  return [...tags].sort();
}

/**
 * Resolve a URL tag slug (e.g. `nextjs`) back to its display tag (`next.js`).
 * Returns `null` when no tag slugifies to the given value — used by the static
 * tag routes to 404 unknown slugs.
 */
export function getTagBySlug(slug: string): string | null {
  return getAllTags().find((tag) => tagSlug(tag) === slug) ?? null;
}
