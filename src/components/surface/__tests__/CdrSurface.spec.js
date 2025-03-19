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
});