import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrFulfillmentTile from '../CdrFulfillmentTile.vue';

describe('CdrFulfillmentTile', () => {
  it('default snapshot', () => {
    const wrapper = mount(CdrFulfillmentTile);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('sets the default tag prop correctly', () => {
    const wrapper = mount(CdrFulfillmentTile);
    expect(wrapper.element.tagName).toBe('DIV');
  });

  it('can override the default tag', () => {
    const wrapper = mount(CdrFulfillmentTile, { props: { tag: 'div' } });
    expect(wrapper.element.tagName).toBe('DIV');
  });

  it('base classes only', () => {
    const wrapper = mount(CdrFulfillmentTile);
    expect(wrapper.classes()).toContain('cdr-fulfillment-tile');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders header slot', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      slots: { header: 'Header Content' }
    });
    expect(wrapper.find('.cdr-fulfillment-tile__header').exists()).toBe(true);
    expect(wrapper.text()).toContain('Header Content');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders body slot', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      slots: { body: 'Body Content' }
    });
    expect(wrapper.find('.cdr-fulfillment-tile__main').exists()).toBe(true);
    expect(wrapper.text()).toContain('Body Content');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders footer slot', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      slots: { footer: 'Footer Content' }
    });
    expect(wrapper.find('.cdr-fulfillment-tile__main').exists()).toBe(true);
    expect(wrapper.text()).toContain('Footer Content');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders icon-left slot', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      slots: { 
        header: 'Header Content',
        'icon-left': '<span data-testid="left-icon">Icon</span>' 
      }
    });
    expect(wrapper.html()).toContain('data-testid="left-icon"');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders icon-right slot', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      slots: { 
        header: 'Header Content',
        'icon-right': '<span data-testid="right-icon">Icon</span>' 
      }
    });
    expect(wrapper.html()).toContain('data-testid="right-icon"');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies checked state', () => {
    const wrapper = mount(CdrFulfillmentTile, { props: { checked: true } });
    expect(wrapper.attributes('aria-checked')).toBe('true');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies disabled state', () => {
    const wrapper = mount(CdrFulfillmentTile, { props: { disabled: true } });
    expect(wrapper.attributes('aria-disabled')).toBe('true');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies loading state', () => {
    const wrapper = mount(CdrFulfillmentTile, { props: { loading: true } });
    expect(wrapper.attributes('data-loading')).toBe('true');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('applies multiple states', () => {
    const wrapper = mount(CdrFulfillmentTile, {
      props: {
        checked: true,
        disabled: true,
        loading: true
      }
    });
    expect(wrapper.attributes('aria-checked')).toBe('true');
    expect(wrapper.attributes('aria-disabled')).toBe('true');
    expect(wrapper.attributes('data-loading')).toBe('true');
    expect(wrapper.element).toMatchSnapshot();
  });
});