/**
 * Unit tests for table component class generation
 * Tests that table CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Table Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/table.css'),
      'utf-8',
    );
  });

  describe('Base Table Class', () => {
    it('should define .table base class', () => {
      expect(css).toContain('.table');
    });

    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });

    it('should be full width', () => {
      expect(css).toMatch(/\.table\s*\{[^}]*width:\s*100%/s);
    });

    it('should collapse borders', () => {
      expect(css).toMatch(/\.table\s*\{[^}]*border-collapse:\s*collapse/s);
    });

    it('should set font-size to 0.875rem', () => {
      expect(css).toMatch(/\.table\s*\{[^}]*font-size:\s*0\.875rem/s);
    });

    it('should use on-surface text color', () => {
      expect(css).toMatch(
        /\.table\s*\{[^}]*color:\s*var\(--color-on-surface\)/s,
      );
    });
  });

  describe('Table Head', () => {
    it('should style table head', () => {
      expect(css).toContain('.table thead');
    });

    it('should use surface-container background for header', () => {
      expect(css).toMatch(
        /\.table thead[\s\S]*?background-color:\s*var\(--color-surface-container\)/,
      );
    });

    it('should style table header cells', () => {
      expect(css).toContain('.table th');
    });

    it('should set header cell padding', () => {
      expect(css).toMatch(/\.table th[\s\S]*?padding:\s*0\.75rem 1rem/);
    });

    it('should set header font-weight to 600', () => {
      expect(css).toMatch(/\.table th[\s\S]*?font-weight:\s*600/);
    });

    it('should align header text left', () => {
      expect(css).toMatch(/\.table th[\s\S]*?text-align:\s*left/);
    });

    it('should have 2px bottom border on header', () => {
      expect(css).toMatch(
        /\.table th[\s\S]*?border-bottom:\s*2px solid var\(--color-outline\)/,
      );
    });
  });

  describe('Table Body', () => {
    it('should style table body', () => {
      expect(css).toContain('.table tbody');
    });

    it('should use surface background for body', () => {
      expect(css).toMatch(
        /\.table tbody[\s\S]*?background-color:\s*var\(--color-surface\)/,
      );
    });

    it('should style table cells', () => {
      expect(css).toContain('.table td');
    });

    it('should set cell padding', () => {
      expect(css).toMatch(/\.table td[\s\S]*?padding:\s*0\.75rem 1rem/);
    });

    it('should use outline-variant for cell borders', () => {
      expect(css).toMatch(
        /\.table td[\s\S]*?border-bottom:\s*1px solid var\(--color-outline-variant\)/,
      );
    });

    it('should remove border from last row', () => {
      expect(css).toContain('.table tr:last-child td');
    });
  });

  describe('Table Footer', () => {
    it('should style table footer', () => {
      expect(css).toContain('.table tfoot');
    });

    it('should use surface-container background for footer', () => {
      expect(css).toMatch(
        /\.table tfoot[\s\S]*?background-color:\s*var\(--color-surface-container\)/,
      );
    });

    it('should have 2px top border on footer', () => {
      expect(css).toMatch(
        /\.table tfoot td\s*\{[^}]*border-top:\s*2px solid var\(--color-outline\)/s,
      );
    });
  });

  describe('Zebra Striping', () => {
    it('should define .table-zebra class', () => {
      expect(css).toContain('.table-zebra');
    });

    it('should stripe even rows', () => {
      expect(css).toContain('.table-zebra tbody tr:nth-child(even)');
    });

    it('should use surface-container-low for striped rows', () => {
      expect(css).toMatch(
        /table-zebra[\s\S]*?background-color:\s*var\(--color-surface-container-low\)/,
      );
    });
  });

  describe('Hover Effect', () => {
    it('should define .table-hover class', () => {
      expect(css).toContain('.table-hover');
    });

    it('should have hover state on rows', () => {
      expect(css).toContain('.table-hover tbody tr:hover');
    });

    it('should use surface-container for hover background', () => {
      expect(css).toMatch(
        /table-hover tbody tr:hover[\s\S]*?background-color:\s*var\(--color-surface-container\)/,
      );
    });
  });

  describe('Bordered Table', () => {
    it('should define .table-bordered class', () => {
      expect(css).toContain('.table-bordered');
    });

    it('should have outer border', () => {
      expect(css).toMatch(
        /\.table-bordered\s*\{[^}]*border:\s*1px solid var\(--color-outline\)/s,
      );
    });

    it('should have border-radius', () => {
      expect(css).toMatch(
        /\.table-bordered\s*\{[^}]*border-radius:\s*var\(--radius-sm\)/s,
      );
    });

    it('should hide overflow for rounded corners', () => {
      expect(css).toMatch(
        /\.table-bordered\s*\{[^}]*overflow:\s*hidden/s,
      );
    });
  });

  describe('Density Variants', () => {
    it('should define .table-compact class', () => {
      expect(css).toContain('.table-compact');
    });

    it('should have smaller padding for compact', () => {
      expect(css).toMatch(
        /\.table-compact th[\s\S]*?padding:\s*0\.5rem 0\.75rem/,
      );
    });

    it('should define .table-comfortable class', () => {
      expect(css).toContain('.table-comfortable');
    });

    it('should have larger padding for comfortable', () => {
      expect(css).toMatch(
        /\.table-comfortable th[\s\S]*?padding:\s*1rem 1\.25rem/,
      );
    });
  });

  describe('Fixed Layout', () => {
    it('should define .table-fixed class', () => {
      expect(css).toContain('.table-fixed');
    });

    it('should set table-layout to fixed', () => {
      expect(css).toMatch(
        /\.table-fixed\s*\{[^}]*table-layout:\s*fixed/s,
      );
    });
  });

  describe('Sortable Headers', () => {
    it('should define .table-sortable class', () => {
      expect(css).toContain('.table-sortable');
    });

    it('should set cursor to pointer for sortable headers', () => {
      expect(css).toMatch(
        /\.table-sortable th\s*\{[^}]*cursor:\s*pointer/s,
      );
    });

    it('should prevent text selection', () => {
      expect(css).toMatch(
        /\.table-sortable th\s*\{[^}]*user-select:\s*none/s,
      );
    });

    it('should define .table-sort-asc class with arrow', () => {
      expect(css).toContain('.table-sort-asc');
      expect(css).toMatch(/table-sort-asc::after[\s\S]*?content:/);
    });

    it('should define .table-sort-desc class with arrow', () => {
      expect(css).toContain('.table-sort-desc');
      expect(css).toMatch(/table-sort-desc::after[\s\S]*?content:/);
    });
  });

  describe('Selected Row', () => {
    it('should define .table-row-selected class', () => {
      expect(css).toContain('.table-row-selected');
    });

    it('should use primary-container for selected row', () => {
      expect(css).toMatch(
        /table-row-selected[\s\S]*?background-color:\s*var\(--color-primary-container\)/,
      );
    });

    it('should use on-primary-container text for selected row', () => {
      expect(css).toMatch(
        /table-row-selected[\s\S]*?color:\s*var\(--color-on-primary-container\)/,
      );
    });
  });

  describe('Clickable Row', () => {
    it('should define .table-row-clickable class', () => {
      expect(css).toContain('.table-row-clickable');
    });

    it('should set cursor pointer for clickable rows', () => {
      expect(css).toMatch(/table-row-clickable[\s\S]*?cursor:\s*pointer/);
    });
  });

  describe('Responsive Table', () => {
    it('should define .table-responsive class', () => {
      expect(css).toContain('.table-responsive');
    });

    it('should allow horizontal scrolling', () => {
      expect(css).toMatch(
        /\.table-responsive\s*\{[^}]*overflow-x:\s*auto/s,
      );
    });
  });

  describe('Table Caption', () => {
    it('should define .table-caption class', () => {
      expect(css).toContain('.table-caption');
    });

    it('should position caption at bottom', () => {
      expect(css).toMatch(/caption-side:\s*bottom/);
    });
  });

  describe('Empty State', () => {
    it('should define .table-empty class', () => {
      expect(css).toContain('.table-empty');
    });

    it('should center empty state text', () => {
      expect(css).toMatch(
        /\.table-empty\s*\{[^}]*text-align:\s*center/s,
      );
    });
  });

  describe('Loading State', () => {
    it('should define .table-loading class', () => {
      expect(css).toContain('.table-loading');
    });

    it('should use ::after overlay for loading', () => {
      expect(css).toContain('.table-loading::after');
    });
  });

  describe('Pinned Columns', () => {
    it('should define .table-pin-left class', () => {
      expect(css).toContain('.table-pin-left');
    });

    it('should define .table-pin-right class', () => {
      expect(css).toContain('.table-pin-right');
    });

    it('should use sticky positioning for pinned columns', () => {
      expect(css).toMatch(
        /\.table-pin-left\s*\{[^}]*position:\s*sticky/s,
      );
      expect(css).toMatch(
        /\.table-pin-right\s*\{[^}]*position:\s*sticky/s,
      );
    });
  });

  describe('Focus State', () => {
    it('should define focus-visible styles for rows', () => {
      expect(css).toContain('.table tr:focus-visible');
    });

    it('should use primary color for focus outline', () => {
      expect(css).toMatch(
        /\.table tr:focus-visible[\s\S]*?outline:\s*2px solid var\(--color-primary\)/,
      );
    });
  });
});
