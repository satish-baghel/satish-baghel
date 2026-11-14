import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** URL segment of the single card per post: /blog/<slug>/opengraph-image/card */
export const OG_IMAGE_ID = "card";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// A static `alt` export can't vary by post, so the per-post alt text comes from
// here. It also fixes the image URL, which the TechArticle schema points at.
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  return [
    {
      id: OG_IMAGE_ID,
      alt: post?.title ?? site.name,
      size,
      contentType,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? site.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0d1324", borderLeft: "24px solid #8f2647",
          color: "#ece8e1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#9db8ff" }}>
          {new URL(site.url).hostname} / blog
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#a4aabb" }}>
          {site.name}
        </div>
      </div>
    ),
    { ...size },
  );
}
