import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  snapshotDir: './tests/visual/snapshots',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  webServer: {
    command: 'bun run tests/serve-fixtures.ts',
    url: 'http://localhost:3333/tests/fixtures/test-fixture.html',
    reuseExistingServer: !process.env.CI,
    cwd: '.',
  },
  use: {
    baseURL: 'http://localhost:3333',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium',
        launchOptions: {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || '/run/current-system/sw/bin/chromium',
        },
      },
    },
  ],
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.01,
    },
  },
});
