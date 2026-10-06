import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} | ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Literal token values: Satori does not resolve CSS custom properties.
const GROUND = "#e7e5e0";
const PLATE = "#fbfaf8";
const INK = "#101112";
const INK_2 = "#5a5d61";
const RULE = "#d6d3cd";
const SPOT = "#1f4fd8";
const GREEN = "#1f9d55";

/**
 * The card shown when a link to this site is pasted anywhere: the hero, in
 * miniature. Satori is stricter than a browser: every element with more than
 * one child needs an explicit `display: flex`, and `undefined` style values
 * throw rather than being ignored.
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
          justifyContent: "space-between",
          backgroundColor: GROUND,
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: INK }}>
            <div style={{ width: 22, height: 22, backgroundColor: SPOT, marginRight: 16 }} />
            <span>JCR.DEV</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: PLATE,
              border: `1px solid ${RULE}`,
              padding: "12px 20px",
              fontSize: 22,
              color: INK,
            }}
          >
            <div
              style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: GREEN, marginRight: 12 }}
            />
            <span>Open to work</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, lineHeight: 1, letterSpacing: -4, color: INK }}>
            {SITE_NAME}
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 52, color: SPOT, fontStyle: "italic" }}>
            Developer and brand designer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${RULE}`,
            paddingTop: 24,
            fontSize: 22,
            letterSpacing: 2,
            color: INK_2,
          }}
        >
          <span>FULL-STACK · RESEARCH · BRAND</span>
          <span>CAGAYAN DE ORO, PHILIPPINES</span>
        </div>
      </div>
    ),
    size,
  );
}
