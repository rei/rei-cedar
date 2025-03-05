import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSurfaceNavigation from '../CdrSurfaceNavigation.vue';

describe('CdrSurfaceNavigation', () => {
  it('default snapshot', () => {
    const wrapper = mount(CdrSurfaceNavigation);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('sets the default tag prop correctly', () => {
    const wrapper = mount(CdrSurfaceNavigation, { props: { tag: 'span' } });
    expect(wrapper.element.tagName).toBe('SPAN');
  });

  it('base classes only', () => {
    const wrapper = mount(CdrSurfaceNavigation);
    expect(wrapper.classes()).toEqual(['cdr-surface', 'cdr-surface-navigation']);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('shows default slot', () => {
    const wrapper = mount(CdrSurfaceNavigation, { slots: { default: 'Default slot' } });
    expect(wrapper.text()).toBe('Default slot');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies surface props', () => {
    const wrapper = mount(CdrSurfaceNavigation, {
      props: {
        background: {
          rest: 'primary',
          hover: 'secondary'
        },
        borderColor: {
          rest: 'primary'
        },
        borderStyle: {
          rest: 'solid'
        },
        borderWidth: {
          rest: 'sixteenth-x'
        },
        boxShadow: {
          rest: 'flat',
          hover: 'elevated'
        }
      }
    });
    expect(wrapper.attributes('data-background')).toBe('primary');
    expect(wrapper.attributes('data-border-color')).toBe('primary');
    expect(wrapper.attributes('data-border-style')).toBe('solid');
    expect(wrapper.attributes('data-border-width')).toBe('sixteenth-x');
    expect(wrapper.attributes('data-box-shadow')).toBe('flat');
    expect(wrapper.element).toMatchSnapshot();
  });
});