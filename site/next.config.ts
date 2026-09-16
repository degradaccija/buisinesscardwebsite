import type { NextConfig } from "next";

const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST?.replace(/\/$/, "");

function getPostHogAssetsHost(host: string) {
  const url = new URL(host);
  const [region, ...domain] = url.hostname.split(".");
  return `${url.protocol}//${region}-assets.${domain.join(".")}`;
}

const nextConfig: NextConfig = {
  async rewrites() {
    if (!posthogHost) return [];

    const posthogAssetsHost = getPostHogAssetsHost(posthogHost);
    return [
      {
        source: "/ph/static/:path*",
        destination: `${posthogAssetsHost}/static/:path*`,
      },
      {
        source: "/ph/array/:path*",
        destination: `${posthogAssetsHost}/array/:path*`,
      },
      {
        source: "/ph/:path*",
        destination: `${posthogHost}/:path*`,
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
