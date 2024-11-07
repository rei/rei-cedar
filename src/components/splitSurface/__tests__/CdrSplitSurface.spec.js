import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSplitSurface from '../CdrSplitSurface.vue';

describe('CdrSplitSurface', () => {
  it('default configuration', () => {
    const wrapper = shallowMount(CdrSplitSurface, {
      slots: {
        top: 'Top slot',
        bottom: 'Bottom slot'
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('changes surface orientation', () => {
    const wrapper = shallowMount(CdrSplitSurface, {
      slots: {
        top: 'Top slot',
        bottom: 'Bottom slot'
      }
    });
    wrapper.setProps({
      surface: 'top'
    })
    expect(wrapper.element).toMatchSnapshot();
  });
});
