import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/data-input',
  reporter: 'list',
  outputDir: './test-results/data-input',
  workers: 1,
  use: { viewport: { width: 900, height: 800 } },
  projects: ['chromium', 'firefox', 'webkit'].map(name => ({
    name,
    use: {
      browserName: name as 'chromium' | 'firefox' | 'webkit',
      ...(name === 'chromium' && process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
        ? { launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } } : {}),
    },
  })),
});
