import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSwitch from '../CdrSwitch.vue';

describe('CdrSwitch', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrSwitch);
    expect(wrapper.element).toMatchSnapshot();
  });
});
