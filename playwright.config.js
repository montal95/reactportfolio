// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Configuration
 *
 * Supports two modes:
 * 1. Local dev server (default): starts CRA dev server on port 3000
 * 2. Netlify preview: set PLAYWRIGHT_BASE_URL env var to test against a deploy preview
 *
 * Usage:
 *   npx playwright test                                          # local dev server
 *   PLAYWRIGHT_BASE_URL=https://deploy-preview-123.netlify.app npx playwright test  # Netlify preview
 */

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
const isCI = !!process.env.CI;

module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? 'github' : 'html',
  timeout: 30_000,

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  /* Only start the local dev server if no external URL is provided */
  ...(process.env.PLAYWRIGHT_BASE_URL
    ? {}
    : {
        webServer: {
          command: 'npm start',
          url: 'http://localhost:3000',
          reuseExistingServer: !isCI,
          timeout: 120_000,
        },
      }),
});
