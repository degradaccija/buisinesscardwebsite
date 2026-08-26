import { expect, test } from "@playwright/test";
import { collectPageErrors, expectNoPageErrors } from "./helpers";

test.skip(({ isMobile }) => !isMobile, "mobile viewport only");

test("no horizontal scroll", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/en");
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.scrollingElement?.scrollWidth ?? 0,
    clientWidth: document.scrollingElement?.clientWidth ?? 0,
  }));
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
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
