import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { site } from "@/lib/site";

export const alt = `Blog post — ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
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
          background: "#020617",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#818cf8" }}>
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
        <div style={{ display: "flex", fontSize: 30, color: "#94a3b8" }}>
          {site.name}
        </div>
      </div>
    ),
    { ...size },
  );
}
