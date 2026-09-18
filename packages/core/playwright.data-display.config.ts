import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/data-display',
  reporter: 'list',
  outputDir: './test-results/data-display',
  workers: 1,
  use: {
    browserName: 'chromium',
    viewport: { width: 900, height: 800 },
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {},
  },
});
