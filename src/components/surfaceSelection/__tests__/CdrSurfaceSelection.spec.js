import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSurfaceSelection from '../CdrSurfaceSelection.vue';

describe('CdrSurfaceSelection', () => {
  describe('snapshot test', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSurfaceSelection, { props: { checked: false } });
    });
    it('renders correctly', () => {
      wrapper.setProps({
        checked: true,
        modifier: 'primary',
        radius: 'soft',
        withBorder: true,
        borderWidth: 'one-x',
        p: 'three-x',
        m: 'one-x',
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('component unit tests', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSurfaceSelection, { props: { checked: false } });
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
          'cdr-surface-selection--modifier-primary',
        ]);
      });
    });

    describe('aria attribute correct when checked', () => {
      beforeEach(() => {
        wrapper.setProps({ checked: true });
      });
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('renders aria checked', () => {
        expect(wrapper.attributes('aria-checked')).toBe('true');
      });
    });

    describe('aria attribute correct when not checked', () => {
      beforeEach(() => {
        wrapper.setProps({ checked: false });
      });
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('renders aria not checked', () => {
        expect(wrapper.attributes('aria-checked')).toBe('false');
      });
    });

    describe('correct class with secondary modifier', () => {
      beforeEach(() => {
        wrapper.setProps({ modifier: 'secondary' });
      });
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('correct classes', () => {
        expect(wrapper.classes()).toEqual([
          'cdr-surface-selection',
          'cdr-surface-selection--modifier-secondary',
        ]);
      });
    });
  });
});
