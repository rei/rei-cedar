import { mount } from '../../../../../test/vue-jest-style-workaround.js';
import CdrHeadingDisplay from '../CdrHeadingDisplay.vue';


describe('CdrHeadingDisplay', () => {
  describe('default configuration', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrHeadingDisplay, {
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
      wrapper = mount(CdrHeadingDisplay, {
        props: { scale: '4' },
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
