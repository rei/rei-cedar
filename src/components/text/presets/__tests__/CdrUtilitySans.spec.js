import { mount } from '../../../../../test/vue-jest-style-workaround.js';
import CdrUtilitySans from '../CdrUtilitySans.vue';


describe('CdrUtilitySans', () => {
  describe('default configuration', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrUtilitySans, {
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
      wrapper = mount(CdrUtilitySans, {
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
      wrapper = mount(CdrUtilitySans, {
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
