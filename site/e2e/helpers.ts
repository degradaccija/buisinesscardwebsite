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

export async function openPage(page: Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
}

export async function waitForHeroIntro(page: Page): Promise<void> {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(
    () => {
      const el = document.querySelector<HTMLElement>("[data-hero-headline]");
      if (!el) return true;
      return getComputedStyle(el).opacity === "1";
    },
    undefined,
    { timeout: 15000 },
  );
}

export async function headlineLineCount(page: Page): Promise<number> {
  return page.evaluate(() => {
    const h1 = document.querySelector<HTMLElement>("[data-hero-headline]");
    if (!h1) return 0;
    const range = document.createRange();
    range.selectNodeContents(h1);
    const tops = new Set<number>();
    for (const rect of Array.from(range.getClientRects())) {
      tops.add(Math.round(rect.top));
    }
    return tops.size;
  });
}

export async function horizontalOverflow(page: Page): Promise<number> {
  return page.evaluate(
    () =>
      (document.scrollingElement?.scrollWidth ?? 0) -
      (document.scrollingElement?.clientWidth ?? 0),
  );
}

export async function scrollThroughPage(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight / 2, 300);
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });
}
