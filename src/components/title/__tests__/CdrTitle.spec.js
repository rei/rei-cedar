import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrTitle from '../CdrTitle.vue';

describe('CdrTitle', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrTitle, {
      slots: {
        default: 'This is a title'
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

});
