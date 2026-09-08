import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://127.0.0.1:${PORT}`;

// The QA checklist in docs/portfolio-qa-checklist.md fixes these four widths.
// Keep them in sync — they are the contract for every responsive assertion.
export const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  laptop: { width: 1024, height: 768 },
  desktop: { width: 1440, height: 900 },
} as const;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : [["list"], ["html", { open: "never" }]],
  timeout: 30_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: VIEWPORTS.desktop },
    },
    {
      name: "mobile",
      use: { ...devices["Desktop Chrome"], viewport: VIEWPORTS.mobile },
    },
  ],

  // Build and serve the production output. Measuring image bytes against
  // `next dev` would report dev-server behaviour, not what visitors download.
  //
  // `reuseExistingServer` is deliberately false. Because the command includes
  // the build, reusing a server skips the build entirely — so a server started
  // before the last edit silently serves stale assets and the suite reports
  // results for code that is no longer on disk. That produced two rounds of
  // phantom failures. A ~25s rebuild per run is worth trustworthy results.
  webServer: {
    command: `pnpm build && pnpm start --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 240_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
