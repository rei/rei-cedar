import { capitalize, breakpoints, spacing } from '../other';

describe('other utilities', () => {
  describe('capitalize', () => {
    it('capitalizes first letter of string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    it('handles already capitalized strings', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('only capitalizes first letter', () => {
      expect(capitalize('hello world')).toBe('Hello world');
    });
  });

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
      expect(spacing['scale-0--1']).toBe('var(--cdr-space-scale-0--1)');
      expect(spacing['scale-3--4']).toBe('var(--cdr-space-scale-3--4)');
      expect(spacing['scale-3--5']).toBe('var(--cdr-space-scale-3--5)');
    });

    it('fixed spacing values end with px', () => {
      expect(spacing['one-x']).toMatch(/px$/);
      expect(spacing['half-x']).toMatch(/px$/);
    });

    it('scale values use CSS variables', () => {
      expect(spacing['scale-0']).toMatch(/^var\(--cdr-space-scale-/);
      expect(spacing['scale-5']).toMatch(/^var\(--cdr-space-scale-/);
    });
  });
});
