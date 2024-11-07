import { mount } from '../../../../../test/vue-jest-style-workaround.js';
import CdrBody from '../CdrBody.vue';


describe('CdrBody', () => {
  describe('default configuration', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrBody, {
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
      wrapper = mount(CdrBody, {
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

  describe('setting to strong variant', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrBody, {
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
