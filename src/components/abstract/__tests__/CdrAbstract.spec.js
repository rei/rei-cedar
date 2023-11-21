import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrAbstract from 'componentdir/abstract/CdrAbstract';

describe('CdrAbstract', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrAbstract);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a failing test by default so you remember to do them', () => {
    expect(false).toBe(true);
  });
});
