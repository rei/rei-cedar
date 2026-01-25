import { getSurfaceProps, getDefaultLayout } from '../surface';
import type { CdrSurfaceProps } from '../../types/interfaces';

describe('surface utilities', () => {
  describe('getSurfaceProps', () => {
    it('generates data attributes for simple string values', () => {
      const props: CdrSurfaceProps = {
        background: 'primary',
        borderColor: 'secondary',
        tag: 'div',
      };

      const result = getSurfaceProps(props);

      expect(result).toEqual({
        'data-palette': undefined,
        'data-background': 'primary',
        'data-border-color': 'secondary',
      });
    });

    it('handles palette prop', () => {
      const props: CdrSurfaceProps = {
        palette: 'sandstone',
        background: 'primary',
        tag: 'div',
      };

      const result = getSurfaceProps(props);

      expect(result['data-palette']).toBe('sandstone');
    });

    it('generates state-based attributes', () => {
      const props: CdrSurfaceProps = {
        background: {
          rest: 'primary',
          hover: 'secondary',
        },
        tag: 'div',
      };

      const result = getSurfaceProps(props);

      expect(result).toEqual({
        'data-palette': undefined,
        'data-background': 'primary',
        'data-background-hover': 'secondary',
      });
    });

    it('handles multiple properties with states', () => {
      const props: CdrSurfaceProps = {
        background: {
          rest: 'primary',
          hover: 'secondary',
          active: 'brand',
        },
        borderColor: {
          rest: 'primary',
          hover: 'info',
        },
        tag: 'div',
      };

      const result = getSurfaceProps(props);

      expect(result).toMatchObject({
        'data-background': 'primary',
        'data-background-hover': 'secondary',
        'data-background-active': 'brand',
        'data-border-color': 'primary',
        'data-border-color-hover': 'info',
      });
    });

    it('handles all surface properties', () => {
      const props: CdrSurfaceProps = {
        background: 'primary',
        borderColor: 'secondary',
        borderStyle: 'solid',
        borderWidth: 'one-x',
        borderRadius: 'soft',
        boxShadow: 'raised',
        tag: 'div',
      };

      const result = getSurfaceProps(props);

      expect(result).toMatchObject({
        'data-background': 'primary',
        'data-border-color': 'secondary',
        'data-border-style': 'solid',
        'data-border-width': 'one-x',
        'data-border-radius': 'soft',
        'data-box-shadow': 'raised',
      });
    });

    it('converts camelCase to kebab-case for data attributes', () => {
      const props: CdrSurfaceProps = {
        borderColor: 'primary',
        borderRadius: 'soft',
        boxShadow: 'elevated',
        tag: 'div',
      };

      const result = getSurfaceProps(props);

      expect(result).toMatchObject({
        'data-border-color': 'primary',
        'data-border-radius': 'soft',
        'data-box-shadow': 'elevated',
      });
    });
  });

  describe('getDefaultLayout', () => {
    it('returns default layout configuration', () => {
      const result = getDefaultLayout();

      expect(result).toEqual({
        flow: 'column',
        gap: 'three-eighth-x',
      });
    });

    it('merges custom defaults', () => {
      const result = getDefaultLayout({
        gap: 'one-x',
        align: 'center',
      });

      expect(result).toEqual({
        flow: 'column',
        gap: 'one-x',
        align: 'center',
      });
    });

    it('allows overriding flow', () => {
      const result = getDefaultLayout({ flow: 'row' });

      expect(result).toEqual({
        flow: 'row',
        gap: 'three-eighth-x',
      });
    });

    it('handles empty defaults object', () => {
      const result = getDefaultLayout({});

      expect(result).toEqual({
        flow: 'column',
        gap: 'three-eighth-x',
      });
    });
  });
});
