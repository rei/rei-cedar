import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrKicker from '../CdrKicker.vue';

describe('CdrKicker', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrKicker, {
      slots: {
        default: 'Kicker'
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
