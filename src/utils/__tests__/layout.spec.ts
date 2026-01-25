import { getStructureStyles } from '../layout';
import type { Layout } from '../../types/interfaces';

describe('getStructureStyles', () => {
  describe('string structure', () => {
    it('generates CSS variable for string value', () => {
      const props: Layout = { columns: '100px 200px 1fr' };
      const result = getStructureStyles({ props, structure: 'columns' });

      expect(result).toEqual({
        '--cdr-layout-columns': '100px 200px 1fr',
      });
    });

    it('handles rows with string value', () => {
      const props: Layout = { rows: '50px auto' };
      const result = getStructureStyles({ props, structure: 'rows' });

      expect(result).toEqual({
        '--cdr-layout-rows': '50px auto',
      });
    });
  });

  describe('number structure', () => {
    it('generates equal fractional units for number value', () => {
      const props: Layout = { columns: 3 };
      const result = getStructureStyles({ props, structure: 'columns' });

      expect(result).toEqual({
        '--cdr-layout-columns': '1fr 1fr 1fr',
      });
    });

    it('handles single column', () => {
      const props: Layout = { columns: 1 };
      const result = getStructureStyles({ props, structure: 'columns' });

      expect(result).toEqual({
        '--cdr-layout-columns': '1fr',
      });
    });
  });

  describe('array structure', () => {
    it('converts array with mixed types', () => {
      const props: Layout = { columns: ['200px', 1, 2] };
      const result = getStructureStyles({ props, structure: 'columns' });

      expect(result).toEqual({
        '--cdr-layout-columns': '200px 1fr 2fr',
      });
    });

    it('handles all numbers in array', () => {
      const props: Layout = { columns: [1, 2, 1] };
      const result = getStructureStyles({ props, structure: 'columns' });

      expect(result).toEqual({
        '--cdr-layout-columns': '1fr 2fr 1fr',
      });
    });

    it('handles all strings in array', () => {
      const props: Layout = { columns: ['100px', '200px', 'auto'] };
      const result = getStructureStyles({ props, structure: 'columns' });

      expect(result).toEqual({
        '--cdr-layout-columns': '100px 200px auto',
      });
    });
  });

  describe('responsive object structure', () => {
    it('generates breakpoint-specific CSS variables', () => {
      const props: Layout = {
        columns: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        },
      };
      const result = getStructureStyles({ props, structure: 'columns' });

      expect(result).toEqual({
        '--cdr-layout-columns-xs': '1fr',
        '--cdr-layout-columns-sm': '1fr 1fr',
        '--cdr-layout-columns-md': '1fr 1fr 1fr',
        '--cdr-layout-columns-lg': '1fr 1fr 1fr 1fr',
      });
    });

    it('handles mixed responsive values', () => {
      const props: Layout = {
        columns: {
          xs: 1,
          sm: ['200px', 1],
          md: '100px 1fr 1fr',
          lg: 4,
        },
      };
      const result = getStructureStyles({ props, structure: 'columns' });

      expect(result).toEqual({
        '--cdr-layout-columns-xs': '1fr',
        '--cdr-layout-columns-sm': '200px 1fr',
        '--cdr-layout-columns-md': '100px 1fr 1fr',
        '--cdr-layout-columns-lg': '1fr 1fr 1fr 1fr',
      });
    });
  });

  describe('breakpoint-specific calls', () => {
    it('generates styles for specific breakpoint', () => {
      const props: Layout = {
        columns: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        },
      };
      const result = getStructureStyles({ props, structure: 'columns', breakpoint: 'md' });

      expect(result).toEqual({
        '--cdr-layout-columns-md': '1fr 1fr 1fr',
      });
    });
  });

  describe('edge cases', () => {
    it('returns empty object when structure is undefined', () => {
      const props: Layout = {};
      const result = getStructureStyles({ props, structure: 'columns' });

      expect(result).toEqual({});
    });

    it('merges with existing styles', () => {
      const props: Layout = { columns: 2 };
      const existingStyles = { '--custom-var': 'value' };
      const result = getStructureStyles({
        props,
        styles: existingStyles,
        structure: 'columns',
      });

      expect(result).toEqual({
        '--custom-var': 'value',
        '--cdr-layout-columns': '1fr 1fr',
      });
    });
  });
});
