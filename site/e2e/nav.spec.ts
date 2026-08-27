import { expect, test } from "@playwright/test";
import { collectPageErrors, expectNoPageErrors, horizontalOverflow, openPage } from "./helpers";

const SECTIONS = ["about", "skills", "experience", "projects", "services", "contact"];

test.skip(({ isMobile }) => isMobile, "desktop layout only");

test.describe("nav", () => {
  test.use({ viewport: { width: 1024, height: 768 } });

  test("renders on a single line at 1024px", async ({ page }) => {
    const errors = collectPageErrors(page);
    await openPage(page, "/en");
    const nav = page.locator("header nav");
    const box = await nav.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeLessThanOrEqual(72.5);
    const tops = await page.evaluate(() =>
      [...document.querySelectorAll("header nav ul a")].map((a) =>
        Math.round(a.getBoundingClientRect().top),
      ),
    );
    expect(tops.length).toBe(SECTIONS.length);
    expect(Math.max(...tops) - Math.min(...tops)).toBeLessThanOrEqual(1);
    expectNoPageErrors(errors);
  });

  test("active section updates when scrolling to a section", async ({ page }) => {
    const errors = collectPageErrors(page);
    await openPage(page, "/en");
    await page.locator("#projects").evaluate((el) =>
      el.scrollIntoView({ block: "center" }),
    );
    await expect(
      page.locator("header nav a[href='#projects']"),
    ).toHaveAttribute("aria-current", "true");
    expectNoPageErrors(errors);
  });

  test("clicking a nav link scrolls to the section and activates it", async ({ page }) => {
    const errors = collectPageErrors(page);
    await openPage(page, "/en");
    await page.locator("header nav ul a[href='#contact']").click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(
      page.locator("header nav ul a[href='#contact']"),
    ).toHaveAttribute("aria-current", "true");
    const sectionBox = await page.locator("#contact").boundingBox();
    expect(sectionBox).not.toBeNull();
    expect(sectionBox!.y).toBeLessThanOrEqual(200);
    expectNoPageErrors(errors);
  });

  test("nav stays within the viewport width", async ({ page }) => {
    const errors = collectPageErrors(page);
    await openPage(page, "/en");
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(1);
    expectNoPageErrors(errors);
  });
});
