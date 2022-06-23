import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrToggleSwitch from 'componentdir/toggleSwitch/CdrToggleSwitch';

describe('CdrToggleSwitch', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrToggleSwitch);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a failing test by default so you remember to do them', () => {
    expect(false).toBe(true);
  });
});
