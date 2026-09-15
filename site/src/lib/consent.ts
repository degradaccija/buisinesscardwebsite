export type CookieConsent = "accepted" | "declined" | "undecided";

const STORAGE_KEY = "cookie-consent";
export const CONSENT_CHANGE_EVENT = "cookie-consent-change";

export function getConsent(): CookieConsent {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "accepted" || value === "declined") return value;
  } catch {
    return "undecided";
  }
  return "undecided";
}

export function setConsent(value: "accepted" | "declined") {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // storage unavailable (private mode): consent applies to this visit only
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}
