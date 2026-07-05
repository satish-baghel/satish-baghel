import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#020617",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#818cf8" }}>
          {new URL(site.url).hostname}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            marginTop: 24,
            letterSpacing: "-0.02em",
          }}
        >
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#94a3b8", marginTop: 16 }}>
          {site.jobTitle} · Next.js, React & TypeScript
        </div>
      </div>
    ),
    { ...size },
  );
}
