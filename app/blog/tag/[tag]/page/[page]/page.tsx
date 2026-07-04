import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getTagBySlug } from "@/lib/posts";
import { tagSlug } from "@/lib/types";
import { BlogListing } from "@/components/BlogListing";
import { listingMetadata, pageCount } from "@/lib/blog-listing";

export const dynamicParams = false;

type Params = { tag: string; page: string };

/** Pages 2..N for each tag. Currently empty (no tag spans >1 page) but keeps
 *  deep pagination links valid the moment a tag grows past one page. */
export function generateStaticParams(): Params[] {
  return getAllTags().flatMap((tag) => {
    const total = pageCount(tag);
    return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({
      tag: tagSlug(tag),
      page: String(i + 2),
    }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tag, page } = await params;
  return listingMetadata(getTagBySlug(tag), Number(page));
}

export default async function BlogTagPagedPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tag, page } = await params;
  const activeTag = getTagBySlug(tag);
  if (!activeTag) notFound();
  return <BlogListing activeTag={activeTag} page={Number(page)} />;
}
