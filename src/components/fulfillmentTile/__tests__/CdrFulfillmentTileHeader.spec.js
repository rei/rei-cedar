import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrFulfillmentTileHeader from '../CdrFulfillmentTileHeader.vue';

describe('CdrFulfillmentTileHeader', () => {
  it('icon left configuration', () => {
    const wrapper = mount(CdrFulfillmentTileHeader, {
      slots: {
        'icon-left': 'X',
        label: 'Label slot',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('icon right configuration', () => {
    const wrapper = mount(CdrFulfillmentTileHeader, {
      slots: {
        'icon-right': 'X',
        label: 'Label slot',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('shows label', () => {
    const wrapper = mount(CdrFulfillmentTileHeader, {
      slots: {
        label: 'Label slot',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.cdr-fulfillment-tile-header__label').text()).toBe('Label slot');
  });
});
