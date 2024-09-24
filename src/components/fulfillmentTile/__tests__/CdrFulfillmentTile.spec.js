import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrFulfillmentTile from '../CdrFulfillmentTile.vue';

describe('CdrFulfillmentTile', () => {
  describe('snapshot test', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFulfillmentTile, {
        props: { checked: false },
        slots: { header: 'Header' },
      });
    });
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('component unit tests', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFulfillmentTile, {
        props: { checked: false },
        slots: { header: 'Header' },
      });
    });

    describe('default component with no configuration', () => {
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('sets the default tag prop correctly', () => {
        expect(wrapper.element.tagName).toBe('BUTTON');
      });
      it('base classes only', () => {
        expect(wrapper.classes()).toEqual([
          'cdr-fulfillment-tile',
          'cdr-fulfillment-tile--modifier-default',
        ]);
      });
    });
  });

  it('supports icon left configuration', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      props: { checked: false },
      slots: {
        'icon-left': 'X',
        header: 'Label slot',
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
        header: 'Label slot',
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
        header: 'Label slot',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.cdr-fulfillment-tile-header').text()).toBe('Label slot');
  });

  it('shows body', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      props: { checked: false },
      slots: {
        header: 'Label slot',
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
        header: 'Label slot',
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
        header: 'Label slot',
        footer: 'Footer slot',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.cdr-fulfillment-tile').attributes('data-loading')).toBe('true');
  });

  it('is not loading', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      props: { checked: false, loading: false },
      slots: {
        header: 'Label slot',
        footer: 'Footer slot',
      },
    });
    expect(wrapper.find('.cdr-fulfillment-tile').attributes('data-loading')).toBe(undefined);
  });
});
