import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  testMatch: /\.mock\.spec\.ts/,
  fullyParallel: true,
  reporter: "list",
  timeout: 45000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command:
      "node e2e/mock-supabase.mjs & MOCK_PID=$!; trap 'kill $MOCK_PID 2>/dev/null' EXIT; NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321 NEXT_PUBLIC_SUPABASE_ANON_KEY=mock-anon-key npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: false,
    timeout: 120000,
  },
  projects: [
    {
      name: "mock-desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: "mock-mobile",
      use: {
        ...devices["iPhone 13"],
        viewport: { width: 390, height: 844 },
        browserName: "chromium",
      },
    },
  ],
});
