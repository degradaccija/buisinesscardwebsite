import { ImageResponse } from "next/og";
import { isLocale } from "@/i18n";
import { getSiteProfile } from "@/lib/content";
import type { Locale } from "@/lib/types";

export const alt = "Mārcis Krēgers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GRID_LINE = "rgba(143, 124, 230, 0.04)";
const BACKGROUND = "#0a0a12";
const TEXT_PRIMARY = "#e8e8f0";
const TEXT_MUTED = "#9a9ab0";
const ACCENT = "#8f7ce6";

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: FontWeight;
  style: "normal" | "italic";
}

async function fetchGoogleFont(
  family: string,
  weight: FontWeight,
): Promise<OgFont | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`,
    ).then((res) => (res.ok ? res.text() : null));
    if (!css) return null;
    const latin = css.split("/* latin */")[1] ?? css;
    const url = latin.match(/url\(([^)]+)\)/)?.[1];
    if (!url) return null;
    const data = await fetch(url).then((res) =>
      res.ok ? res.arrayBuffer() : null,
    );
    if (!data) return null;
    return { name: family, data, weight, style: "normal" };
  } catch {
    return null;
  }
}

let fontsPromise: Promise<OgFont[]> | null = null;

function getFonts(): Promise<OgFont[]> {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      fetchGoogleFont("Space Grotesk", 700),
      fetchGoogleFont("JetBrains Mono", 500),
    ]).then((fonts) => fonts.filter((font): font is OgFont => font !== null));
  }
  return fontsPromise;
}

const verticalLines = Array.from({ length: 14 }, (_, i) => (
  <div
    key={`v${i}`}
    style={{
      position: "absolute",
      top: 0,
      left: 80 + i * 80,
      width: 1,
      height: "100%",
      backgroundColor: GRID_LINE,
    }}
  />
));

const horizontalLines = Array.from({ length: 7 }, (_, i) => (
  <div
    key={`h${i}`}
    style={{
      position: "absolute",
      top: 80 + i * 80,
      left: 0,
      height: 1,
      width: "100%",
      backgroundColor: GRID_LINE,
    }}
  />
));

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const profile = await getSiteProfile();
  const name = profile?.name ?? "Mārcis Krēgers";
  const role = profile
    ? locale === "en"
      ? profile.role_en
      : profile.role_lv
    : null;
  const tagline = profile
    ? locale === "en"
      ? profile.tagline_en
      : profile.tagline_lv
    : null;
  const fonts = await getFonts();

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "0 80px",
          backgroundColor: BACKGROUND,
        }}
      >
        {verticalLines}
        {horizontalLines}
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 80,
            fontSize: 44,
            fontWeight: 700,
            color: ACCENT,
            letterSpacing: "0.02em",
            fontFamily: "Space Grotesk",
          }}
        >
          MK
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: TEXT_PRIMARY,
            lineHeight: 1.15,
            fontFamily: "Space Grotesk",
          }}
        >
          {name}
        </div>
        {role ? (
          <div
            style={{
              marginTop: 24,
              fontSize: 32,
              fontWeight: 500,
              color: ACCENT,
              letterSpacing: "0.04em",
              fontFamily: "JetBrains Mono",
            }}
          >
            {role}
          </div>
        ) : null}
        {tagline ? (
          <div
            style={{
              position: "absolute",
              bottom: 56,
              left: 80,
              maxWidth: 980,
              fontSize: 26,
              color: TEXT_MUTED,
              letterSpacing: "0.02em",
              fontFamily: "JetBrains Mono",
            }}
          >
            {tagline}
          </div>
        ) : null}
      </div>
    ),
    { width: 1200, height: 630, fonts },
  );
}
