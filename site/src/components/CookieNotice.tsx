"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import type { Dict } from "@/i18n";
import type { Locale } from "@/lib/types";

const STORAGE_KEY = "cookie-notice-dismissed";
const CHANGE_EVENT = "cookie-notice-change";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function isDismissed() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return true;
}

export function CookieNotice({ locale, dict }: { locale: Locale; dict: Dict }) {
  const dismissed = useSyncExternalStore(subscribe, isDismissed, getServerSnapshot);

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // private browsing: banner returns next visit, which is fine
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  if (dismissed) return null;

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
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 self-start rounded-lg border border-border px-4 py-2 font-mono text-xs font-medium tracking-[0.04em] text-text-primary transition-colors hover:border-accent hover:text-accent sm:self-center"
        >
          {dict.cookieNotice.accept}
        </button>
      </div>
    </div>
  );
}
