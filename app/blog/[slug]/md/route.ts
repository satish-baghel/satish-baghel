import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { postMarkdown, textResponse } from "@/lib/llms";
import { site } from "@/lib/site";

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
  const res = textResponse(postMarkdown(post), "text/markdown");
  // Point search engines at the HTML post so this copy isn't indexed as a duplicate.
  res.headers.set("Link", `<${site.url}/blog/${slug}>; rel="canonical"`);
  return res;
}
