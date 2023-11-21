import { mount } from '../../../../../test/vue-jest-style-workaround.js';
import PresetUtilitySerif from '../PresetUtilitySerif.vue';


describe('PresetUtilitySerif', () => {
  describe('default configuration', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(PresetUtilitySerif, {
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
      wrapper = mount(PresetUtilitySerif, {
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
      wrapper = mount(PresetUtilitySerif, {
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
