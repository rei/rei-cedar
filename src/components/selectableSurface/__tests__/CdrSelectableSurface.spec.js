import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSelectableSurface from '../CdrSelectableSurface.vue';

describe('CdrSelectableSurface', () => {
  describe('snapshot test', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSelectableSurface, { props: { checked: false } });
    });
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('component unit tests', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSelectableSurface, { props: { checked: false } });
    });

    describe('default component with no configuration', () => {
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('sets the default tag prop correctly', () => {
        expect(wrapper.element.tagName).toBe('BUTTON');
      });
      it('base classes only', () => {
        expect(wrapper.classes()).toEqual([
          'cdr-surface-selection',
          'cdr-surface-selection--modifier-default',
        ]);
      });
    });
  });

  it('shows default', () => {
    const wrapper = mount(CdrSelectableSurface, {
      props: { checked: false },
      slots: { default: 'Default slot' },
    });
    expect(wrapper.find('.cdr-surface-selection').text()).toBe('Default slot');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('is loading', () => {
    const wrapper = mount(CdrSelectableSurface, {
      props: { checked: false, loading: true },
      slots: { default: 'Default slot' },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.cdr-surface-selection').attributes('data-loading')).toBe('true');
  });

  it('is not loading', () => {
    const wrapper = mount(CdrSelectableSurface, {
      props: { checked: false, loading: false },
      slots: { default: 'Default slot' },
    });
    expect(wrapper.find('.cdr-surface-selection').attributes('data-loading')).toBe(undefined);
  });

  it('is checked', () => {
    const wrapper = mount(CdrSelectableSurface, {
      props: { checked: true },
      slots: { default: 'Default slot' },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.cdr-surface-selection').attributes('aria-checked')).toBe('true');
  });
});
