import "server-only";

import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

function requirePostHogConfig(value: string | undefined, variable: string) {
  if (value) return value;
  if (process.env.NODE_ENV === "development") {
    throw new Error(
      `${variable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${variable} is configured`,
    );
  }
  return null;
}

export function getPostHogClient() {
  if (posthogClient) return posthogClient;

  const token = requirePostHogConfig(
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
    "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN",
  );
  const host = requirePostHogConfig(
    process.env.NEXT_PUBLIC_POSTHOG_HOST,
    "NEXT_PUBLIC_POSTHOG_HOST",
  );
  if (!token || !host) return null;

  posthogClient = new PostHog(token, {
    host,
    flushAt: 1,
    flushInterval: 0,
    enableExceptionAutocapture: true,
  });
  return posthogClient;
}
