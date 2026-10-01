import { describe, expect, it } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const source = (name: string) => readFileSync(join(import.meta.dir, '../../src/components', `${name}.css`), 'utf8');

describe('Data Display contracts', () => {
  it('ships historical documented composition modifiers', () => {
    for (const [name, classes] of [
      ['avatar', ['avatar-image','avatar-icon','avatar-circle','avatar-bordered','avatar-clickable','avatar-group-dense','avatar-overflow','avatar-group-xs','avatar-group-xl']],
      ['badge', ['badge-filled','badge-md','badge-notification','badge-removable']],
      ['card', ['card-lowest','card-low','card-default','card-high','card-highest','card-filled','card-outlined','card-subtitle','card-comfortable']],
      ['list', ['list-item-text','list-item-secondary','list-item-leading','list-item-trailing','list-item-two-line','list-item-three-line','list-item-interactive','list-item-active-primary','list-item-active-secondary','list-item-active-tertiary','list-comfortable','list-nested','list-surface-container','list-surface-container-low','list-surface-container-high']],
      ['table', ['table-checkbox','table-sort-icon','table-numeric','table-center','table-actions']],
      ['timeline', ['timeline-marker-secondary','timeline-marker-tertiary','timeline-marker-success','timeline-marker-error','timeline-item-active','timeline-item-pending','timeline-compact','timeline-content-card']],
      ['accordion', ['accordion-outlined','accordion-comfortable','accordion-secondary','accordion-tertiary','accordion-header-icon','accordion-header-icon-leading','accordion-item-disabled','accordion-no-animation']],
    ] as const) {
      for(const cls of classes) expect(source(name)).toContain(`.${cls}`);
    }
  });
  it('scopes disclosure state to the owning panel and respects native state', () => {
    for (const name of ['accordion', 'collapse']) {
      const css = source(name);
      expect(css).toContain('details');
      expect(css).toContain('[open]');
      expect(css).toContain('[hidden]');
      expect(css).not.toMatch(/\.(?:accordion-item\.open|collapse-open|collapse\.show) \.(?:accordion-content|collapse-content)/);
    }
  });
  it('ships documented avatar status names without clipping the indicator', () => {
    const css = source('avatar');
    expect(css).toContain('.avatar-status-online::after');
    expect(css).toContain('.avatar-status-offline::after');
    expect(css).toMatch(/\.avatar\s*\{[^}]*overflow:\s*visible/s);
  });
  it('uses curved logical Chat tails instead of triangular corner flags', () => {
    const css = source('chat');
    expect(css).toContain('border-start-start-radius');
    expect(css).toContain('radial-gradient');
    expect(css).not.toContain('clip-path: polygon(0 0, 100% 0, 100% 100%)');
  });
  it('provides explicit changed-value Countdown animation with motion fallback', () => {
    const css = source('countdown');
    expect(css).toContain('countdown-tick');
    expect(css).toContain('countdown-animated');
    expect(css).toContain('prefers-reduced-motion: no-preference');
  });
  it('preserves directional Timeline entrypoints', () => {
    const css=source('timeline');
    expect(css).toContain('.timeline-right::before');
    expect(css).not.toContain('.timeline-inset-inline-end');
    expect(css).toContain('.timeline-alternate:dir(rtl) .timeline-marker');
  });
});
