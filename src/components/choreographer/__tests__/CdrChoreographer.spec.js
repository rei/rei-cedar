import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrChoreographer from 'componentdir/choreographer/CdrChoreographer';

describe('CdrChoreographer', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrChoreographer);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a failing test by default so you remember to do them', () => {
    expect(false).toBe(true);
  });
});
