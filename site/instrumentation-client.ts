import posthog from "posthog-js";
import { CONSENT_CHANGE_EVENT, getConsent } from "@/lib/consent";

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

function requirePostHogConfig(value: string | undefined, variable: string) {
  if (value) return value;
  if (process.env.NODE_ENV === "development") {
    throw new Error(
      `${variable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${variable} is configured`,
    );
  }
  return null;
}

function initPostHog() {
  if (posthog.__loaded) return true;

  const token = requirePostHogConfig(
    posthogToken,
    "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN",
  );
  const host = requirePostHogConfig(posthogHost, "NEXT_PUBLIC_POSTHOG_HOST");
  if (!token || !host) return false;

  posthog.init(token, {
    api_host: "/ph",
    defaults: "2026-01-30",
    capture_exceptions: true,
    person_profiles: "identified_only",
    debug: process.env.NODE_ENV === "development",
  });
  return true;
}

if (getConsent() === "accepted") {
  initPostHog();
} else {
  window.addEventListener(CONSENT_CHANGE_EVENT, () => {
    if (getConsent() === "accepted" && initPostHog()) {
      posthog.capture("analytics_consent_granted", {
        source: "cookie_notice",
      });
    }
  });
}
