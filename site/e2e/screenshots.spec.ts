import { mkdirSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const dir = path.resolve(process.cwd(), "..", ".playwright-cli", "screenshots");

test.describe("desktop screenshots", () => {
  test.skip(({ isMobile }) => isMobile, "desktop project only");

  test("capture /en and /lv full page", async ({ page }) => {
    mkdirSync(dir, { recursive: true });
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await page.screenshot({ path: path.join(dir, "en.png"), fullPage: true });
    await page.goto("/lv");
    await expect(page.locator("html")).toHaveAttribute("lang", "lv");
    await page.screenshot({ path: path.join(dir, "lv.png"), fullPage: true });
  });
});

test.describe("mobile screenshots", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile project only");

  test("capture /en full page", async ({ page }) => {
    mkdirSync(dir, { recursive: true });
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await page.screenshot({ path: path.join(dir, "en-mobile.png"), fullPage: true });
  });
});
