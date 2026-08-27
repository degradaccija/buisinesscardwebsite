import { expect, test } from "@playwright/test";
import {
  collectPageErrors,
  expectNoPageErrors,
  headlineLineCount,
  openPage,
  waitForHeroIntro,
} from "./helpers";

test.skip(({ isMobile }) => isMobile, "desktop layout only");

test.describe("hero", () => {
  test.describe("desktop 1440x900", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("headline wraps to at most 2 lines", async ({ page }) => {
      const errors = collectPageErrors(page);
      await openPage(page, "/en");
      await waitForHeroIntro(page);
      expect(await headlineLineCount(page)).toBeLessThanOrEqual(2);
      expectNoPageErrors(errors);
    });

    test("primary CTA is visible without scrolling", async ({ page }) => {
      const errors = collectPageErrors(page);
      await openPage(page, "/en");
      await waitForHeroIntro(page);
      const box = await page
        .locator("[data-hero-ctas] a[href='#contact']")
        .first()
        .boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(900);
      expectNoPageErrors(errors);
    });

    test("hero visual renders an image or the monogram fallback", async ({ page }) => {
      const errors = collectPageErrors(page, true);
      await openPage(page, "/en");
      await waitForHeroIntro(page);
      const img = page.locator("[data-hero-visual] img");
      if ((await img.count()) > 0) {
        await expect(img.first()).toBeVisible();
        await expect
          .poll(() => img.first().evaluate((el) => (el as HTMLImageElement).naturalWidth))
          .toBeGreaterThan(0);
      } else {
        await expect(page.locator("[data-hero-visual]")).not.toBeEmpty();
      }
      expectNoPageErrors(errors);
    });
  });

  test.describe("desktop 1024x768", () => {
    test.use({ viewport: { width: 1024, height: 768 } });

    test("headline wraps to at most 2 lines", async ({ page }) => {
      const errors = collectPageErrors(page);
      await openPage(page, "/en");
      await waitForHeroIntro(page);
      expect(await headlineLineCount(page)).toBeLessThanOrEqual(2);
      expectNoPageErrors(errors);
    });

    test("primary CTA is visible without scrolling", async ({ page }) => {
      const errors = collectPageErrors(page);
      await openPage(page, "/en");
      await waitForHeroIntro(page);
      const box = await page
        .locator("[data-hero-ctas] a[href='#contact']")
        .first()
        .boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(768);
      expectNoPageErrors(errors);
    });
  });
});
