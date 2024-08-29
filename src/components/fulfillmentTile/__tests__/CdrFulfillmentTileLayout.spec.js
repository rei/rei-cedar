import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrFulfillmentTileLayout from '../CdrFulfillmentTileLayout.vue';

describe('CdrFulfillmentTileLayout', () => {
  it('has defaults', () => {
    const wrapper = mount(CdrFulfillmentTileLayout, {
      props: {},
      slots: { default: 'X' },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.classes()).toEqual([
      'cdr-fulfillment-tile-layout',
      'cdr-fulfillment-tile-layout--horizontal',
    ]);
  });

  it('has vertical layout', () => {
    const wrapper = mount(CdrFulfillmentTileLayout, {
      props: { orientation: 'vertical' },
      slots: { default: 'X' },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.classes()).toEqual([
      'cdr-fulfillment-tile-layout',
      'cdr-fulfillment-tile-layout--vertical',
    ]);
  });
});
