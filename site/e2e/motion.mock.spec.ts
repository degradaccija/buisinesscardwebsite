import { expect, test } from "@playwright/test";
import { collectPageErrors, expectNoPageErrors, horizontalOverflow } from "./helpers";

test.describe("reduced motion (mock content)", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("hero renders instantly with opacity 1 and no transform", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    await expect(page.locator("[data-hero-headline]")).toHaveCSS("opacity", "1");
    for (const selector of [
      "[data-hero-eyebrow]",
      "[data-hero-headline]",
      "[data-hero-role]",
      "[data-hero-ctas]",
      "[data-hero-visual]",
    ]) {
      const transform = await page
        .locator(selector)
        .evaluate((el) => getComputedStyle(el).transform);
      expect(transform, `${selector} should not be transformed`).toBe("none");
    }
    expectNoPageErrors(errors);
  });

  test("projects stack renders statically without pinned cards", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    await expect(page.locator(".stack-card")).toHaveCount(0);
    const stickyCount = await page.evaluate(
      () =>
        [...document.querySelectorAll("#projects *")].filter(
          (el) => getComputedStyle(el).position === "sticky",
        ).length,
    );
    expect(stickyCount).toBe(0);
    await expect(page.locator("#projects article").first()).toBeVisible();
    expectNoPageErrors(errors);
  });

  test("smooth scroll is disabled", async ({ page }) => {
    await page.goto("/en");
    const behavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    );
    expect(behavior).toBe("auto");
  });

  test("full page renders without pinned sections when scrolled to the end", async ({
    page,
  }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(1);
    await expect(page.locator("#contact")).toBeInViewport({ ratio: 0.1 });
    const transformed = await page.evaluate(() =>
      [...document.querySelectorAll("#projects article")].filter(
        (el) => getComputedStyle(el).transform !== "none",
      ).length,
    );
    expect(transformed).toBe(0);
    expectNoPageErrors(errors);
  });
});

test.describe("default motion (mock content)", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("sticky stack pins the two featured project cards", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    await expect(page.locator(".stack-card")).toHaveCount(2);
    const position = await page
      .locator(".stack-card")
      .first()
      .evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe("sticky");
    expectNoPageErrors(errors);
  });

  test("scrolling through the stack keeps no horizontal overflow", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    for (let i = 0; i < 30; i++) {
      await page.mouse.wheel(0, 400);
      await page.waitForTimeout(50);
    }
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(1);
    expectNoPageErrors(errors);
  });
});
