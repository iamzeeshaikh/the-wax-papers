import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

/**
 * Default social share image.
 *
 * Product and blog pages nominate their own photo. Everything else — the
 * homepage, the location pages, /about-us, /contact-us — had no og:image at
 * all, so shares and AI answer cards had nothing to pull.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — custom wax paper packaging in the UK`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FBF7EE",
          padding: "76px 84px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 9,
            textTransform: "uppercase",
            color: "#8A6B3B",
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          {SITE_NAME}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 70,
            lineHeight: 1.08,
            color: "#2A2118",
            maxWidth: 920,
          }}
        >
          Custom printed wax &amp; greaseproof paper
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ display: "flex", width: 60, height: 6, background: "#8A6B3B" }} />
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#6B5B47",
              fontFamily: "sans-serif",
            }}
          >
            Food-safe materials, low minimums, UK delivery
          </div>
        </div>
      </div>
    ),
    size
  );
}
