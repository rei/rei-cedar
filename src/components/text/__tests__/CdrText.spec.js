import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrText from '../CdrText.vue';


describe('CdrText', () => {
  describe('default configuration', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrText, {
        slots: {
          default: 'paragraph'
        }
      });
    })
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  })

  describe('with h1 set', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrText, {
        propsData: {
          tag: 'h1',
        },
        slots: {
          default: 'header'
        }
      });
    })
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  })
});
