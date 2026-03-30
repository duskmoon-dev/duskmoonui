/**
 * Unit tests for tooltip component class generation
 * Tests that tooltip CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Tooltip Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/tooltip.css'),
      'utf-8'
    );
  });

  describe('Base Classes', () => {
    it('should define .tooltip base class', () => {
      expect(css).toContain('.tooltip');
    });

    it('should define .tooltip-content class', () => {
      expect(css).toContain('.tooltip-content');
    });

    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });

    it('should set tooltip as relative positioned inline-block', () => {
      expect(css).toMatch(/\.tooltip\s*\{[^}]*position:\s*relative/s);
      expect(css).toMatch(/\.tooltip\s*\{[^}]*display:\s*inline-block/s);
    });

    it('should set tooltip-content as absolute positioned', () => {
      expect(css).toMatch(
        /\.tooltip-content\s*\{[^}]*position:\s*absolute/s
      );
    });

    it('should set z-index on tooltip-content', () => {
      expect(css).toMatch(/\.tooltip-content\s*\{[^}]*z-index:\s*1000/s);
    });
  });

  describe('Visibility Behavior', () => {
    it('should hide tooltip-content by default with opacity 0', () => {
      expect(css).toMatch(/\.tooltip-content\s*\{[^}]*opacity:\s*0/s);
    });

    it('should hide tooltip-content by default with visibility hidden', () => {
      expect(css).toMatch(
        /\.tooltip-content\s*\{[^}]*visibility:\s*hidden/s
      );
    });

    it('should disable pointer-events by default', () => {
      expect(css).toMatch(
        /\.tooltip-content\s*\{[^}]*pointer-events:\s*none/s
      );
    });

    it('should show tooltip on hover', () => {
      expect(css).toContain('.tooltip:hover .tooltip-content');
    });

    it('should show tooltip on focus-within', () => {
      expect(css).toContain('.tooltip:focus-within .tooltip-content');
    });

    it('should show tooltip with .tooltip-open class', () => {
      expect(css).toContain('.tooltip-open .tooltip-content');
    });

    it('should set opacity 1 and visibility visible when shown', () => {
      expect(css).toMatch(
        /\.tooltip:hover \.tooltip-content[^{]*\{[^}]*opacity:\s*1/s
      );
      expect(css).toMatch(
        /\.tooltip:hover \.tooltip-content[^{]*\{[^}]*visibility:\s*visible/s
      );
    });

    it('should include transition for opacity and visibility', () => {
      expect(css).toMatch(
        /\.tooltip-content\s*\{[^}]*transition:\s*opacity\s+150ms/s
      );
    });
  });

  describe('Default Tooltip Content Styling', () => {
    it('should use on-surface background color', () => {
      expect(css).toMatch(
        /\.tooltip-content\s*\{[^}]*background-color:\s*var\(--color-on-surface\)/s
      );
    });

    it('should use surface text color', () => {
      expect(css).toMatch(
        /\.tooltip-content\s*\{[^}]*color:\s*var\(--color-surface\)/s
      );
    });

    it('should set font-size to 0.75rem', () => {
      expect(css).toMatch(
        /\.tooltip-content\s*\{[^}]*font-size:\s*0\.75rem/s
      );
    });

    it('should set white-space nowrap by default', () => {
      expect(css).toMatch(
        /\.tooltip-content\s*\{[^}]*white-space:\s*nowrap/s
      );
    });

    it('should set border-radius', () => {
      expect(css).toMatch(
        /\.tooltip-content\s*\{[^}]*border-radius:\s*0\.25rem/s
      );
    });

    it('should include box-shadow', () => {
      expect(css).toMatch(
        /\.tooltip-content\s*\{[^}]*box-shadow:\s*var\(--shadow-md\)/s
      );
    });
  });

  describe('Arrow Styles', () => {
    it('should define arrow via ::before pseudo-element', () => {
      expect(css).toContain('.tooltip-content::before');
    });

    it('should use transparent border trick for arrow', () => {
      expect(css).toMatch(
        /\.tooltip-content::before\s*\{[^}]*border:\s*0\.375rem\s+solid\s+transparent/s
      );
    });

    it('should set arrow dimensions to zero', () => {
      expect(css).toMatch(
        /\.tooltip-content::before\s*\{[^}]*width:\s*0/s
      );
      expect(css).toMatch(
        /\.tooltip-content::before\s*\{[^}]*height:\s*0/s
      );
    });
  });

  describe('Position: Top (Default)', () => {
    it('should position content above with bottom: 100%', () => {
      expect(css).toMatch(
        /\.tooltip\s+\.tooltip-content\s*\{[^}]*bottom:\s*100%/s
      );
    });

    it('should center horizontally with left: 50% and translateX(-50%)', () => {
      expect(css).toMatch(
        /\.tooltip\s+\.tooltip-content\s*\{[^}]*left:\s*50%/s
      );
      expect(css).toMatch(
        /\.tooltip\s+\.tooltip-content\s*\{[^}]*transform:\s*translateX\(-50%\)/s
      );
    });

    it('should set margin-bottom for spacing', () => {
      expect(css).toMatch(
        /\.tooltip\s+\.tooltip-content\s*\{[^}]*margin-bottom:\s*0\.5rem/s
      );
    });

    it('should color arrow border-top for top position', () => {
      expect(css).toMatch(
        /\.tooltip\s+\.tooltip-content::before\s*\{[^}]*border-top-color:\s*var\(--color-on-surface\)/s
      );
    });
  });

  describe('Position: Bottom', () => {
    it('should define .tooltip-bottom class', () => {
      expect(css).toContain('.tooltip.tooltip-bottom');
    });

    it('should position content below with top: 100%', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-bottom\s+\.tooltip-content\s*\{[^}]*top:\s*100%/s
      );
    });

    it('should set margin-top for spacing', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-bottom\s+\.tooltip-content\s*\{[^}]*margin-top:\s*0\.5rem/s
      );
    });

    it('should color arrow border-bottom for bottom position', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-bottom\s+\.tooltip-content::before\s*\{[^}]*border-bottom-color:\s*var\(--color-on-surface\)/s
      );
    });
  });

  describe('Position: Left', () => {
    it('should define .tooltip-left class', () => {
      expect(css).toContain('.tooltip.tooltip-left');
    });

    it('should position content to the left with right: 100%', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-left\s+\.tooltip-content\s*\{[^}]*right:\s*100%/s
      );
    });

    it('should center vertically with top: 50% and translateY(-50%)', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-left\s+\.tooltip-content\s*\{[^}]*top:\s*50%/s
      );
      expect(css).toMatch(
        /\.tooltip\.tooltip-left\s+\.tooltip-content\s*\{[^}]*transform:\s*translateY\(-50%\)/s
      );
    });

    it('should set margin-right for spacing', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-left\s+\.tooltip-content\s*\{[^}]*margin-right:\s*0\.5rem/s
      );
    });

    it('should color arrow border-left for left position', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-left\s+\.tooltip-content::before\s*\{[^}]*border-left-color:\s*var\(--color-on-surface\)/s
      );
    });
  });

  describe('Position: Right', () => {
    it('should define .tooltip-right class', () => {
      expect(css).toContain('.tooltip.tooltip-right');
    });

    it('should position content to the right with left: 100%', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-right\s+\.tooltip-content\s*\{[^}]*left:\s*100%/s
      );
    });

    it('should center vertically with top: 50% and translateY(-50%)', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-right\s+\.tooltip-content\s*\{[^}]*top:\s*50%/s
      );
      expect(css).toMatch(
        /\.tooltip\.tooltip-right\s+\.tooltip-content\s*\{[^}]*transform:\s*translateY\(-50%\)/s
      );
    });

    it('should set margin-left for spacing', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-right\s+\.tooltip-content\s*\{[^}]*margin-left:\s*0\.5rem/s
      );
    });

    it('should color arrow border-right for right position', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-right\s+\.tooltip-content::before\s*\{[^}]*border-right-color:\s*var\(--color-on-surface\)/s
      );
    });
  });

  describe('Light Variant', () => {
    it('should define .tooltip-light class', () => {
      expect(css).toContain('.tooltip.tooltip-light');
    });

    it('should use surface background for light variant', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-light\s+\.tooltip-content\s*\{[^}]*background-color:\s*var\(--color-surface\)/s
      );
    });

    it('should use on-surface text color for light variant', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-light\s+\.tooltip-content\s*\{[^}]*color:\s*var\(--color-on-surface\)/s
      );
    });

    it('should have outline border for light variant', () => {
      expect(css).toMatch(
        /\.tooltip\.tooltip-light\s+\.tooltip-content\s*\{[^}]*border:\s*1px\s+solid\s+var\(--color-outline\)/s
      );
    });

    it('should define arrow colors for all light variant positions', () => {
      expect(css).toContain(
        '.tooltip.tooltip-light .tooltip-content::before'
      );
      expect(css).toContain(
        '.tooltip.tooltip-light.tooltip-bottom .tooltip-content::before'
      );
      expect(css).toContain(
        '.tooltip.tooltip-light.tooltip-left .tooltip-content::before'
      );
      expect(css).toContain(
        '.tooltip.tooltip-light.tooltip-right .tooltip-content::before'
      );
    });
  });

  describe('Color Variants', () => {
    const colorVariants = [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
    ] as const;

    for (const variant of colorVariants) {
      it(`should define .tooltip-${variant} class`, () => {
        expect(css).toContain(`.tooltip.tooltip-${variant}`);
      });

      it(`should use --color-${variant} as background for ${variant} variant`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.tooltip\\.tooltip-${variant}\\s+\\.tooltip-content\\s*\\{[^}]*background-color:\\s*var\\(--color-${variant}\\)`,
            's'
          )
        );
      });

      it(`should use --color-${variant}-content as text color for ${variant} variant`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.tooltip\\.tooltip-${variant}\\s+\\.tooltip-content\\s*\\{[^}]*color:\\s*var\\(--color-${variant}-content\\)`,
            's'
          )
        );
      });

      it(`should set arrow color for ${variant} top position`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.tooltip\\.tooltip-${variant}\\s+\\.tooltip-content::before\\s*\\{[^}]*border-top-color:\\s*var\\(--color-${variant}\\)`,
            's'
          )
        );
      });

      it(`should set arrow color for ${variant} bottom position`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.tooltip\\.tooltip-${variant}\\.tooltip-bottom\\s+\\.tooltip-content::before\\s*\\{[^}]*border-bottom-color:\\s*var\\(--color-${variant}\\)`,
            's'
          )
        );
      });

      it(`should set arrow color for ${variant} left position`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.tooltip\\.tooltip-${variant}\\.tooltip-left\\s+\\.tooltip-content::before\\s*\\{[^}]*border-left-color:\\s*var\\(--color-${variant}\\)`,
            's'
          )
        );
      });

      it(`should set arrow color for ${variant} right position`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.tooltip\\.tooltip-${variant}\\.tooltip-right\\s+\\.tooltip-content::before\\s*\\{[^}]*border-right-color:\\s*var\\(--color-${variant}\\)`,
            's'
          )
        );
      });
    }
  });

  describe('Multi-line Tooltip', () => {
    it('should define .tooltip-multiline class', () => {
      expect(css).toContain('.tooltip-multiline');
    });

    it('should set white-space to normal', () => {
      expect(css).toMatch(
        /\.tooltip-multiline\s+\.tooltip-content\s*\{[^}]*white-space:\s*normal/s
      );
    });

    it('should set max-width to 16rem', () => {
      expect(css).toMatch(
        /\.tooltip-multiline\s+\.tooltip-content\s*\{[^}]*max-width:\s*16rem/s
      );
    });

    it('should center text', () => {
      expect(css).toMatch(
        /\.tooltip-multiline\s+\.tooltip-content\s*\{[^}]*text-align:\s*center/s
      );
    });
  });

  describe('Rich Tooltip', () => {
    it('should define .tooltip-rich class', () => {
      expect(css).toContain('.tooltip-rich');
    });

    it('should set larger max-width of 20rem', () => {
      expect(css).toMatch(
        /\.tooltip-rich\s+\.tooltip-content\s*\{[^}]*max-width:\s*20rem/s
      );
    });

    it('should left-align text for rich tooltips', () => {
      expect(css).toMatch(
        /\.tooltip-rich\s+\.tooltip-content\s*\{[^}]*text-align:\s*left/s
      );
    });

    it('should define .tooltip-rich-title class', () => {
      expect(css).toContain('.tooltip-rich-title');
    });

    it('should define .tooltip-rich-description class', () => {
      expect(css).toContain('.tooltip-rich-description');
    });

    it('should set heavier font-weight for title', () => {
      expect(css).toMatch(
        /\.tooltip-rich-title\s*\{[^}]*font-weight:\s*600/s
      );
    });

    it('should set normal font-weight for description', () => {
      expect(css).toMatch(
        /\.tooltip-rich-description\s*\{[^}]*font-weight:\s*400/s
      );
    });
  });

  describe('Delay Variants', () => {
    it('should define .tooltip-delay class with 300ms delay', () => {
      expect(css).toMatch(
        /\.tooltip-delay\s+\.tooltip-content\s*\{[^}]*transition-delay:\s*300ms/s
      );
    });

    it('should define .tooltip-delay-long class with 500ms delay', () => {
      expect(css).toMatch(
        /\.tooltip-delay-long\s+\.tooltip-content\s*\{[^}]*transition-delay:\s*500ms/s
      );
    });
  });

  describe('Interactive Tooltip', () => {
    it('should define .tooltip-interactive class', () => {
      expect(css).toContain('.tooltip-interactive');
    });

    it('should enable pointer-events for interactive tooltips', () => {
      expect(css).toMatch(
        /\.tooltip-interactive\s+\.tooltip-content\s*\{[^}]*pointer-events:\s*auto/s
      );
    });
  });

  describe('Accessibility', () => {
    it('should include prefers-reduced-motion media query', () => {
      expect(css).toContain(
        '@media (prefers-reduced-motion: reduce)'
      );
    });

    it('should disable transition when reduced motion is preferred', () => {
      expect(css).toMatch(
        /prefers-reduced-motion:\s*reduce\)[^}]*\{[^}]*\.tooltip-content\s*\{[^}]*transition:\s*none/s
      );
    });
  });
});
