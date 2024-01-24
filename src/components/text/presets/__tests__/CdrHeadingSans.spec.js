import { mount } from '../../../../../test/vue-jest-style-workaround.js';
import CdrHeadingSans from '../CdrHeadingSans.vue';


describe('CdrHeadingSans', () => {
  describe('default configuration', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrHeadingSans, {
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
      wrapper = mount(CdrHeadingSans, {
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

});
