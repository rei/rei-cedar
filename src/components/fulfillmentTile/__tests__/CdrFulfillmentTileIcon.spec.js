import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrFulfillmentTileIcon from '../CdrFulfillmentTileIcon.vue';

describe('CdrFulfillmentTileIcon', () => {
  it('default snapshot', () => {
    const wrapper = mount(CdrFulfillmentTileIcon);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has default type class', () => {
    const wrapper = mount(CdrFulfillmentTileIcon);
    expect(wrapper.classes()).toContain('cdr-fulfillment-tile-icon');
    expect(wrapper.classes()).toContain('cdr-fulfillment-tile-icon--default');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies info type class', () => {
    const wrapper = mount(CdrFulfillmentTileIcon, { props: { type: 'info' } });
    expect(wrapper.classes()).toContain('cdr-fulfillment-tile-icon--info');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies warning type class', () => {
    const wrapper = mount(CdrFulfillmentTileIcon, { props: { type: 'warning' } });
    expect(wrapper.classes()).toContain('cdr-fulfillment-tile-icon--warning');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies success type class', () => {
    const wrapper = mount(CdrFulfillmentTileIcon, { props: { type: 'success' } });
    expect(wrapper.classes()).toContain('cdr-fulfillment-tile-icon--success');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies error type class', () => {
    const wrapper = mount(CdrFulfillmentTileIcon, { props: { type: 'error' } });
    expect(wrapper.classes()).toContain('cdr-fulfillment-tile-icon--error');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders default slot content', () => {
    const wrapper = mount(CdrFulfillmentTileIcon, {
      slots: { default: '<svg data-testid="icon-svg"></svg>' }
    });
    expect(wrapper.html()).toContain('data-testid="icon-svg"');
    expect(wrapper.element).toMatchSnapshot();
  });
});