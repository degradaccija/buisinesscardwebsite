import { expect, test } from "@playwright/test";
import { collectPageErrors, expectNoPageErrors } from "./helpers";

const EN = {
  name: "Name",
  email: "Email",
  message: "Message",
  send: "Send",
  error: "Something went wrong. Please try again.",
  invalid: "Please check the form — all fields are required and the email must be valid.",
  success: "Message sent — I'll get back to you soon.",
};

const LV = {
  name: "Vārds",
  email: "E-pasts",
  message: "Ziņa",
  send: "Sūtīt",
  error: "Kaut kas nogāja greizi. Lūdzu, mēģini vēlreiz.",
  invalid: "Lūdzu, pārbaudi veidlapu — visi lauki ir obligāti un e-pastam jābūt derīgam.",
  success: "Ziņa nosūtīta — drīz sazināšos ar jums.",
};

test.skip(({ isMobile }) => isMobile, "desktop only, keeps /api/contact rate limit budget");

test.describe("contact form", () => {
  test("labels match locale", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    for (const [id, label] of [
      ["contact-name", EN.name],
      ["contact-email", EN.email],
      ["contact-message", EN.message],
    ] as const) {
      await expect(page.locator(`label[for="${id}"]`)).toHaveText(label);
    }
    await page.goto("/lv");
    for (const [id, label] of [
      ["contact-name", LV.name],
      ["contact-email", LV.email],
      ["contact-message", LV.message],
    ] as const) {
      await expect(page.locator(`label[for="${id}"]`)).toHaveText(label);
    }
    expectNoPageErrors(errors);
  });

  test("honeypot input is visually hidden", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    await expect(page.locator('input[name="website"]')).toHaveCount(1);
    await expect(page.locator('input[name="website"]')).toBeHidden();
    await page.goto("/lv");
    await expect(page.locator('input[name="website"]')).toHaveCount(1);
    await expect(page.locator('input[name="website"]')).toBeHidden();
    expectNoPageErrors(errors);
  });

  test("invalid email submit shows localized error text", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/en");
    await page.locator("#contact-name").fill("QA Tester");
    await page.locator("#contact-email").fill("not-an-email");
    await page.locator("#contact-message").fill("Hello from QA");
    await page.getByRole("button", { name: EN.send }).click();
    await expect(page.getByText(EN.invalid)).toBeVisible();

    await page.goto("/lv");
    await page.locator("#contact-name").fill("QA Testētājs");
    await page.locator("#contact-email").fill("not-an-email");
    await page.locator("#contact-message").fill("Sveiki no QA");
    await page.getByRole("button", { name: LV.send }).click();
    await expect(page.getByText(LV.invalid)).toBeVisible();
    expectNoPageErrors(errors);
  });

  test("valid submit shows success and clears fields", async ({ page }) => {
    const errors = collectPageErrors(page, true);
    await page.goto("/en");
    await page.locator("#contact-name").fill("QA Tester");
    await page.locator("#contact-email").fill("qa@example.com");
    await page.locator("#contact-message").fill("Hello from QA");
    await page.getByRole("button", { name: EN.send }).click();
    await expect(page.getByText(EN.success)).toBeVisible();
    expectNoPageErrors(errors);
  });

  test("valid submit on /lv shows lv success text", async ({ page }) => {
    const errors = collectPageErrors(page, true);
    await page.goto("/lv");
    await page.locator("#contact-name").fill("QA Testētājs");
    await page.locator("#contact-email").fill("qa@example.com");
    await page.locator("#contact-message").fill("Sveiki no QA");
    await page.getByRole("button", { name: LV.send }).click();
    await expect(page.getByText(LV.success)).toBeVisible();
    expectNoPageErrors(errors);
  });
});

test.describe("contact API", () => {
  test("returns 400 for invalid email", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: { name: "QA", email: "not-an-email", message: "Hi", locale: "en", website: "" },
    });
    expect(response.status()).toBe(400);
  });

  test("returns 200 when honeypot is filled", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: { name: "QA", email: "qa@example.com", message: "Hi", locale: "en", website: "bot" },
    });
    expect(response.status()).toBe(200);
  });
});
