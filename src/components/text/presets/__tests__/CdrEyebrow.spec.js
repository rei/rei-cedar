import { mount } from '../../../../../test/vue-jest-style-workaround.js';
import CdrEyebrow from '../CdrEyebrow.vue';


describe('CdrEyebrow', () => {
  describe('default configuration', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrEyebrow, {
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
