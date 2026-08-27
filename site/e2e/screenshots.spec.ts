import { mkdirSync } from "node:fs";
import path from "node:path";
import type { Page } from "@playwright/test";
import { test } from "@playwright/test";

const dir = path.resolve(process.cwd(), "..", ".playwright-cli", "screenshots");

const SECTIONS = ["about", "skills", "experience", "projects", "services", "contact"] as const;

async function waitForHeroEntrance(page: Page): Promise<void> {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(
    () => {
      const w = window as typeof window & { __heroOpacitySig?: { value: string; at: number } };
      const els = [
        ...document.querySelectorAll<HTMLElement>(
          "[data-hero-eyebrow], [data-hero-headline], [data-hero-role], [data-hero-tagline], [data-hero-ctas] > *, [data-hero-visual]",
        ),
      ];
      const sig = els.map((el) => getComputedStyle(el).opacity).join(",");
      const allVisible = els.length > 0 && sig.split(",").every((value) => value === "1");
      if (!allVisible) {
        w.__heroOpacitySig = undefined;
        return false;
      }
      const now = performance.now();
      if (w.__heroOpacitySig?.value !== sig) {
        w.__heroOpacitySig = { value: sig, at: now };
        return false;
      }
      return now - w.__heroOpacitySig.at >= 600;
    },
    undefined,
    { timeout: 15000 },
  );
}

async function captureSection(page: Page, id: string, file: string): Promise<void> {
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: file });
}

test.describe("desktop screenshots", () => {
  test.skip(({ isMobile }) => isMobile, "desktop project only");

  test("capture en hero and all sections", async ({ page }) => {
    mkdirSync(dir, { recursive: true });
    await page.goto("/en");
    await waitForHeroEntrance(page);
    await page.screenshot({ path: path.join(dir, "en-hero.png") });
    for (const section of SECTIONS) {
      await captureSection(page, section, path.join(dir, `en-${section}.png`));
    }
  });

  test("capture lv hero and contact", async ({ page }) => {
    mkdirSync(dir, { recursive: true });
    await page.goto("/lv");
    await waitForHeroEntrance(page);
    await page.screenshot({ path: path.join(dir, "lv-hero.png") });
    await captureSection(page, "contact", path.join(dir, "lv-contact.png"));
  });
});

test.describe("mobile screenshots", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile project only");

  test("capture en hero and key sections", async ({ page }) => {
    mkdirSync(dir, { recursive: true });
    await page.goto("/en");
    await waitForHeroEntrance(page);
    await page.screenshot({ path: path.join(dir, "en-mobile-hero.png") });
    await captureSection(page, "projects", path.join(dir, "en-mobile-projects.png"));
    await captureSection(page, "contact", path.join(dir, "en-mobile-contact.png"));
  });
});
