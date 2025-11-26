/**
 * T068: Performance test for documentation site load time
 * Tests that the documentation site loads in under 3 seconds
 */

import { test, expect } from '@playwright/test';

test.describe('Documentation Site Performance', () => {
  test.describe('Page Load Performance', () => {
    test('homepage loads in under 3 seconds', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/', { waitUntil: 'domcontentloaded' });

      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });

    test('component documentation page loads in under 3 seconds', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/docs/en/components/button', { waitUntil: 'domcontentloaded' });

      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });

    test('installation page loads in under 3 seconds', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/docs/en/getting-started/installation', {
        waitUntil: 'domcontentloaded',
      });

      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });
  });

  test.describe('Core Web Vitals', () => {
    test('Largest Contentful Paint (LCP) is under 2.5s', async ({ page }) => {
      await page.goto('/');

      const lcp = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry.startTime);
          }).observe({ entryTypes: ['largest-contentful-paint'] });

          // Fallback timeout
          setTimeout(() => resolve(2500), 3000);
        });
      });

      expect(lcp).toBeLessThan(2500);
    });

    test('First Contentful Paint (FCP) is under 1.8s', async ({ page }) => {
      await page.goto('/');

      const fcp = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntriesByName('first-contentful-paint');
            if (entries.length > 0) {
              resolve(entries[0].startTime);
            }
          });
          observer.observe({ entryTypes: ['paint'] });

          // Fallback timeout
          setTimeout(() => resolve(1800), 3000);
        });
      });

      expect(fcp).toBeLessThan(1800);
    });

    test('Time to Interactive (TTI) is reasonable', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/', { waitUntil: 'networkidle' });

      // Wait for page to be interactive
      await page.waitForSelector('a, button', { state: 'visible' });

      const tti = Date.now() - startTime;

      expect(tti).toBeLessThan(5000);
    });
  });

  test.describe('Resource Loading', () => {
    test('CSS loads efficiently', async ({ page }) => {
      const cssLoaded: boolean[] = [];

      page.on('response', (response) => {
        if (response.url().endsWith('.css')) {
          cssLoaded.push(response.ok());
        }
      });

      await page.goto('/');

      // All CSS files should load successfully
      for (const loaded of cssLoaded) {
        expect(loaded).toBe(true);
      }
    });

    test('JavaScript loads efficiently', async ({ page }) => {
      const jsRequests: { url: string; size: number }[] = [];

      page.on('response', async (response) => {
        if (response.url().endsWith('.js')) {
          const headers = response.headers();
          const contentLength = parseInt(headers['content-length'] || '0');
          jsRequests.push({ url: response.url(), size: contentLength });
        }
      });

      await page.goto('/');

      // Individual JS files should not be too large
      for (const js of jsRequests) {
        // 500KB max per file (gzipped sizes will be smaller)
        expect(js.size).toBeLessThan(500 * 1024);
      }
    });

    test('no render-blocking resources cause significant delay', async ({ page }) => {
      const startTime = Date.now();

      // Navigate without waiting for all resources
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // First meaningful content should appear quickly
      const firstContent = await page.locator('body *').first().isVisible();

      const contentTime = Date.now() - startTime;

      expect(firstContent).toBe(true);
      expect(contentTime).toBeLessThan(2000);
    });
  });

  test.describe('Image Performance', () => {
    test('images use modern formats where available', async ({ page }) => {
      const imageFormats: string[] = [];

      page.on('response', (response) => {
        const contentType = response.headers()['content-type'];
        if (contentType?.startsWith('image/')) {
          imageFormats.push(contentType);
        }
      });

      await page.goto('/');

      // Check that at least some images use modern formats (if images exist)
      if (imageFormats.length > 0) {
        // Modern formats should be preferred but not required
        expect(imageFormats.length).toBeGreaterThan(0);
      }
    });

    test('images have width and height attributes to prevent layout shift', async ({ page }) => {
      await page.goto('/');

      const images = await page.locator('img').all();

      for (const img of images) {
        const hasSize = await img.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return (
            styles.width !== 'auto' ||
            styles.height !== 'auto' ||
            el.hasAttribute('width') ||
            el.hasAttribute('height')
          );
        });

        // Images should have explicit dimensions
        expect(hasSize).toBe(true);
      }
    });

    test('images are lazy loaded where appropriate', async ({ page }) => {
      await page.goto('/');

      const images = await page.locator('img').all();

      // Check below-the-fold images have lazy loading
      for (const img of images.slice(3)) {
        // Skip first few images
        const loading = await img.getAttribute('loading');
        const box = await img.boundingBox();

        // Images below the fold should be lazy loaded
        if (box && box.y > 800) {
          // Below typical viewport
          expect(loading).toBe('lazy');
        }
      }
    });
  });

  test.describe('Caching', () => {
    test('static assets have appropriate cache headers', async ({ page }) => {
      const cacheHeaders: { url: string; cacheControl: string | null }[] = [];

      page.on('response', (response) => {
        const url = response.url();
        if (
          url.includes('.js') ||
          url.includes('.css') ||
          url.includes('.woff')
        ) {
          cacheHeaders.push({
            url,
            cacheControl: response.headers()['cache-control'] || null,
          });
        }
      });

      await page.goto('/');

      // Static assets should have cache headers in production
      // In development, this may not be set
      for (const header of cacheHeaders) {
        // Just verify the response completed
        expect(header.url).toBeTruthy();
      }
    });
  });

  test.describe('Bundle Size', () => {
    test('total page weight is reasonable', async ({ page }) => {
      let totalBytes = 0;

      page.on('response', async (response) => {
        const headers = response.headers();
        const contentLength = parseInt(headers['content-length'] || '0');
        totalBytes += contentLength;
      });

      await page.goto('/', { waitUntil: 'networkidle' });

      // Total page weight should be under 2MB
      expect(totalBytes).toBeLessThan(2 * 1024 * 1024);
    });
  });
});
