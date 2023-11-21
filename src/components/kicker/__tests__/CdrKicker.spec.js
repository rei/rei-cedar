import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrKicker from 'componentdir/kicker/CdrKicker';

describe('CdrKicker', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrKicker);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a failing test by default so you remember to do them', () => {
    expect(false).toBe(true);
  });
});
