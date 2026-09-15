"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { CONSENT_CHANGE_EVENT, getConsent, setConsent } from "@/lib/consent";
import type { Dict } from "@/i18n";
import type { Locale } from "@/lib/types";

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
}

function getServerSnapshot() {
  return "undecided" as const;
}

export function CookieNotice({ locale, dict }: { locale: Locale; dict: Dict }) {
  const consent = useSyncExternalStore(subscribe, getConsent, getServerSnapshot);

  function decide(value: "accepted" | "declined") {
    if (value === "accepted") {
      document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;samesite=lax`;
    } else {
      document.cookie = "NEXT_LOCALE=;path=/;max-age=0;samesite=lax";
    }
    setConsent(value);
  }

  if (consent !== "undecided") return null;

  return (
    <div
      role="region"
      aria-label={dict.cookieNotice.policy}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
          {dict.cookieNotice.message}{" "}
          <Link
            href={`/${locale}/privacy`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            {dict.cookieNotice.policy}
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="rounded-lg border border-border px-4 py-2 font-mono text-xs font-medium tracking-[0.04em] text-text-muted transition-colors hover:border-text-muted hover:text-text-primary"
          >
            {dict.cookieNotice.decline}
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-lg border border-accent/60 px-4 py-2 font-mono text-xs font-medium tracking-[0.04em] text-accent transition-colors hover:bg-accent/10"
          >
            {dict.cookieNotice.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
