import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSurface from '../CdrSurface.vue';

describe('CdrSurface', () => {
  it('default snapshot', () => {
    const wrapper = mount(CdrSurface);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('sets the default tag prop correctly', () => {
    const wrapper = mount(CdrSurface, { props: { tag: 'span' } });
    expect(wrapper.element.tagName).toBe('SPAN');
  });

  it('base classes only', () => {
    const wrapper = mount(CdrSurface, { props: { tag: 'span' } });
    expect(wrapper.classes()).toEqual(['cdr-surface']);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('shows default slot', () => {
    const wrapper = mount(CdrSurface, { slots: { default: 'Default slot' } });
    expect(wrapper.find('.cdr-surface').text()).toBe('Default slot');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies background property', () => {
    const wrapper = mount(CdrSurface, { props: { background: 'primary' } });
    expect(wrapper.attributes('data-background')).toBe('primary');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies border color property', () => {
    const wrapper = mount(CdrSurface, { props: { borderColor: 'primary' } });
    expect(wrapper.attributes('data-border-color')).toBe('primary');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies border width property', () => {
    const wrapper = mount(CdrSurface, { props: { borderWidth: 'one-x' } });
    expect(wrapper.attributes('data-border-width')).toBe('one-x');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies border style property', () => {
    const wrapper = mount(CdrSurface, { props: { borderStyle: 'solid' } });
    expect(wrapper.attributes('data-border-style')).toBe('solid');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies radius property', () => {
    const wrapper = mount(CdrSurface, { props: { borderRadius: 'soft' } });
    expect(wrapper.attributes('data-border-radius')).toBe('soft');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies box shadow property', () => {
    const wrapper = mount(CdrSurface, { props: { boxShadow: 'raised' } });
    expect(wrapper.attributes('data-box-shadow')).toBe('raised');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies multiple properties', () => {
    const wrapper = mount(CdrSurface, {
      props: {
        background: 'secondary',
        borderColor: 'primary',
        borderWidth: 'one-x',
        borderStyle: 'solid',
        borderRadius: 'soft',
        boxShadow: 'raised'
      }
    });
    expect(wrapper.attributes('data-background')).toBe('secondary');
    expect(wrapper.attributes('data-border-color')).toBe('primary');
    expect(wrapper.attributes('data-border-width')).toBe('one-x');
    expect(wrapper.attributes('data-border-style')).toBe('solid');
    expect(wrapper.attributes('data-border-radius')).toBe('soft');
    expect(wrapper.attributes('data-box-shadow')).toBe('raised');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies state-specific properties', () => {
    const wrapper = mount(CdrSurface, {
      props: {
        background: {
          rest: 'primary',
          hover: 'secondary'
        }
      }
    });
    expect(wrapper.attributes('data-background')).toBe('primary');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies loading state', () => {
    const wrapper = mount(CdrSurface, { 
      attrs: { 'data-loading': 'true' }
    });
    expect(wrapper.attributes('data-loading')).toBe('true');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies palette property', () => {
    const wrapper = mount(CdrSurface, { 
      props: { 
        palette: 'membership-subtle',
        background: 'primary'
      } 
    });
    expect(wrapper.attributes('data-palette')).toBe('membership-subtle');
    expect(wrapper.attributes('data-background')).toBe('primary');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies background image properties via style attribute', () => {
    const wrapper = mount(CdrSurface, {
      props: {
        backgroundImage: 'path/to/image.jpg',
        backgroundSize: 'contain',
        backgroundPosition: 'top left',
      }
    });
    const style = wrapper.attributes('style');
    expect(style).toContain('--cdr-surface-background-image: url(path/to/image.jpg);');
    expect(style).toContain('--cdr-surface-background-size: contain;');
    expect(style).toContain('--cdr-surface-background-position: top left;');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies background image with default size and position', () => {
    const wrapper = mount(CdrSurface, {
      props: {
        backgroundImage: 'path/to/another.png',
      }
    });
    const style = wrapper.attributes('style');
    expect(style).toContain('--cdr-surface-background-image: url(path/to/another.png);');
    expect(style).toContain('--cdr-surface-background-size: cover;'); // Default
    expect(style).toContain('--cdr-surface-background-position: center;'); // Default
    expect(wrapper.element).toMatchSnapshot();
  });

  it('does not apply background image styles if prop is not provided', () => {
    const wrapper = mount(CdrSurface);
    const style = wrapper.attributes('style');
    // Expect style attribute to be undefined or not contain the background image variables
    expect(style === undefined || !style.includes('--cdr-surface-background-image')).toBe(true);
    expect(wrapper.element).toMatchSnapshot(); // Should match default snapshot
  });
});