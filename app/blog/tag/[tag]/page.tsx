import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getTagBySlug } from "@/lib/posts";
import { tagSlug } from "@/lib/types";
import { BlogListing } from "@/components/blog/BlogListing";
import { listingMetadata } from "@/lib/blog-listing";

export const dynamicParams = false;

type Params = { tag: string };

/** One static route per known tag, keyed by its URL slug. */
export function generateStaticParams(): Params[] {
  return getAllTags().map((tag) => ({ tag: tagSlug(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tag } = await params;
  return listingMetadata(getTagBySlug(tag), 1);
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tag } = await params;
  const activeTag = getTagBySlug(tag);
  if (!activeTag) notFound();
  return <BlogListing activeTag={activeTag} page={1} />;
}
