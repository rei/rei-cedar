import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrChoreographer from '../CdrChoreographer.vue';

describe('CdrChoreographer', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrChoreographer);
    expect(wrapper.element).toMatchSnapshot();
  });

});
