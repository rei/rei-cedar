import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrFulfillmentTile from '../CdrFulfillmentTile.vue';

describe('CdrFulfillmentTile', () => {
  it('icon left configuration', () => {
    const wrapper = shallowMount(CdrFulfillmentTile, {
      slots: {
        'icon-left': 'X',
        label: 'Label slot',
        body: 'Body slot',
        footer: 'Footer slot',
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('icon right configuration', () => {
    const wrapper = shallowMount(CdrFulfillmentTile, {
      slots: {
        'icon-right': 'X',
        label: 'Label slot',
        body: 'Body slot',
        footer: 'Footer slot',
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
