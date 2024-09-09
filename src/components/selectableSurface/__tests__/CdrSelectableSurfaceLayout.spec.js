import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSelectableSurfaceLayout from '../CdrSelectableSurfaceLayout.vue';

describe('CdrSelectableSurfaceLayout', () => {
  describe('snapshot test', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSelectableSurfaceLayout, { props: { orientation: 'horizontal' } });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('orientation test', () => {
    it('shows horizontal', () => {
      const wrapper = mount(CdrSelectableSurfaceLayout, { props: { orientation: 'horizontal' } });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.classes()).toEqual([
        'cdr-surface-selection-layout',
        'cdr-surface-selection-layout--horizontal',
      ]);
    });

    it('shows vertical', () => {
      const wrapper = mount(CdrSelectableSurfaceLayout, { props: { orientation: 'vertical' } });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.classes()).toEqual([
        'cdr-surface-selection-layout',
        'cdr-surface-selection-layout--vertical',
      ]);
    });
  });
});
