import { expect, test } from "@playwright/test";
import { collectPageErrors, expectNoPageErrors, horizontalOverflow } from "./helpers";

test.skip(({ isMobile }) => !isMobile, "mobile viewport only");

test("no horizontal scroll", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/en");
  expect(await horizontalOverflow(page)).toBeLessThanOrEqual(1);
  expectNoPageErrors(errors);
});

test("section nav links hidden on mobile", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/en");
  await expect(page.locator("header nav ul")).toBeHidden();
  await expect(page.locator("header a[href='/lv']")).toBeVisible();
  expectNoPageErrors(errors);
});

test("language toggle works on mobile", async ({ page, context }) => {
  const errors = collectPageErrors(page);
  await page.goto("/en");
  const toggle = page.locator("header a[href='/lv']");
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page).toHaveURL(/\/lv$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "lv");
  const localeCookie = (await context.cookies()).find((c) => c.name === "NEXT_LOCALE");
  expect(localeCookie?.value).toBe("lv");
  expectNoPageErrors(errors);
});

test("contact CTA visible and clickable on mobile", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/en");
  const cta = page.locator("header").getByRole("link", { name: "Get in touch" });
  await expect(cta).toBeVisible();
  await cta.click();
  await expect(page).toHaveURL(/#contact$/);
  expectNoPageErrors(errors);
});

test("hamburger opens the full screen menu and links navigate", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/en");
  const button = page.getByRole("button", { name: "Menu" });
  await expect(button).toBeVisible();
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  const menuLink = page.locator("#mobile-menu a[href='#about']");
  await expect(menuLink).toBeVisible();
  await menuLink.click();
  await expect(page).toHaveURL(/#about$/);
  await expect(button).toHaveAttribute("aria-expanded", "false");
  expectNoPageErrors(errors);
});

test.describe("360px viewport", () => {
  test.use({ viewport: { width: 360, height: 740 } });

  test("no horizontal scroll at 360px", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(1);
    expectNoPageErrors(errors);
  });

  test("compact nav fits and controls stay on one row", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    const controls = page.locator("header nav > div:last-child");
    const box = await controls.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(360);
    await expect(page.locator("header nav a[href='/lv']")).toBeVisible();
    await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
    expectNoPageErrors(errors);
  });

  test("touch targets are at least 44px tall", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    for (const selector of [
      "header nav a[href='/lv']",
      "header nav button[aria-controls='mobile-menu']",
    ]) {
      const box = await page.locator(selector).boundingBox();
      expect(box, `${selector} should have a bounding box`).not.toBeNull();
      expect(box!.height, `${selector} should be at least 44px tall`).toBeGreaterThanOrEqual(43);
      expect(box!.width, `${selector} should be at least 44px wide`).toBeGreaterThanOrEqual(43);
    }
    const ctaBox = await page
      .locator("header nav")
      .getByRole("link", { name: "Get in touch" })
      .boundingBox();
    expect(ctaBox, "contact CTA should have a bounding box").not.toBeNull();
    expect(ctaBox!.height, "contact CTA should be at least 44px tall").toBeGreaterThanOrEqual(43);
    expectNoPageErrors(errors);
  });
});
