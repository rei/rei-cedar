import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrLayout from '../CdrLayout.vue';

describe('CdrLayout', () => {
  it('default snapshot', () => {
    const wrapper = mount(CdrLayout);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('sets the default tag prop correctly', () => {
    const wrapper = mount(CdrLayout, { props: { as: 'span' } });
    expect(wrapper.element.tagName).toBe('SPAN');
  });

  it('base classes only', () => {
    const wrapper = mount(CdrLayout, { props: { as: 'span' } });
    expect(wrapper.classes()).toEqual(['cdr-layout']);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('shows default slot', () => {
    const wrapper = mount(CdrLayout, { slots: { default: 'Default slot' } });
    expect(wrapper.find('.cdr-layout').text()).toBe('Default slot');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('basic columns', () => {
    const wrapper = mount(CdrLayout, { props: { columns: 2 } });
    expect(wrapper.classes()).toEqual(['cdr-layout', 'cdr-layout--columns']);
    expect(wrapper.find('.cdr-layout').attributes('style')).toBe('--cdr-layout-columns: 1fr 1fr;');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('ratio columns', () => {
    const wrapper = mount(CdrLayout, { props: { columns: [2, 1] } });
    expect(wrapper.classes()).toEqual(['cdr-layout', 'cdr-layout--columns']);
    expect(wrapper.find('.cdr-layout').attributes('style')).toBe('--cdr-layout-columns: 2fr 1fr;');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('flow to generate columns', () => {
    const wrapper = mount(CdrLayout, {
      props: { flow: 'column', flowValue: '100px' },
      slots: { default: '<div>1</div><div>2</div><div>3</div>' },
    });
    expect(wrapper.classes()).toEqual(['cdr-layout', 'cdr-layout--flow-column']);
    expect(wrapper.find('.cdr-layout').attributes('style')).toBe('--cdr-layout-flow-value: 100px;');
    expect(wrapper.findAll('.cdr-layout div').length).toBe(3);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('container query columns', () => {
    const wrapper = mount(CdrLayout, {
      props: { columns: { xs: 1, sm: ['100px', 1], md: ['400px', 1], lg: ['800px', 1] } },
    });
    expect(wrapper.classes()).toEqual([
      'cdr-layout',
      'cdr-layout--columns',
      'cdr-layout--columns-cq',
    ]);
    expect(wrapper.find('.cdr-layout').attributes('style')).toBe(
      '--cdr-layout-columns-xs: 1fr; --cdr-layout-columns-sm: 100px 1fr; --cdr-layout-columns-md: 400px 1fr; --cdr-layout-columns-lg: 800px 1fr;',
    );
    expect(wrapper.element).toMatchSnapshot();
  });

  it('media query columns', () => {
    const wrapper = mount(CdrLayout, {
      props: {
        queryType: 'media',
        columns: { xs: 1, sm: ['100px', 1], md: ['400px', 1], lg: ['800px', 1] },
      },
    });
    expect(wrapper.classes()).toEqual([
      'cdr-layout',
      'cdr-layout--columns',
      'cdr-layout--columns-mq',
    ]);
    expect(wrapper.find('.cdr-layout').attributes('style')).toBe(
      '--cdr-layout-columns-xs: 1fr; --cdr-layout-columns-sm: 100px 1fr; --cdr-layout-columns-md: 400px 1fr; --cdr-layout-columns-lg: 800px 1fr;',
    );
    expect(wrapper.element).toMatchSnapshot();
  });

  it('same gap', () => {
    const wrapper = mount(CdrLayout, { props: { columns: 2, gap: 'one-x' } });
    expect(wrapper.classes()).toEqual([
      'cdr-layout',
      'cdr-layout--gap-one-x',
      'cdr-layout--columns',
    ]);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('different gap', () => {
    const wrapper = mount(CdrLayout, {
      props: { columns: 2, columnGap: 'one-x', rowGap: 'one-x' },
    });
    expect(wrapper.classes()).toEqual([
      'cdr-layout',
      'cdr-layout--column-gap-one-x',
      'cdr-layout--row-gap-one-x',
      'cdr-layout--columns',
    ]);
    expect(wrapper.element).toMatchSnapshot();
  });
});
