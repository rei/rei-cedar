import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrTitle from 'componentdir/title/CdrTitle';

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
