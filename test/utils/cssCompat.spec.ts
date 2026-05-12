import { COMPAT_ENTRIES } from '../../utils/cssCompat';
import { loadCompatMatrix } from '../../utils/cssCompat.server';

describe('cssCompat data', () => {
  it('has unique feature ids', () => {
    const ids = COMPAT_ENTRIES.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has a non-empty summary for every entry', () => {
    for (const entry of COMPAT_ENTRIES) {
      expect(entry.summary.length).toBeGreaterThan(5);
    }
  });

  it('uses valid support tokens on every cell', () => {
    const valid = new Set(['yes', 'partial', 'no']);
    for (const entry of COMPAT_ENTRIES) {
      expect(valid.has(entry.nativeV6)).toBe(true);
      expect(valid.has(entry.nativeV7)).toBe(true);
    }
  });

  it('uses valid categories on every entry', () => {
    const valid = new Set([
      'selectors',
      'at-rules',
      'functions',
      'units',
      'colors',
      'layout',
      'animation',
      'props',
      'other',
    ]);
    for (const entry of COMPAT_ENTRIES) {
      expect(valid.has(entry.category)).toBe(true);
    }
  });

  it('every entry that names a caniuseId resolves against caniuse-lite', () => {
    // Mirror loadCompatMatrix's enrichment logic — if any id is bad, the page
    // would silently lose its browser chips.

    const caniuse: typeof import('caniuse-lite') = require('caniuse-lite');
    for (const entry of COMPAT_ENTRIES) {
      if (!entry.caniuseId) continue;
      expect(caniuse.features[entry.caniuseId]).toBeDefined();
    }
  });
});

describe('loadCompatMatrix', () => {
  it('returns one merged entry per source entry', () => {
    const merged = loadCompatMatrix();
    expect(merged).toHaveLength(COMPAT_ENTRIES.length);
  });

  it('joins caniuse-lite browser minimums when a caniuseId is set', () => {
    const merged = loadCompatMatrix();
    const nesting = merged.find(e => e.id === 'nesting');
    expect(nesting?.browserMins).toBeDefined();
    expect(nesting?.browserMins?.chrome).toMatch(/^\d/);
    expect(nesting?.browserMins?.safari).toMatch(/^\d/);
  });

  it('leaves browserMins undefined when no caniuseId is given', () => {
    const merged = loadCompatMatrix();
    const colorMix = merged.find(e => e.id === 'color-mix');
    expect(colorMix?.browserMins).toBeUndefined();
  });
});
