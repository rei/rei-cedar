import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrTitle from 'componentdir/title/CdrTitle';

describe('CdrTitle', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrTitle);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a failing test by default so you remember to do them', () => {
    expect(false).toBe(true);
  });
});
