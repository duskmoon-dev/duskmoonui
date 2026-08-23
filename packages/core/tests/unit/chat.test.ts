import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Chat Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/chat.css'),
      'utf-8',
    );
  });

  describe('Base structure', () => {
    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });

    it('should define .chat wrapper class', () => {
      expect(css).toContain('.chat');
    });

    it('should use grid layout on .chat', () => {
      expect(css).toMatch(/\.chat\s*\{[^}]*display:\s*grid/s);
    });

    it('should define placement modifiers', () => {
      expect(css).toContain('.chat-start');
      expect(css).toContain('.chat-end');
    });

    it('should define structural slots', () => {
      for (const className of [
        '.chat-avatar',
        '.chat-header',
        '.chat-footer',
        '.chat-bubble',
      ]) {
        expect(css).toContain(className);
      }
    });

    it('should align chat avatar to the top of the row stack', () => {
      expect(css).toMatch(/\.chat-avatar\s*\{[^}]*align-self:\s*start/s);
    });

    it('should use flex column layout on .chat-bubble for nested blocks', () => {
      expect(css).toMatch(
        /\.chat-bubble\s*\{[^}]*display:\s*flex[^}]*flex-direction:\s*column/s,
      );
    });

    it('should set relative positioning on .chat-bubble for tail rendering', () => {
      expect(css).toMatch(/\.chat-bubble\s*\{[^}]*position:\s*relative/s);
    });

    it('should use elevated surface container background on default bubble', () => {
      expect(css).toMatch(
        /\.chat-bubble\s*\{[^}]*--chat-bubble-bg:\s*var\(--color-surface-container-highest\)[^}]*background-color:\s*var\(--chat-bubble-bg\)/s,
      );
    });

    it('should outline default bubbles for dark surface contrast', () => {
      expect(css).toMatch(
        /\.chat-bubble\s*\{[^}]*box-shadow:\s*inset 0 0 0 1px var\(--color-outline-variant\)/s,
      );
    });

    it('should use on-surface text color on default bubble', () => {
      expect(css).toMatch(
        /\.chat-bubble\s*\{[^}]*--chat-bubble-fg:\s*var\(--color-on-surface\)[^}]*color:\s*var\(--chat-bubble-fg\)/s,
      );
    });

    it('should cap bubble max-width', () => {
      expect(css).toMatch(/\.chat-bubble\s*\{[^}]*max-width:\s*min\(80ch/s);
    });

    it('should set overflow-wrap anywhere on bubble', () => {
      expect(css).toMatch(/\.chat-bubble\s*\{[^}]*overflow-wrap:\s*anywhere/s);
    });
  });

  describe('Scroll container', () => {
    it('should define .chat-scroll with overflow and smooth scroll behavior', () => {
      expect(css).toMatch(
        /\.chat-scroll\s*\{[^}]*overflow-y:\s*auto[^}]*scroll-behavior:\s*smooth/s,
      );
    });

    it('should hoist named view timelines with timeline-scope', () => {
      expect(css).toMatch(/\.chat-scroll\s*\{[^}]*timeline-scope:/s);
      expect(css).toContain('--chat-1');
      expect(css).toContain('--chat-24');
    });

    it('should define scroll track, body, and indicator primitives', () => {
      expect(css).toContain('.chat-scroll-track');
      expect(css).toContain('.chat-scroll-body');
      expect(css).toContain('.chat-scroll-indicator');
    });

    it('should bind indicators with animation-timeline and animation-range', () => {
      expect(css).toMatch(
        /\.chat-scroll-indicator\s*\{[^}]*animation-timeline:|--chat-1/s,
      );
      expect(css).toContain('animation-range: entry 0% exit 100%');
      expect(css).toContain(
        '.chat-scroll-indicator[data-chat-tl="1"]',
      );
      expect(css).toMatch(
        /\.chat-scroll-indicator\[data-chat-tl="1"\]\s*\{[^}]*animation-timeline:\s*--chat-1/s,
      );
    });

    it('should declare view-timeline on chat rows via data-chat-tl', () => {
      expect(css).toMatch(
        /\.chat\[data-chat-tl="1"\]\s*\{[^}]*view-timeline-name:\s*--chat-1[^}]*view-timeline-axis:\s*block/s,
      );
      expect(css).toContain('.chat[data-chat-tl="24"]');
    });

    it('should define indicator activate keyframes', () => {
      expect(css).toContain('@keyframes chat-scroll-indicator-activate');
    });

    it('should enlarge indicators on hover with neighbor fisheye', () => {
      expect(css).toMatch(
        /\.chat-scroll-indicator:hover,\s*\.chat-scroll-indicator:focus-visible\s*\{[^}]*scaleX\(var\(--chat-scroll-indicator-hover-scale\)\)/s,
      );
      expect(css).toContain(
        '.chat-scroll-indicator:hover + .chat-scroll-indicator',
      );
      expect(css).toContain('--chat-scroll-indicator-neighbor-scale');
    });

    it('should style indicators as button-friendly controls', () => {
      expect(css).toMatch(
        /\.chat-scroll-indicator\s*\{[^}]*appearance:\s*none/s,
      );
    });

    it('should add scroll-margin on timeline subjects', () => {
      expect(css).toMatch(
        /\.chat\[data-chat-tl\]\s*\{[^}]*scroll-margin-block-start:/s,
      );
    });

    it('should disable smooth scrolling under reduced motion', () => {
      expect(css).toMatch(
        /prefers-reduced-motion:[^)]+reduce[^}]*\.chat-scroll\s*\{[^}]*scroll-behavior:\s*auto/s,
      );
      expect(css).toMatch(
        /prefers-reduced-motion:[^)]+reduce[\s\S]*\.chat-scroll-indicator\s*\{[^}]*animation:\s*none/s,
      );
    });
  });

  describe('Bubble tail', () => {
    it('should render start tail with a clipped wedge', () => {
      expect(css).toMatch(
        /\.chat-start \.chat-bubble::before,\s*\.chat-end \.chat-bubble::before\s*\{[^}]*clip-path:\s*polygon/s,
      );
    });

    it('should render end tail with mirrored placement', () => {
      expect(css).toMatch(
        /\.chat-end \.chat-bubble::before\s*\{[^}]*right:\s*-0\.5rem[^}]*transform:\s*scaleX\(-1\)/s,
      );
    });

    it('should place bubble tails at the top edge', () => {
      expect(css).toMatch(
        /\.chat-start \.chat-bubble::before,\s*\.chat-end \.chat-bubble::before\s*\{[^}]*top:\s*0/s,
      );
      expect(css).not.toMatch(
        /\.chat-start \.chat-bubble::before,\s*\.chat-end \.chat-bubble::before\s*\{[^}]*bottom:\s*0/s,
      );
    });

    it('should render outlined tails with matching bubble fill', () => {
      expect(css).toMatch(
        /\.chat-start \.chat-bubble::before,\s*\.chat-end \.chat-bubble::before\s*\{[^}]*width:\s*calc\(1rem - 2px\)[^}]*height:\s*calc\(1rem - 2px\)[^}]*background-color:\s*var\(--chat-bubble-bg\)[^}]*filter:\s*drop-shadow/s,
      );
    });

    it('should square the top corner that connects to the tail', () => {
      expect(css).toMatch(
        /\.chat-start \.chat-bubble\s*\{[^}]*border-top-left-radius:\s*0/s,
      );
      expect(css).toMatch(
        /\.chat-end \.chat-bubble\s*\{[^}]*border-top-right-radius:\s*0/s,
      );
    });
  });

  describe('Color variants', () => {
    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
    ];

    for (const variant of variants) {
      it(`should define .chat-bubble-${variant}`, () => {
        expect(css).toContain(`.chat-bubble-${variant}`);
      });

      it(`should set ${variant}-container background variable for .chat-bubble-${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.chat-bubble-${variant}\\s*\\{[^}]*--chat-bubble-bg:\\s*var\\(--color-${variant}-container\\)`,
            's',
          ),
        );
      });

      it(`should set on-${variant}-container text variable for .chat-bubble-${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.chat-bubble-${variant}\\s*\\{[^}]*--chat-bubble-fg:\\s*var\\(--color-on-${variant}-container\\)`,
            's',
          ),
        );
      });

      it(`should define filled override for .chat-bubble-${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.chat-bubble-filled\\.chat-bubble-${variant}\\s*\\{[^}]*--chat-bubble-bg:\\s*var\\(--color-${variant}\\)[^}]*--chat-bubble-fg:\\s*var\\(--color-${variant}-content\\)`,
            's',
          ),
        );
      });
    }
  });

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'];

    for (const size of sizes) {
      it(`should define .chat-bubble-${size} with padding and font-size`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.chat-bubble-${size}\\s*\\{[^}]*padding:[^;]+;[^}]*font-size:`,
            's',
          ),
        );
      });
    }
  });

  describe('LLM-specific blocks', () => {
    it('should define reasoning and tool containers', () => {
      for (const className of [
        '.chat-reasoning',
        '.chat-reasoning-body',
        '.chat-tool',
        '.chat-tool-header',
        '.chat-tool-status',
        '.chat-tool-call',
        '.chat-tool-result',
        '.chat-bubble-content',
      ]) {
        expect(css).toContain(className);
      }
    });

    it('should style reasoning and tool blocks as outlined containers', () => {
      expect(css).toMatch(
        /\.chat-reasoning,\s*\.chat-tool\s*\{[^}]*border:\s*1px solid var\(--color-outline\)[^}]*background-color:\s*var\(--color-surface-container-low\)/s,
      );
    });

    it('should allow nested tools inside reasoning and full-width blocks in bubbles', () => {
      expect(css).toMatch(
        /\.chat-bubble\s*>\s*\.chat-reasoning,\s*\.chat-bubble\s*>\s*\.chat-tool,\s*\.chat-reasoning\s*\.chat-tool/s,
      );
      expect(css).toContain('.chat-reasoning-body > .chat-tool');
      expect(css).toContain('.chat-reasoning > .chat-tool');
    });

    it('should define tool status modifiers with matching color tokens', () => {
      expect(css).toMatch(/\.chat-tool-pending[^}]*var\(--color-outline\)/s);
      expect(css).toMatch(/\.chat-tool-running[^}]*var\(--color-info-container\)/s);
      expect(css).toMatch(/\.chat-tool-success[^}]*var\(--color-success-container\)/s);
      expect(css).toMatch(/\.chat-tool-error[^}]*var\(--color-error-container\)/s);
    });
  });

  describe('Live states', () => {
    it('should define typing, streaming, and running animations', () => {
      expect(css).toContain('.chat-typing');
      expect(css).toContain('.chat-bubble-streaming');
      expect(css).toContain('@keyframes chat-typing-dot');
      expect(css).toContain('@keyframes chat-stream-caret');
      expect(css).toContain('@keyframes chat-tool-spin');
    });

    it('should keep the streaming caret separate from the bubble tail', () => {
      expect(css).toMatch(
        /\.chat-start \.chat-bubble::before,\s*\.chat-end \.chat-bubble::before\s*\{[^}]*filter:\s*drop-shadow/s,
      );
      expect(css).toMatch(
        /\.chat-bubble\.chat-bubble-streaming:not\(:has\([^)]+\)\)\s*\{[^}]*display:\s*block/s,
      );
      expect(css).toMatch(
        /\.chat-bubble-streaming::after,\s*\.chat-bubble-content\.chat-bubble-streaming::after\s*\{[^}]*position:\s*static[^}]*clip-path:\s*none/s,
      );
    });

    it('should include reduced motion fallbacks', () => {
      expect(css).toContain('@media (prefers-reduced-motion: reduce)');
      expect(css).toMatch(
        /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*animation:\s*none/,
      );
    });
  });

  describe('Composition constraints', () => {
    it('should not redefine composed component selectors', () => {
      expect(css).not.toMatch(/(?:^|\n)\s*\.avatar\s*\{/);
      expect(css).not.toMatch(/(?:^|\n)\s*\.code-block\s*\{/);
      expect(css).not.toMatch(/(?:^|\n)\s*\.markdown-body\s*\{/);
    });
  });
});
