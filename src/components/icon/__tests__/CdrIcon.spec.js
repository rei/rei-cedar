import { shallowMount, mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrIcon from '../CdrIcon.vue';
import IconCaretDown from '../comps/caret-down.vue'

describe('CdrIcon', () => {
  test('renders correctly', () => {
    const wrapper = mount(CdrIcon);
    expect(wrapper.element).toMatchSnapshot();
  });

  test('renders correctly for single icon component', () => {
    const wrapper = mount(IconCaretDown);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('adds inherit color class correctly', () => {
    const wrapper = shallowMount(CdrIcon, {
      propsData: {
        inheritColor: true,
      },
    });
    expect(wrapper.classes()).toContain('cdr-icon--inherit-color');
  });

  it('sets aria-hidden by default', () => {
    const wrapper = shallowMount(CdrIcon);
    expect(wrapper.attributes()['aria-hidden']).toBe('true');
  });

  it('does not set aria-hidden if passed aria-label', () => {
    const wrapper = shallowMount(CdrIcon, {
      attrs: {
        'aria-label': 'foo'
      }
    });
    expect(wrapper.attributes()['aria-hidden']).toBe(undefined);
  });

  it('does not set aria-hidden if passed aria-labelledby', () => {
    const wrapper = shallowMount(CdrIcon, {
      attrs: {
        'aria-labelledby': 'foo'
      }
    });
    expect(wrapper.attributes()['aria-hidden']).toBe(undefined);
  });

  it('passes through props for single icon components', () => {
    const wrapper = mount(IconCaretDown, {
      attrs: {
        'aria-labelledby': 'foo'
      }
    });
    expect(wrapper.attributes()['aria-hidden']).toBe(undefined);
    expect(wrapper.attributes()['aria-labelledby']).toBe('foo');
  });

  it('adds size class correctly', () => {
    const wrapper = shallowMount(CdrIcon, {
      propsData: {
        size: 'small large@lg',
      },
    });
    expect(wrapper.classes()).toContain('cdr-icon--small');
    expect(wrapper.classes()).toContain('cdr-icon--large@lg');
  });

  it('single icon component passes size prop through to CdrIcon', () => {
    const wrapper = mount(IconCaretDown, {
      propsData: {
        size: 'small',
      },
    });
    expect(wrapper.find('.cdr-icon--small').exists()).toBe(true);
  });

  // TODO: is this even possible anymore? Depends on vnode stuff
  // it('accepts full SVG in slot', () => {
  //   const wrapper = mount(CdrIcon, {
  //     slots: {
  //       default: `<svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 32 32"
  //       data-test="testing"
  //       class="my-custom-class"
  //     >
  //       <path d="M10 13v1h3.996v2H10v1a4 4 0 11-7.853-1.085l1.795-8.93.093-.442A3 3 0 0110 7v4h3.997V7a3 3 0 015.965-.456l.093.442 1.795 8.93A4.003 4.003 0 0117.998 21a4 4 0 01-4-4v-4H10zm9.296.214l-1.308-6.38a1.01 1.01 0 00-.99-.835 1 1 0 00-1 1v6.536a4.016 4.016 0 013.299-.321zm-14.6 0c.408-.14.844-.215 1.298-.215.73 0 1.413.195 2.002.536V7a1 1 0 00-1-1 1.01 1.01 0 00-.99.836l-1.31 6.38zM18 19a2 2 0 100-4 2 2 0 000 4zM6.011 19a2 2 0 100-4 2 2 0 000 4z" />
  //     </svg>`,
  //     },
  //   });
  //   expect(wrapper.element).toMatchSnapshot();
  //   expect(wrapper.classes()).toContain('my-custom-class'); // applies custom classes
  //   expect(wrapper.attributes('data-test')).toBe('testing'); // merges attributes
  //   expect(wrapper.attributes('viewBox')).toBe('0 0 24 24'); // doesn't override 'default' attributes
  // });

});
