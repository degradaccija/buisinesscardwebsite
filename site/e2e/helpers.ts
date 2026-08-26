import { expect, type Page } from "@playwright/test";

export function collectPageErrors(page: Page, ignoreResourceLoads = false): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (ignoreResourceLoads && text.includes("Failed to load resource")) return;
    errors.push(`[console.error] ${text}`);
  });
  page.on("pageerror", (err) => {
    errors.push(`[pageerror] ${err.message}`);
  });
  return errors;
}

export function expectNoPageErrors(errors: string[]): void {
  expect(errors).toEqual([]);
}
