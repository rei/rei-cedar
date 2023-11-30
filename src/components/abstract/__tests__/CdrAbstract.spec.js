import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrAbstract from 'componentdir/abstract/CdrAbstract';

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
