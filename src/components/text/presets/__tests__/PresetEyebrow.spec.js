import { mount } from '../../../../../test/vue-jest-style-workaround.js';
import PresetEyebrow from '../PresetEyebrow.vue';


describe('PresetEyebrow', () => {
  describe('default configuration', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(PresetEyebrow, {
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
