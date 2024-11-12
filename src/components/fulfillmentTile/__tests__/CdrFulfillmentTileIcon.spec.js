import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrFulfillmentTileIcon from '../CdrFulfillmentTileIcon.vue';

describe('CdrFulfillmentTileIcon', () => {
  it('has defaults', () => {
    const wrapper = mount(CdrFulfillmentTileIcon, {
      props: { type: 'default' },
      slots: { default: 'X' },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has success type', () => {
    const wrapper = mount(CdrFulfillmentTileIcon, {
      props: { type: 'success' },
      slots: { default: 'X' },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.classes()).toEqual([
      'cdr-fulfillment-tile-icon',
      'cdr-fulfillment-tile-icon--success',
    ]);
  });
});
