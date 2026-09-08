import { defineConfig } from '@playwright/test';

// Self-contained source-CSS fixtures; no docs build or development server required.
export default defineConfig({
  testDir: './tests/native-overlays',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: 'list',
  use: {
    browserName: 'chromium',
    viewport: { width: 800, height: 600 },
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
});
