import { expect, test } from "@playwright/test";
import { collectPageErrors, expectNoPageErrors, horizontalOverflow } from "./helpers";

test.describe("projects (mock content)", () => {
  test("featured sticky stack renders with two cards", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    await expect(page.locator("#projects")).toBeVisible();
    await expect(page.locator(".stack-card")).toHaveCount(2);
    await expect(page.locator("#projects article")).toHaveCount(2);
    expectNoPageErrors(errors);
  });

  test("first featured card carries the case study label", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByText("Case study")).toBeVisible();
  });

  test("non-featured projects render as grid tiles", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("[data-project-tile]")).toHaveCount(2);
  });

  test.describe("reduced viewport 1024x768", () => {
    test.use({ viewport: { width: 1024, height: 768 } });

    test("stack cards present and no horizontal overflow while scrolling", async ({
      page,
    }) => {
      const errors = collectPageErrors(page);
      await page.goto("/en");
      await expect(page.locator(".stack-card")).toHaveCount(2);
      await page.locator("#projects").scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      for (let i = 0; i < 24; i++) {
        await page.mouse.wheel(0, 400);
        await page.waitForTimeout(50);
      }
      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(1);
      expectNoPageErrors(errors);
    });
  });
});
