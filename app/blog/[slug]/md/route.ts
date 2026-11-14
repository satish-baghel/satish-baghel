import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { postMarkdown, textResponse } from "@/lib/llms";

// Each post as raw Markdown for AI assistants, linked from /llms.txt. Served
// at /blog/<slug>.md through the rewrite in next.config.ts.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/blog/[slug]/md">,
): Promise<Response> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return new Response("Not found", { status: 404 });
  return textResponse(postMarkdown(post), "text/markdown");
}
