import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSurfaceSelection from '../CdrSurfaceSelection.vue';

describe('CdrSurfaceSelection', () => {
  it('default snapshot', () => {
    const wrapper = mount(CdrSurfaceSelection);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('sets the default tag prop correctly', () => {
    const wrapper = mount(CdrSurfaceSelection, { props: { tag: 'span' } });
    expect(wrapper.element.tagName).toBe('SPAN');
  });

  it('base classes only', () => {
    const wrapper = mount(CdrSurfaceSelection);
    expect(wrapper.classes()).toEqual(['cdr-surface', 'cdr-surface-selection']);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('shows default slot', () => {
    const wrapper = mount(CdrSurfaceSelection, { slots: { default: 'Default slot' } });
    expect(wrapper.find('.cdr-surface-selection__layout').text()).toBe('Default slot');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('shows custom loading slot', () => {
    const wrapper = mount(CdrSurfaceSelection, {
      props: { loading: true },
      slots: { loading: 'Custom loading' }
    });
    expect(wrapper.find('.cdr-surface-selection__loading').text()).toBe('Custom loading');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies checked state', () => {
    const wrapper = mount(CdrSurfaceSelection, { props: { checked: true } });
    expect(wrapper.attributes('aria-checked')).toBe('true');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies disabled state', () => {
    const wrapper = mount(CdrSurfaceSelection, { props: { disabled: true } });
    expect(wrapper.attributes('aria-disabled')).toBe('true');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies loading state', () => {
    const wrapper = mount(CdrSurfaceSelection, { props: { loading: true } });
    expect(wrapper.attributes('data-loading')).toBe('true');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies custom layout props', () => {
    const wrapper = mount(CdrSurfaceSelection, {
      props: {
        layout: {
          columns: ['auto', 1],
          gap: 'one-x'
        }
      }
    });
    const layout = wrapper.find('.cdr-surface-selection__layout');
    expect(layout.classes()).toContain('cdr-layout--columns');
    expect(layout.classes()).toContain('cdr-layout--gap-one-x');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies multiple states', () => {
    const wrapper = mount(CdrSurfaceSelection, {
      props: {
        checked: true,
        disabled: true,
        loading: true,
      }
    });
    expect(wrapper.attributes('aria-checked')).toBe('true');
    expect(wrapper.attributes('aria-disabled')).toBe('true');
    expect(wrapper.attributes('data-loading')).toBe('true');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies surface props', () => {
    const wrapper = mount(CdrSurfaceSelection, {
      props: {
        background: 'primary',
        borderColor: 'primary',
        borderWidth: 'one-x',
        borderStyle: 'solid',
        boxShadow: 'raised'
      }
    });
    expect(wrapper.attributes('data-background')).toBe('primary');
    expect(wrapper.attributes('data-border-color')).toBe('primary');
    expect(wrapper.attributes('data-border-width')).toBe('one-x');
    expect(wrapper.attributes('data-border-style')).toBe('solid');
    expect(wrapper.attributes('data-box-shadow')).toBe('raised');
    expect(wrapper.element).toMatchSnapshot();
  });
});