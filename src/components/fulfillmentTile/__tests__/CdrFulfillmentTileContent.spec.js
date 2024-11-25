import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrFulfillmentTileContent from '../CdrFulfillmentTileContent.vue';

describe('CdrFulfillmentTileContent', () => {
  it('shows content', () => {
    const wrapper = mount(CdrFulfillmentTileContent, {
      slots: {
        default: 'Default slot',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.classes()).toEqual(['cdr-body', 'cdr-fulfillment-tile-content']);
    expect(wrapper.text()).toBe('Default slot');
  });

  it('is stretch', () => {
    const wrapper = mount(CdrFulfillmentTileContent, {
      props: {
        stretch: true,
      },
      slots: {
        default: 'Default slot',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.classes()).toEqual(['cdr-body', 'cdr-fulfillment-tile-content']);
  });
});
