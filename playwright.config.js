// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',  
  fullyParallel: true,  // Run tests in parallel
  forbidOnly: !!process.env.CI,  // Fail CI build if test.only is present
  retries: process.env.CI ? 2 : 0,  // Retry failed tests in CI
  workers: process.env.CI ? 1 : undefined,  // Run tests sequentially in CI

  reporter: [
    ['html', { outputFolder: 'playwright-report' }], // Generates HTML report in `playwright-report/`
    ['json', { outputFile: 'playwright-report/test-results.json' }], // JSON report stored in `playwright-report/`
  ],

  use: {
    headless: true,  // Run tests in headless mode
    viewport: { width: 1280, height: 720 },  
    actionTimeout: 10000,  // Timeout per action
    trace: 'on-first-retry',  // Collect trace only if test fails on retry
    screenshot: 'only-on-failure',  // Capture screenshots only on failure
    video: 'on-first-retry',  // Record video only if test fails
  },

  /* Configure projects for different browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
