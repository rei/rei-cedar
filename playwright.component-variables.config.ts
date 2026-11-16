import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test/playwright/component-variables',
  reporter: 'list',
  timeout: 60_000,
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
