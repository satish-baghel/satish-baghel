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
          background: "#0d1613", borderLeft: "24px solid #d9773a",
          color: "#ece8de",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#7fd6a8" }}>
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
        <div style={{ display: "flex", fontSize: 34, color: "#a6b2aa", marginTop: 16 }}>
          {site.jobTitle} · Node.js, React & Next.js · {site.location}
        </div>
      </div>
    ),
    { ...size },
  );
}
