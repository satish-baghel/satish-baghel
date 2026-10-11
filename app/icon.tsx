import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Branded favicon generated in code (same pattern as opengraph-image.tsx).
// Renders Satish's photo cropped to a circle. The image is read from the
// filesystem at build time and inlined as a data URL, since ImageResponse
// can't resolve relative public/ paths.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const photo = readFileSync(join(process.cwd(), "public", "me.png"));
const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#020617",
        }}
      >
        <img
          src={photoSrc}
          alt=""
          width={32}
          height={32}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
