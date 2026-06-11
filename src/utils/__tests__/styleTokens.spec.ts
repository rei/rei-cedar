import { breakpoints, spacing, getSpaceValue } from '../styleTokens';

describe('style token utilities', () => {
  describe('breakpoints', () => {
    it('contains all Cedar breakpoints in order', () => {
      expect(breakpoints).toEqual(['xs', 'sm', 'md', 'lg']);
    });

    it('is an array', () => {
      expect(Array.isArray(breakpoints)).toBe(true);
    });

    it('has correct length', () => {
      expect(breakpoints).toHaveLength(4);
    });
  });

  describe('spacing', () => {
    it('contains fixed spacing tokens', () => {
      expect(spacing['zero']).toBeDefined();
      expect(spacing['one-x']).toBeDefined();
      expect(spacing['two-x']).toBeDefined();
      expect(spacing['half-x']).toBeDefined();
    });

    it('contains scale tokens', () => {
      expect(spacing['scale-0']).toBe('var(--cdr-space-scale-0)');
      expect(spacing['scale-1']).toBe('var(--cdr-space-scale-1)');
      expect(spacing['scale-8']).toBe('var(--cdr-space-scale-8)');
    });

    it('contains compound scale tokens', () => {
      expect(spacing['scale-0--1']).toBe('var(--cdr-space-scale-0-1)');
      expect(spacing['scale-3--4']).toBe('var(--cdr-space-scale-3-4)');
      expect(spacing['scale-3--5']).toBe('var(--cdr-space-scale-3-5)');
    });

    it('fixed spacing values end with px', () => {
      expect(spacing['one-x']).toMatch(/px$/);
      expect(spacing['half-x']).toMatch(/px$/);
    });

    it('scale values use CSS variables', () => {
      expect(spacing['scale-0']).toMatch(/^var\(--cdr-space-scale-/);
      expect(spacing['scale-5']).toMatch(/^var\(--cdr-space-scale-/);
    });

    it('contains simplified aliases for fluid spacing', () => {
      expect(spacing['4']).toBe('var(--cdr-space-scale-4)');
      expect(spacing['1']).toBe('var(--cdr-space-scale-1)');
    });

    it('contains simplified aliases for scale spacing', () => {
      expect(spacing['3--5']).toBe('var(--cdr-space-scale-3-5)');
      expect(spacing['0--1']).toBe('var(--cdr-space-scale-0-1)');
    });
  });

  describe('getSpaceValue', () => {
    it('normalizes simplified fluid spacing to CSS variables', () => {
      expect(getSpaceValue('4')).toBe('var(--cdr-space-scale-4)');
      expect(getSpaceValue('1')).toBe('var(--cdr-space-scale-1)');
    });

    it('normalizes simplified scale spacing to CSS variables', () => {
      expect(getSpaceValue('3--5')).toBe('var(--cdr-space-scale-3-5)');
      expect(getSpaceValue('0--1')).toBe('var(--cdr-space-scale-0-1)');
    });

    it('handles verbose format correctly', () => {
      expect(getSpaceValue('scale-4')).toBe('var(--cdr-space-scale-4)');
      expect(getSpaceValue('scale-3--5')).toBe('var(--cdr-space-scale-3-5)');
    });

    it('handles fixed spacing correctly', () => {
      expect(getSpaceValue('one-x')).toBe('16px');
      expect(getSpaceValue('half-x')).toBe('8px');
    });

    it('falls back to string conversion for unknown values', () => {
      expect(getSpaceValue('unknown')).toBe('unknown');
      expect(getSpaceValue('123')).toBe('123');
    });

    it('handles numeric input', () => {
      expect(getSpaceValue(4)).toBe('var(--cdr-space-scale-4)');
      expect(getSpaceValue(123)).toBe('123');
    });
  });
});
