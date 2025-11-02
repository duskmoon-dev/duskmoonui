import { describe, expect, test } from 'bun:test';
import {
  buttonStyles,
  cardStyles,
  inputStyles,
  badgeStyles,
  alertStyles,
  getAllComponentStyles,
  getComponentStyles,
} from '../src/components';

describe('Component Tests', () => {
  describe('Button Component', () => {
    test('should have base button class', () => {
      expect(buttonStyles['.btn']).toBeDefined();
      expect(buttonStyles['.btn'].display).toBe('inline-flex');
    });

    test('should have variant classes', () => {
      expect(buttonStyles['.btn-primary']).toBeDefined();
      expect(buttonStyles['.btn-secondary']).toBeDefined();
      expect(buttonStyles['.btn-tertiary']).toBeDefined();
      expect(buttonStyles['.btn-outlined']).toBeDefined();
      expect(buttonStyles['.btn-text']).toBeDefined();
      expect(buttonStyles['.btn-tonal']).toBeDefined();
    });

    test('should have size variants', () => {
      expect(buttonStyles['.btn-sm']).toBeDefined();
      expect(buttonStyles['.btn-md']).toBeDefined();
      expect(buttonStyles['.btn-lg']).toBeDefined();
    });

    test('should have semantic color variants', () => {
      expect(buttonStyles['.btn-success']).toBeDefined();
      expect(buttonStyles['.btn-error']).toBeDefined();
      expect(buttonStyles['.btn-warning']).toBeDefined();
      expect(buttonStyles['.btn-info']).toBeDefined();
    });

    test('should have icon button variants', () => {
      expect(buttonStyles['.btn-icon']).toBeDefined();
      expect(buttonStyles['.btn-icon-sm']).toBeDefined();
      expect(buttonStyles['.btn-icon-lg']).toBeDefined();
    });

    test('should have disabled state styling', () => {
      expect(buttonStyles['.btn']['&:disabled']).toBeDefined();
      expect(buttonStyles['.btn']['&:disabled'].cursor).toBe('not-allowed');
    });
  });

  describe('Card Component', () => {
    test('should have base card class', () => {
      expect(cardStyles['.card']).toBeDefined();
      expect(cardStyles['.card'].display).toBe('flex');
      expect(cardStyles['.card'].flexDirection).toBe('column');
    });

    test('should have elevation variants', () => {
      expect(cardStyles['.card-lowest']).toBeDefined();
      expect(cardStyles['.card-low']).toBeDefined();
      expect(cardStyles['.card-default']).toBeDefined();
      expect(cardStyles['.card-high']).toBeDefined();
      expect(cardStyles['.card-highest']).toBeDefined();
    });

    test('should have style variants', () => {
      expect(cardStyles['.card-filled']).toBeDefined();
      expect(cardStyles['.card-outlined']).toBeDefined();
      expect(cardStyles['.card-interactive']).toBeDefined();
    });

    test('should have subcomponents', () => {
      expect(cardStyles['.card-body']).toBeDefined();
      expect(cardStyles['.card-header']).toBeDefined();
      expect(cardStyles['.card-title']).toBeDefined();
      expect(cardStyles['.card-subtitle']).toBeDefined();
      expect(cardStyles['.card-actions']).toBeDefined();
      expect(cardStyles['.card-image']).toBeDefined();
    });

    test('should have density variants', () => {
      expect(cardStyles['.card-compact .card-body']).toBeDefined();
      expect(cardStyles['.card-comfortable .card-body']).toBeDefined();
    });
  });

  describe('Input Component', () => {
    test('should have base input class', () => {
      expect(inputStyles['.input']).toBeDefined();
      expect(inputStyles['.input'].width).toBe('100%');
    });

    test('should have variant classes', () => {
      expect(inputStyles['.input-outlined']).toBeDefined();
      expect(inputStyles['.input-filled']).toBeDefined();
    });

    test('should have size variants', () => {
      expect(inputStyles['.input-sm']).toBeDefined();
      expect(inputStyles['.input-md']).toBeDefined();
      expect(inputStyles['.input-lg']).toBeDefined();
    });

    test('should have state variants', () => {
      expect(inputStyles['.input-error']).toBeDefined();
      expect(inputStyles['.input-success']).toBeDefined();
    });

    test('should have related components', () => {
      expect(inputStyles['.textarea']).toBeDefined();
      expect(inputStyles['.select']).toBeDefined();
      expect(inputStyles['.checkbox']).toBeDefined();
      expect(inputStyles['.radio']).toBeDefined();
    });

    test('should have helper components', () => {
      expect(inputStyles['.input-group']).toBeDefined();
      expect(inputStyles['.input-label']).toBeDefined();
      expect(inputStyles['.input-helper']).toBeDefined();
      expect(inputStyles['.input-error-message']).toBeDefined();
    });

    test('should have disabled state', () => {
      expect(inputStyles['.input']['&:disabled']).toBeDefined();
      expect(inputStyles['.input']['&:disabled'].cursor).toBe('not-allowed');
    });
  });

  describe('Badge Component', () => {
    test('should have base badge class', () => {
      expect(badgeStyles['.badge']).toBeDefined();
      expect(badgeStyles['.badge'].display).toBe('inline-flex');
    });

    test('should have color variants', () => {
      expect(badgeStyles['.badge-primary']).toBeDefined();
      expect(badgeStyles['.badge-secondary']).toBeDefined();
      expect(badgeStyles['.badge-tertiary']).toBeDefined();
    });

    test('should have style variants', () => {
      expect(badgeStyles['.badge-filled']).toBeDefined();
      expect(badgeStyles['.badge-tonal']).toBeDefined();
      expect(badgeStyles['.badge-outlined']).toBeDefined();
    });

    test('should have semantic colors', () => {
      expect(badgeStyles['.badge-success']).toBeDefined();
      expect(badgeStyles['.badge-error']).toBeDefined();
      expect(badgeStyles['.badge-warning']).toBeDefined();
      expect(badgeStyles['.badge-info']).toBeDefined();
    });

    test('should have size variants', () => {
      expect(badgeStyles['.badge-sm']).toBeDefined();
      expect(badgeStyles['.badge-md']).toBeDefined();
      expect(badgeStyles['.badge-lg']).toBeDefined();
    });

    test('should have special types', () => {
      expect(badgeStyles['.badge-dot']).toBeDefined();
      expect(badgeStyles['.badge-notification']).toBeDefined();
      expect(badgeStyles['.badge-removable']).toBeDefined();
    });
  });

  describe('Alert Component', () => {
    test('should have base alert class', () => {
      expect(alertStyles['.alert']).toBeDefined();
      expect(alertStyles['.alert'].display).toBe('flex');
    });

    test('should have variant classes', () => {
      expect(alertStyles['.alert-filled']).toBeDefined();
      expect(alertStyles['.alert-tonal']).toBeDefined();
      expect(alertStyles['.alert-outlined']).toBeDefined();
      expect(alertStyles['.alert-standard']).toBeDefined();
    });

    test('should have type variants', () => {
      expect(alertStyles['.alert-info']).toBeDefined();
      expect(alertStyles['.alert-success']).toBeDefined();
      expect(alertStyles['.alert-warning']).toBeDefined();
      expect(alertStyles['.alert-error']).toBeDefined();
    });

    test('should have subcomponents', () => {
      expect(alertStyles['.alert-content']).toBeDefined();
      expect(alertStyles['.alert-title']).toBeDefined();
      expect(alertStyles['.alert-description']).toBeDefined();
      expect(alertStyles['.alert-icon']).toBeDefined();
      expect(alertStyles['.alert-actions']).toBeDefined();
      expect(alertStyles['.alert-close']).toBeDefined();
    });

    test('should have density variants', () => {
      expect(alertStyles['.alert-compact']).toBeDefined();
      expect(alertStyles['.alert-comfortable']).toBeDefined();
    });
  });

  describe('Component Utilities', () => {
    test('getAllComponentStyles should return all component styles', () => {
      const allStyles = getAllComponentStyles();

      // Should include styles from all components
      expect(allStyles['.btn']).toBeDefined();
      expect(allStyles['.card']).toBeDefined();
      expect(allStyles['.input']).toBeDefined();
      expect(allStyles['.badge']).toBeDefined();
      expect(allStyles['.alert']).toBeDefined();
    });

    test('getComponentStyles should return all when passed "all"', () => {
      const allStyles = getComponentStyles('all');

      expect(allStyles['.btn']).toBeDefined();
      expect(allStyles['.card']).toBeDefined();
      expect(allStyles['.input']).toBeDefined();
      expect(allStyles['.badge']).toBeDefined();
      expect(allStyles['.alert']).toBeDefined();
    });

    test('getComponentStyles should return specific components', () => {
      const specificStyles = getComponentStyles(['button', 'card']);

      expect(specificStyles['.btn']).toBeDefined();
      expect(specificStyles['.card']).toBeDefined();
      expect(specificStyles['.input']).toBeUndefined();
      expect(specificStyles['.badge']).toBeUndefined();
      expect(specificStyles['.alert']).toBeUndefined();
    });

    test('getComponentStyles should handle empty array', () => {
      const emptyStyles = getComponentStyles([]);

      expect(Object.keys(emptyStyles).length).toBe(0);
    });

    test('getComponentStyles should be case insensitive', () => {
      const styles = getComponentStyles(['BUTTON', 'Card']);

      expect(styles['.btn']).toBeDefined();
      expect(styles['.card']).toBeDefined();
    });
  });
});
