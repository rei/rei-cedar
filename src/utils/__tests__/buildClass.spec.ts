import { modifyClassName, responsiveModifyClass, buildBooleanClass } from '../buildClass';

describe('buildClass utilities', () => {
  describe('modifyClassName', () => {
    it('creates BEM-style modifier classes', () => {
      expect(modifyClassName('cdr-button', 'primary')).toBe('cdr-button--primary');
      expect(modifyClassName('cdr-table', 'striped')).toBe('cdr-table--striped');
    });

    it('handles empty modifiers', () => {
      expect(modifyClassName('cdr-button', '')).toBe('cdr-button--');
    });
  });

  describe('responsiveModifyClass', () => {
    it('generates responsive classes from breakpoint string', () => {
      const result = responsiveModifyClass('cdr-table', 'full-width', '@sm @lg');
      expect(result).toBe('cdr-table--full-width@sm cdr-table--full-width@lg');
    });

    it('generates single class from boolean true', () => {
      const result = responsiveModifyClass('cdr-table', 'full-width', true);
      expect(result).toBe('cdr-table--full-width');
    });

    it('handles single breakpoint', () => {
      const result = responsiveModifyClass('cdr-grid', 'gutter', '@md');
      expect(result).toBe('cdr-grid--gutter@md');
    });

    it('handles multiple breakpoints with spaces', () => {
      const result = responsiveModifyClass('cdr-container', 'fluid', '@xs @sm @md @lg');
      expect(result).toBe(
        'cdr-container--fluid@xs cdr-container--fluid@sm cdr-container--fluid@md cdr-container--fluid@lg',
      );
    });
  });

  describe('buildBooleanClass', () => {
    it('returns modifier class when boolean is true', () => {
      const result = buildBooleanClass('cdr-grid', true, 'gutter');
      expect(result).toBe('cdr-grid--gutter');
    });

    it('returns empty string when boolean is false', () => {
      const result = buildBooleanClass('cdr-grid', false, 'gutter');
      expect(result).toBe('');
    });

    it('generates responsive classes from string prop', () => {
      const result = buildBooleanClass('cdr-grid', '@sm @md', 'gutter');
      expect(result).toBe('cdr-grid--gutter@sm cdr-grid--gutter@md');
    });

    it('handles all breakpoints', () => {
      const result = buildBooleanClass('cdr-layout', '@xs @sm @md @lg', 'stretch');
      expect(result).toBe(
        'cdr-layout--stretch@xs cdr-layout--stretch@sm cdr-layout--stretch@md cdr-layout--stretch@lg',
      );
    });
  });
});
