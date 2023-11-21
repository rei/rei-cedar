import { mount } from '../../../../../test/vue-jest-style-workaround.js';
import PresetHeadingDisplay from '../PresetHeadingDisplay.vue';


describe('PresetHeadingDisplay', () => {
  describe('default configuration', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(PresetHeadingDisplay, {
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
      wrapper = mount(PresetHeadingDisplay, {
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
