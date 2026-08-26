import { ImageResponse } from "next/og";
import { isLocale } from "@/i18n";
import { getSiteProfile } from "@/lib/content";
import type { Locale } from "@/lib/types";

export const alt = "Mārcis Krēgers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const verticalLines = Array.from({ length: 14 }, (_, i) => (
  <div
    key={`v${i}`}
    style={{
      position: "absolute",
      top: 0,
      left: 80 + i * 80,
      width: 1,
      height: "100%",
      backgroundColor: "rgba(139,92,246,0.07)",
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
      backgroundColor: "rgba(139,92,246,0.07)",
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
          backgroundColor: "#0a0a12",
          fontFamily: "sans-serif",
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
            color: "#8b5cf6",
            letterSpacing: "0.02em",
          }}
        >
          MK
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#e8e8f0",
            lineHeight: 1.15,
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
              color: "#8b5cf6",
            }}
          >
            {role}
          </div>
        ) : null}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 80,
            fontSize: 28,
            color: "#4ade80",
            fontFamily: "monospace",
          }}
        >
          $ whoami
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
