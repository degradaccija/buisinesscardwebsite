import { expect, test } from "@playwright/test";
import { collectPageErrors, expectNoPageErrors } from "./helpers";

const SECTIONS = ["about", "skills", "experience", "projects", "services", "contact"];

test.describe("english locale /en", () => {
  test("html lang=en, hero name and section links", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mārcis Krēgers");
    for (const section of SECTIONS) {
      await expect(page.locator(`header nav ul a[href="#${section}"]`)).toHaveCount(1);
    }
    await expect(page.locator("header nav ul")).toContainText("About");
    expectNoPageErrors(errors);
  });

  test("page has exactly one h1", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("footer is rendered", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("footer")).toHaveCount(1);
  });

  test("all content sections render", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    for (const section of SECTIONS) {
      await expect(page.locator(`section#${section}`)).toBeVisible();
    }
    await expect(page.locator("#skills")).toContainText("Linux");
    expectNoPageErrors(errors);
  });
});

test.describe("latvian locale /lv", () => {
  test("html lang=lv, hero name and section links", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/lv");
    await expect(page.locator("html")).toHaveAttribute("lang", "lv");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mārcis Krēgers");
    for (const section of SECTIONS) {
      await expect(page.locator(`header nav ul a[href="#${section}"]`)).toHaveCount(1);
    }
    await expect(page.locator("header nav ul")).toContainText("Par mani");
    expectNoPageErrors(errors);
  });

  test("page has exactly one h1", async ({ page }) => {
    await page.goto("/lv");
    await expect(page.locator("h1")).toHaveCount(1);
  });
});

test.describe("language toggle", () => {
  test("on /en shows Latviski and switches to /lv, sets cookie", async ({ page, context }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    const toggle = page.locator("header a[href='/lv']");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveText("Latviski");
    await toggle.click();
    await expect(page).toHaveURL(/\/lv$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "lv");
    const localeCookie = (await context.cookies()).find((c) => c.name === "NEXT_LOCALE");
    expect(localeCookie?.value).toBe("lv");
    expectNoPageErrors(errors);
  });

  test("on /lv shows English and switches to /en, sets cookie", async ({ page, context }) => {
    const errors = collectPageErrors(page);
    await page.goto("/lv");
    const toggle = page.locator("header a[href='/en']");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveText("English");
    await toggle.click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    const localeCookie = (await context.cookies()).find((c) => c.name === "NEXT_LOCALE");
    expect(localeCookie?.value).toBe("en");
    expectNoPageErrors(errors);
  });
});
