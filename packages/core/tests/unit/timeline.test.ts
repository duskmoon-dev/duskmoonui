import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { timelineStyles } from '../../src/components/timeline';

describe('Timeline Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/timeline.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .timeline base class', () => {
    expect(css).toContain('.timeline');
  });

  it('should define .timeline-item class', () => {
    expect(css).toContain('.timeline-item');
  });

  it('should use ::before pseudo-element for vertical line', () => {
    expect(css).toContain('.timeline::before');
  });

  it('should use outline-variant color token for the line', () => {
    expect(css).toContain('var(--color-outline-variant)');
  });

  it('should use flexbox for layout', () => {
    expect(css).toMatch(/\.timeline[^{]*\{[^}]*display:\s*flex/s);
  });

  it('should define marker element for timeline items', () => {
    expect(css).toMatch(/\.timeline-marker|\.timeline-dot|\.timeline-icon/);
  });

  it('should define color variants for timeline items', () => {
    expect(css).toMatch(/\.timeline-item-primary|\.timeline-primary/);
  });

  for (const [role, background, content] of [
    ['accent', 'accent', 'accent-content'],
    ['neutral', 'neutral', 'neutral-content'],
    ['base', 'base-300', 'base-content'],
  ]) {
    it(`styles ${role} markers and their content in the legacy plugin`, () => {
      const selector = `.timeline-marker-${role}`;
      expect(timelineStyles[selector]).toMatchObject({
        backgroundColor: `var(--color-${background})`,
        borderColor: `var(--color-${background})`,
        color: `var(--color-${content})`,
        boxShadow: `0 0 0 2px var(--color-${background})`,
      });
      expect(timelineStyles[`${selector} .timeline-marker-icon`]).toMatchObject({
        backgroundColor: `var(--color-${background})`,
        color: `var(--color-${content})`,
      });
      expect(timelineStyles[`${selector} .timeline-marker-dot`]).toEqual({
        backgroundColor: `var(--color-${content})`,
      });
    });
  }
});
