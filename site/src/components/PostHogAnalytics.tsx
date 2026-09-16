"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { CONSENT_CHANGE_EVENT, getConsent } from "@/lib/consent";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function PostHogAnalytics() {
  const pathname = usePathname();
  const routeChanged = useRef(false);

  useEffect(() => {
    if (!POSTHOG_KEY) return;

    function init() {
      if (posthog.__loaded) return;
      posthog.init(POSTHOG_KEY as string, {
        api_host: "/ph",
        ui_host: "https://eu.posthog.com",
        capture_pageview: false,
        person_profiles: "identified_only",
      });
      posthog.capture("$pageview");
    }

    if (getConsent() === "accepted") {
      init();
      return;
    }

    function onConsentChange() {
      if (getConsent() === "accepted") init();
    }
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
  }, []);

  useEffect(() => {
    if (!routeChanged.current) {
      routeChanged.current = true;
      return;
    }
    if (posthog.__loaded) {
      posthog.capture("$pageview");
    }
  }, [pathname]);

  return null;
}
