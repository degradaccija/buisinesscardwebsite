import { expect, test } from "@playwright/test";
import { collectPageErrors, expectNoPageErrors } from "./helpers";

const BASE = "http://localhost:3000";

test("root with no cookie redirects to /en", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto(`${BASE}/`);
  expect(new URL(page.url()).pathname).toBe("/en");
  expectNoPageErrors(errors);
});

test("root with cookie NEXT_LOCALE=en redirects to /en", async ({ browser }) => {
  const context = await browser.newContext();
  await context.addCookies([
    { name: "NEXT_LOCALE", value: "en", url: BASE },
  ]);
  const page = await context.newPage();
  await page.goto(`${BASE}/`);
  expect(new URL(page.url()).pathname).toBe("/en");
  await context.close();
});

test("root with cookie NEXT_LOCALE=lv redirects to /lv", async ({ browser }) => {
  const context = await browser.newContext();
  await context.addCookies([
    { name: "NEXT_LOCALE", value: "lv", url: BASE },
  ]);
  const page = await context.newPage();
  await page.goto(`${BASE}/`);
  expect(new URL(page.url()).pathname).toBe("/lv");
  await context.close();
});

test("root with Accept-Language lv redirects to /lv", async ({ browser }) => {
  const context = await browser.newContext({ locale: "lv-LV" });
  const page = await context.newPage();
  await page.goto(`${BASE}/`);
  expect(new URL(page.url()).pathname).toBe("/lv");
  await context.close();
});

test("invalid locale /de redirects to /en", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto(`${BASE}/de`);
  expect(new URL(page.url()).pathname).toBe("/en");
  expectNoPageErrors(errors);
});
