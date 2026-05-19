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

    it('should set relative positioning on .chat-bubble for tail rendering', () => {
      expect(css).toMatch(/\.chat-bubble\s*\{[^}]*position:\s*relative/s);
    });

    it('should use surface-container background on default bubble', () => {
      expect(css).toMatch(
        /\.chat-bubble\s*\{[^}]*background-color:\s*var\(--color-surface-container\)/s,
      );
    });

    it('should use on-surface text color on default bubble', () => {
      expect(css).toMatch(
        /\.chat-bubble\s*\{[^}]*color:\s*var\(--color-on-surface\)/s,
      );
    });

    it('should cap bubble max-width', () => {
      expect(css).toMatch(/\.chat-bubble\s*\{[^}]*max-width:\s*min\(80ch/s);
    });

    it('should set overflow-wrap anywhere on bubble', () => {
      expect(css).toMatch(/\.chat-bubble\s*\{[^}]*overflow-wrap:\s*anywhere/s);
    });
  });

  describe('Bubble tail', () => {
    it('should render start tail with a CSS mask', () => {
      expect(css).toMatch(
        /\.chat-start \.chat-bubble::before[^}]*mask:\s*radial-gradient/s,
      );
    });

    it('should render end tail with a CSS mask', () => {
      expect(css).toMatch(
        /\.chat-end \.chat-bubble::before[^}]*mask:\s*radial-gradient/s,
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

      it(`should use ${variant}-container background for .chat-bubble-${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.chat-bubble-${variant}\\s*\\{[^}]*background-color:\\s*var\\(--color-${variant}-container\\)`,
            's',
          ),
        );
      });

      it(`should use on-${variant}-container text for .chat-bubble-${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.chat-bubble-${variant}\\s*\\{[^}]*color:\\s*var\\(--color-on-${variant}-container\\)`,
            's',
          ),
        );
      });

      it(`should define filled override for .chat-bubble-${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.chat-bubble-filled\\.chat-bubble-${variant}\\s*\\{[^}]*background-color:\\s*var\\(--color-${variant}\\)[^}]*color:\\s*var\\(--color-${variant}-content\\)`,
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
        '.chat-tool',
        '.chat-tool-header',
        '.chat-tool-status',
        '.chat-tool-call',
        '.chat-tool-result',
      ]) {
        expect(css).toContain(className);
      }
    });

    it('should style reasoning and tool blocks as outlined containers', () => {
      expect(css).toMatch(
        /\.chat-reasoning,\s*\.chat-tool\s*\{[^}]*border:\s*1px solid var\(--color-outline\)[^}]*background-color:\s*var\(--color-surface-container-low\)/s,
      );
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

    it('should include reduced motion fallbacks', () => {
      expect(css).toContain('@media (prefers-reduced-motion: reduce)');
      expect(css).toMatch(/prefers-reduced-motion:[^)]+reduce[^}]*animation:\s*none/s);
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
