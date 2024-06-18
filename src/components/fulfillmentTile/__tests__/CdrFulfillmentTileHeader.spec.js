import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrFulfillmentTileHeader from '../CdrFulfillmentTileHeader.vue';

describe('CdrFulfillmentTileHeader', () => {
  it('icon left configuration', () => {
    const wrapper = shallowMount(CdrFulfillmentTileHeader, {
      slots: {
        'icon-left': 'X',
        label: 'Label slot',
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('icon right configuration', () => {
    const wrapper = shallowMount(CdrFulfillmentTileHeader, {
      slots: {
        'icon-right': 'X',
        label: 'Label slot',
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
