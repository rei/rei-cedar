import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrFulfillmentTile from '../CdrFulfillmentTile.vue';

describe('CdrFulfillmentTile', () => {
  describe('snapshot test', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFulfillmentTile, { props: { checked: false } });
    });
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('component unit tests', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFulfillmentTile, { props: { checked: false } });
    });

    describe('default component with no configuration', () => {
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('sets the default tag prop correctly', () => {
        expect(wrapper.element.tagName).toBe('BUTTON');
      });
      it('base classes only', () => {
        expect(wrapper.classes()).toEqual(['cdr-fulfillment-tile']);
      });
    });
  });

  it('supports icon left configuration', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      props: { checked: false },
      slots: {
        'icon-left': 'X',
        label: 'Label slot',
        body: 'Body slot',
        footer: 'Footer slot',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('supports  icon right configuration', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      props: { checked: false },
      slots: {
        'icon-right': 'X',
        label: 'Label slot',
        body: 'Body slot',
        footer: 'Footer slot',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('shows header', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      props: { checked: false },
      slots: {
        label: 'Label slot',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.cdr-fulfillment-tile-header').text()).toBe('Label slot');
  });

  it('shows body', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      props: { checked: false },
      slots: {
        label: 'Label slot',
        body: 'Body slot',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.cdr-fulfillment-tile-content--stretch').text()).toBe('Body slot');

  });

  it('shows footer', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      props: { checked: false },
      slots: {
        label: 'Label slot',
        footer: 'Footer slot',
      },
    });
    expect(wrapper.find('.cdr-fulfillment-tile-content').text()).toBe('Footer slot');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('is loading', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      props: { checked: false, loading: true },
      slots: {
        label: 'Label slot',
        footer: 'Footer slot',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.cdr-fulfillment-tile__loading').exists()).toBe(true);
    expect(wrapper.find('.cdr-fulfillment-tile-header').exists()).toBe(false);
    expect(wrapper.find('.cdr-fulfillment-tile-content').exists()).toBe(false);
  });
});
