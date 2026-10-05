import { ImageResponse } from "next/og";

export const alt = "Bilguun — Frontend & Mobile Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time rather than shipped as a file, so the card can never
 * drift from the copy on the page. Without this the link previews as a blank
 * card everywhere it gets pasted.
 */
export default function OpengraphImage() {
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
          background: "#0d1221",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#c4f042" }}>
          FRONTEND &amp; MOBILE DEVELOPER
        </div>
        <div style={{ fontSize: 128, fontWeight: 700, marginTop: 16 }}>Bilguun</div>
        <div style={{ fontSize: 34, color: "#94a3b8", marginTop: 24, maxWidth: 900 }}>
          React and React Native front-ends for leasing and fintech apps — live on the App Store
          and Google Play.
        </div>
      </div>
    ),
    size,
  );
}
