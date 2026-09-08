import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GROUND = "#0b0c0d";
const PLATE = "#141618";
const INK = "#edebe7";
const INK_2 = "#8a8f94";
const RULE = "#2a2e32";
const SPOT = "#5b84f5";
const MARK = "#ff3d9a";

/**
 * The card shown when a link to this site is pasted anywhere.
 *
 * Rendered by Satori, which is much stricter than a browser: every element
 * holding more than one child needs an explicit `display: flex`, and a style
 * value of `undefined` throws rather than being ignored. So the crop marks are
 * four fully-specified objects instead of one conditional template, and there
 * are no `&nbsp;` entities. Colours are literal token values because custom
 * properties are not resolved here.
 */
const CORNERS = [
  { top: 24, left: 24, borderTop: `2px solid ${MARK}`, borderLeft: `2px solid ${MARK}` },
  { top: 24, right: 24, borderTop: `2px solid ${MARK}`, borderRight: `2px solid ${MARK}` },
  { bottom: 24, left: 24, borderBottom: `2px solid ${MARK}`, borderLeft: `2px solid ${MARK}` },
  { bottom: 24, right: 24, borderBottom: `2px solid ${MARK}`, borderRight: `2px solid ${MARK}` },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: GROUND,
          padding: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            backgroundColor: PLATE,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "28px 40px",
              borderBottom: `1px solid ${RULE}`,
              fontSize: 20,
              letterSpacing: 3,
              color: INK_2,
            }}
          >
            <div style={{ display: "flex" }}>
              <span style={{ color: MARK, marginRight: 18 }}>00</span>
              <span>COVER</span>
            </div>
            <span>OPEN TO WORK</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              padding: "0 40px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                fontSize: 82,
                lineHeight: 1.05,
                letterSpacing: -2,
                color: INK,
                maxWidth: 940,
              }}
            >
              <span style={{ marginRight: 20 }}>A creative</span>
              <span style={{ color: SPOT, marginRight: 20 }}>web developer</span>
              <span style={{ marginRight: 20 }}>and</span>
              <span style={{ color: SPOT }}>designer</span>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 26,
                color: INK_2,
              }}
            >
              <span>{SITE_NAME} — Cagayan de Oro, Philippines</span>
            </div>
          </div>

          {CORNERS.map((corner, index) => (
            <div
              key={index}
              style={{ position: "absolute", width: 28, height: 28, ...corner }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
