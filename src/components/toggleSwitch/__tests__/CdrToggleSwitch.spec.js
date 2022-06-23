import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrToggleSwitch from 'componentdir/toggleSwitch/CdrToggleSwitch';

describe('CdrToggleSwitch', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrToggleSwitch);
    expect(wrapper.element).toMatchSnapshot();
  });
});
