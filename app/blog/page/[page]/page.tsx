import type { Metadata } from "next";
import { BlogListing } from "@/components/BlogListing";
import { listingMetadata, pageCount } from "@/lib/blog-listing";

// Only the pages emitted by generateStaticParams are built; anything else 404s
// at build time rather than falling back to on-demand rendering.
export const dynamicParams = false;

type Params = { page: string };

/** Pages 2..N — page 1 lives at the bare `/blog` route. */
export function generateStaticParams(): Params[] {
  const total = pageCount(null);
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { page } = await params;
  return listingMetadata(null, Number(page));
}

export default async function BlogPagedPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { page } = await params;
  return <BlogListing activeTag={null} page={Number(page)} />;
}
