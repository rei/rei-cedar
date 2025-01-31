import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSurfaceNavigation from '../CdrSurfaceNavigation.vue';
import CdrSurfaceNavigationLink from '../CdrSurfaceNavigationLink.vue';

describe('CdrSurface', () => {
  describe('snapshot test', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSurfaceNavigation);
    });
    it('renders correctly', () => {
      wrapper.setProps({ palette: 'default' });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('component unit tests', () => {
    let wrapper;
    let link;
    beforeEach(() => {
      wrapper = mount(CdrSurfaceNavigation);
      link = mount(CdrSurfaceNavigationLink);
    });

    describe('default component with no configuration', () => {
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('sets the default tag prop correctly', () => {
        expect(wrapper.element.tagName).toBe('DIV');
        expect(link.element.tagName).toBe('A');
      });
      it('default class added', () => {
        expect(wrapper.classes()).toEqual([
          'cdr-surface-navigation',
          'cdr-surface-navigation-radius-sharp--rest',
          'cdr-surface-navigation-shadow-flat--rest',
        ]);
      });
    });

    it('has data-palette attribute set to "default" by default', () => {
      expect(wrapper.attributes('data-palette')).toBe('default');
    });
    
  });
});
