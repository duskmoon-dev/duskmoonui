import { beforeAll, describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const componentsDir = join(import.meta.dir, '../../src/components');

describe('Composition primitives', () => {
  let indicatorCss: string;
  let joinCss: string;
  let stackCss: string;
  let heroCss: string;
  let footerCss: string;
  let sidebarLayoutCss: string;
  let maskCss: string;

  beforeAll(async () => {
    [indicatorCss, joinCss, stackCss, heroCss, footerCss, sidebarLayoutCss, maskCss] = await Promise.all(
      ['indicator', 'join', 'stack', 'hero', 'footer', 'sidebar-layout', 'mask'].map((name) =>
        readFile(join(componentsDir, `${name}.css`), 'utf8'),
      ),
    );
  });

  it('positions indicators through logical-axis custom properties', () => {
    for (const className of [
      'indicator',
      'indicator-item',
      'indicator-top',
      'indicator-middle',
      'indicator-bottom',
      'indicator-start',
      'indicator-center',
      'indicator-end',
    ]) {
      expect(indicatorCss).toContain(`.${className}`);
    }
    expect(indicatorCss).toContain('inset-inline-end: var(--indicator-inline)');
    expect(indicatorCss).toContain(':dir(rtl)');
    expect(indicatorCss).not.toMatch(/\b(?:left|right):/);
  });

  it('joins arbitrary direct children in horizontal and vertical orientations', () => {
    expect(joinCss).toContain('.join > .join-item');
    expect(joinCss).toContain('.join-horizontal');
    expect(joinCss).toContain('.join-vertical');
    expect(joinCss).toContain('margin-inline-start: -1px');
    expect(joinCss).toContain('margin-block-start: -1px');
    expect(joinCss).toContain(':focus-within');
    expect(joinCss).not.toMatch(/\.(?:btn-group|toggle-group)/);
  });

  it('stacks arbitrary children with grid and logical offsets', () => {
    for (const className of ['stack', 'stack-top', 'stack-bottom', 'stack-start', 'stack-end']) {
      expect(stackCss).toContain(`.${className}`);
    }
    expect(stackCss).toContain('display: inline-grid');
    expect(stackCss).toContain('grid-area: 1 / 1');
    expect(stackCss).toContain('inset-inline-start:');
    expect(stackCss).not.toContain('position: absolute');
  });

  it('layers hero content and overlays without coupling to home-page', () => {
    for (const className of ['hero', 'hero-content', 'hero-overlay', 'hero-center', 'hero-start', 'hero-end']) {
      expect(heroCss).toContain(`.${className}`);
    }
    expect(heroCss).toContain('grid-area: 1 / 1');
    expect(heroCss).toContain('pointer-events: none');
    expect(heroCss).not.toContain('.home-page-hero');
  });

  it('provides responsive and explicit footer compositions', () => {
    for (const className of ['footer', 'footer-title', 'footer-center', 'footer-horizontal', 'footer-vertical']) {
      expect(footerCss).toContain(`.${className}`);
    }
    expect(footerCss).toContain('repeat(auto-fit');
    expect(footerCss).toContain('var(--color-surface-container-low)');
    expect(footerCss).not.toContain('.home-page-footer');
  });

  it('defines a container-responsive sidebar grid with application-owned states', () => {
    for (const className of ['sidebar-layout', 'sidebar-layout-sidebar', 'sidebar-layout-content', 'sidebar-layout-start', 'sidebar-layout-end', 'sidebar-layout-compact', 'sidebar-layout-hidden']) {
      expect(sidebarLayoutCss).toContain(`.${className}`);
    }
    expect(sidebarLayoutCss).toMatch(/container-type:\s*inline-size/);
    expect(sidebarLayoutCss).toMatch(/container-name:\s*sidebar-layout/);
    expect(sidebarLayoutCss).toContain('@container sidebar-layout (min-width: 48rem)');
    expect(sidebarLayoutCss).toContain('border-inline-end:');
    expect(sidebarLayoutCss).not.toMatch(/\b(?:left|right):/);
    expect(sidebarLayoutCss).not.toContain('.drawer');
  });

  it('provides only the planned initial mask catalog', () => {
    for (const className of ['mask', 'mask-circle', 'mask-squircle', 'mask-square', 'mask-diamond', 'mask-hexagon', 'mask-triangle']) {
      expect(maskCss).toContain(`.${className}`);
    }
    expect(maskCss).toContain('clip-path:');
    expect(maskCss).toContain('object-fit: cover');
    expect(maskCss).not.toContain('mask-half-');
  });
});
