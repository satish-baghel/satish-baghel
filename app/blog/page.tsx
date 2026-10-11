import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/BlogListing";
import { listingMetadata } from "@/lib/blog-listing";

// No dynamic params or search params — this route is fully static.
export const metadata: Metadata = listingMetadata(null, 1);

export default function BlogPage() {
  return <BlogListing activeTag={null} page={1} />;
}
