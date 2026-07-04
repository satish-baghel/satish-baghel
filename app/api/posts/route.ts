import type { NextRequest } from "next/server";
import { getPagedPostsMeta } from "@/lib/posts";

/**
 * Blog listing API. Returns paginated post metadata parsed from the `.md` files
 * in `/posts`. The heavy lifting (parsing, an mtime-keyed cache, and slicing to
 * a single page) lives in `lib/posts.ts` so this handler stays a thin adapter
 * from query params → JSON.
 *
 * GET /api/posts?page=1&perPage=10&tag=nextjs&q=hydration
 *   page    — 1-based page number (default 1)
 *   perPage — items per page (default 10, capped at 100)
 *   tag     — filter to posts carrying this tag (case-insensitive)
 *   q       — filter over title/excerpt/tags (case-insensitive)
 */

// Reads the filesystem, so it must run on Node (not the Edge runtime).
export const runtime = "nodejs";
// Response depends on query params — opt out of full-route static caching.
export const dynamic = "force-dynamic";

function parseIntParam(value: string | null): number | undefined {
  if (value === null) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const { posts, pagination } = getPagedPostsMeta({
    page: parseIntParam(sp.get("page")),
    perPage: parseIntParam(sp.get("perPage")),
    tag: sp.get("tag")?.trim() || undefined,
    query: sp.get("q")?.trim() || undefined,
  });

  return Response.json(
    { posts, pagination },
    {
      headers: {
        // Cache at the CDN for a minute; serve stale while revalidating so
        // bursts of traffic don't all hit the filesystem.
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
