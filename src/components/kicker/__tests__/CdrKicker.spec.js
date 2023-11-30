import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrKicker from 'componentdir/kicker/CdrKicker';

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
