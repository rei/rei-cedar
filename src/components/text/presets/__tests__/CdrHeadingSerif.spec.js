import { mount } from '../../../../../test/vue-jest-style-workaround.js';
import CdrHeadingSerif from '../CdrHeadingSerif.vue';


describe('CdrHeadingSerif', () => {
  describe('default configuration', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrHeadingSerif, {
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
      wrapper = mount(CdrHeadingSerif, {
        props: { scale: '1' },
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
      wrapper = mount(CdrHeadingSerif, {
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
