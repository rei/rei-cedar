import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSurfaceSelectionLayout from '../CdrSurfaceSelectionLayout.vue';

describe('CdrSurfaceSelectionLayout', () => {
  describe('snapshot test', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSurfaceSelectionLayout, { props: { orientation: 'horizontal' } });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('orientation test', () => {
    it('shows horizontal', () => {
      const wrapper = mount(CdrSurfaceSelectionLayout, { props: { orientation: 'horizontal' } });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.classes()).toEqual([
        'cdr-surface-selection-layout',
        'cdr-surface-selection-layout--horizontal',
      ]);
    });

    it('shows vertical', () => {
      const wrapper = mount(CdrSurfaceSelectionLayout, { props: { orientation: 'vertical' } });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.classes()).toEqual([
        'cdr-surface-selection-layout',
        'cdr-surface-selection-layout--vertical',
      ]);
    });
  });
});
