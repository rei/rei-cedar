import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrToggleSwitch from '../CdrToggleSwitch.vue';

describe('CdrToggleSwitch', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrToggleSwitch);
    expect(wrapper.element).toMatchSnapshot();
  });
});
