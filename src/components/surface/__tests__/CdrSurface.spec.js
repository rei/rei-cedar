import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSurface from '../CdrSurface.vue';

describe('CdrSurface', () => {
  describe('snapshot test', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSurface);
    });
    it('renders correctly', () => {
      wrapper.setProps({
        modifier: 'primary',
        radius: 'soft',
        withBorder: true,
        borderWidth: 'one-x',
        palette: 'default',
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('component unit tests', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSurface);
    });

    describe('default component with no configuration', () => {
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('sets the default tag prop correctly', () => {
        expect(wrapper.element.tagName).toBe('DIV');
      });
      it('default class added', () => {
        expect(wrapper.classes()).toEqual([
          'cdr-surface',
          'cdr-surface--modifier-default',
          'cdr-surface--background-primary',
          'cdr-surface--radius-sharp',
          'cdr-surface--shadow-flat',
        ]);
      });
    });

    describe('when "tag" is set to "a"', () => {
      beforeEach(() => {
        wrapper.setProps({ tag: 'a' });
      });
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('renders a link', () => {
        expect(wrapper.element.tagName).toBe('A');
      });
    });

    it('has data-palette attribute set to "default" by default', () => {
      expect(wrapper.attributes('data-palette')).toBe('default');
    });
    
  });
});
