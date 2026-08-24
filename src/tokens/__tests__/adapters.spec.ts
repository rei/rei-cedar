import { typeScaleCssSuffix } from '../adapters';

describe('token adapters', () => {
  describe('typeScaleCssSuffix', () => {
    it('maps dashed Cedar type scale values to CSS custom property suffixes', () => {
      expect(typeScaleCssSuffix('scale-minus-2')).toBe('minus-2');
      expect(typeScaleCssSuffix('scale-0')).toBe('0');
      expect(typeScaleCssSuffix('scale-7')).toBe('7');
    });
  });
});
