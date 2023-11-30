import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrAbstract from '../CdrAbstract.vue';

describe('CdrAbstract', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrAbstract, {
      slots: {
        default: 'This is an abstract'
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
