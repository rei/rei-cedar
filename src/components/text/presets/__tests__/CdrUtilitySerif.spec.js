import { mount } from '../../../../../test/vue-jest-style-workaround.js';
import CdrUtilitySerif from '../CdrUtilitySerif.vue';


describe('CdrUtilitySerif', () => {
  describe('default configuration', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrUtilitySerif, {
        slots: {
          default: 'paragraph'
        }
      });
    });
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('passing a scale', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrUtilitySerif, {
        props: { scale: '-1' },
        slots: {
          default: 'paragraph'
        }
      });
    });
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('setting to strong variant', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrUtilitySerif, {
        props: { strong: true },
        slots: {
          default: 'paragraph'
        }
      });
    });
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

});
