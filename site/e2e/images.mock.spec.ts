import { expect, test } from "@playwright/test";
import { collectPageErrors, expectNoPageErrors } from "./helpers";

test.describe("images (mock content)", () => {
  test("hero image loads with priority and is preloaded", async ({ page }) => {
    const errors = collectPageErrors(page, true);
    await page.goto("/en");
    const img = page.locator("[data-hero-visual] img");
    await expect(img).toHaveCount(1);
    expect(await img.getAttribute("loading")).not.toBe("lazy");
    await expect
      .poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    await expect(img).toBeVisible();
    expectNoPageErrors(errors);
  });

  test("hero image appears as a preload link in the HTML", async ({ request }) => {
    const response = await request.get("/en");
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain('rel="preload"');
    expect(html).toContain("profile.jpg");
  });

  test("all project images load after scrolling through the page", async ({ page }) => {
    const errors = collectPageErrors(page, true);
    await page.goto("/en");
    await page.evaluate(async () => {
      const step = Math.max(window.innerHeight / 2, 300);
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
    });
    const imgs = page.locator("#projects img");
    const count = await imgs.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect
        .poll(() =>
          imgs.nth(i).evaluate((el) => (el as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
    }
    expectNoPageErrors(errors);
  });

  test("about image loads", async ({ page }) => {
    const errors = collectPageErrors(page, true);
    await page.goto("/en");
    const img = page.locator("#about img").first();
    await expect(img).toHaveCount(1);
    await expect
      .poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    expectNoPageErrors(errors);
  });
});
