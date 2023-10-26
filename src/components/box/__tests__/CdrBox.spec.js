import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrBox from 'componentdir/box/CdrBox';

describe('CdrBox', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrBox);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a failing test by default so you remember to do them', () => {
    expect(false).toBe(true);
  });
});
