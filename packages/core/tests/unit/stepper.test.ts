/**
 * Unit tests for stepper component
 * Tests step states, connectors, sizes, color variants, and accessibility
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Stepper Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/stepper.css'), 'utf-8');
  });

  describe('Base Layout', () => {
    it('should define .stepper class', () => {
      expect(css).toContain('.stepper');
    });

    it('should use flexbox layout', () => {
      expect(css).toMatch(/\.stepper\s*\{[^}]*display:\s*flex/s);
    });

    it('should define stepper-step', () => {
      expect(css).toContain('.stepper-step');
    });
  });

  describe('Step Connector', () => {
    it('should define connector between steps', () => {
      expect(css).toContain('.stepper-step-connector');
    });

    it('should hide last connector', () => {
      expect(css).toContain('.stepper-step:last-child .stepper-step-connector');
    });

    it('should color completed connector with primary', () => {
      expect(css).toMatch(/\.stepper-step-completed .stepper-step-connector[^}]*var\(--color-primary\)/s);
    });
  });

  describe('Step Icon', () => {
    it('should define step icon circle', () => {
      expect(css).toContain('.stepper-step-icon');
    });

    it('should use full radius for circle', () => {
      expect(css).toMatch(/\.stepper-step-icon[^}]*var\(--radius-full\)/s);
    });
  });

  describe('Step States', () => {
    it('should define active step state', () => {
      expect(css).toContain('.stepper-step-active');
    });

    it('should use primary color for active icon', () => {
      expect(css).toMatch(/\.stepper-step-active .stepper-step-icon[^}]*var\(--color-primary\)/s);
    });

    it('should define completed step state', () => {
      expect(css).toContain('.stepper-step-completed');
    });

    it('should define error step state', () => {
      expect(css).toContain('.stepper-step-error');
    });

    it('should use error color for error icon', () => {
      expect(css).toMatch(/\.stepper-step-error .stepper-step-icon[^}]*var\(--color-error\)/s);
    });

    it('should define disabled step state', () => {
      expect(css).toContain('.stepper-step-disabled');
    });
  });

  describe('Labels', () => {
    it('should define step label', () => {
      expect(css).toContain('.stepper-step-label');
    });

    it('should define step description', () => {
      expect(css).toContain('.stepper-step-description');
    });

    it('should color active label with primary', () => {
      expect(css).toMatch(/\.stepper-step-active .stepper-step-label[^}]*var\(--color-primary\)/s);
    });

    it('should color error label with error', () => {
      expect(css).toMatch(/\.stepper-step-error .stepper-step-label[^}]*var\(--color-error\)/s);
    });

    it('should define optional step marker', () => {
      expect(css).toContain('.stepper-step-optional::after');
    });
  });

  describe('Vertical Stepper', () => {
    it('should define vertical variant', () => {
      expect(css).toContain('.stepper-vertical');
    });

    it('should use column direction', () => {
      expect(css).toMatch(/\.stepper-vertical\s*\{[^}]*flex-direction:\s*column/s);
    });

    it('should adjust connector for vertical layout', () => {
      expect(css).toContain('.stepper-vertical .stepper-step-connector');
    });

    it('should define step content area', () => {
      expect(css).toContain('.stepper-step-content');
    });
  });

  describe('Color Variants', () => {
    it('should define secondary color variant', () => {
      expect(css).toContain('.stepper-secondary');
    });

    it('should use secondary color for active icon', () => {
      expect(css).toMatch(/\.stepper-secondary .stepper-step-active .stepper-step-icon[^}]*var\(--color-secondary\)/s);
    });

    it('should define tertiary color variant', () => {
      expect(css).toContain('.stepper-tertiary');
    });
  });

  describe('Size Variants', () => {
    it('should define small size variant', () => {
      expect(css).toContain('.stepper-sm');
    });

    it('should define large size variant', () => {
      expect(css).toContain('.stepper-lg');
    });
  });

  describe('Special Variants', () => {
    it('should define dot stepper variant', () => {
      expect(css).toContain('.stepper-dots');
    });

    it('should hide labels in dot stepper', () => {
      expect(css).toContain('.stepper-dots .stepper-step-label');
    });

    it('should define clickable stepper', () => {
      expect(css).toContain('.stepper-clickable');
    });

    it('should define icon stepper', () => {
      expect(css).toContain('.stepper-icons');
    });

    it('should define alternative label positioning', () => {
      expect(css).toContain('.stepper-alt-labels');
    });
  });

  describe('Step Button', () => {
    it('should define step button', () => {
      expect(css).toContain('.stepper-step-button');
    });

    it('should have focus-visible with outline on icon', () => {
      expect(css).toContain('.stepper-step-button:focus-visible .stepper-step-icon');
    });
  });

  describe('Accessibility', () => {
    it('should support prefers-reduced-motion', () => {
      expect(css).toContain('prefers-reduced-motion');
    });

    it('should disable transitions for reduced motion', () => {
      expect(css).toMatch(/prefers-reduced-motion[\s\S]*transition:\s*none/);
    });
  });
});
