import { shallowMount, mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrAccordion from '../CdrAccordion.vue';

const propsData = {
  id: 'test',
  label: 'A label',
  level: '2',
  compact: false,
  borderAligned: false,
};

describe('CdrAccordion', () => {
  it('renders correctly', () => {
    const wrapper = mount(CdrAccordion, {
      propsData: {
        id: 'test',
        level: '2',
      },
      slots: {
        default: 'This is some slot text.',
        label: 'label'
      },
    });
    expect(wrapper.element).toMatchSnapshot()
  });

  it('renders correctly unwrapped', async () => {
    const wrapper = mount(CdrAccordion, {
      propsData: {
        id: 'test',
        level: '2',
      },
      slots: {
        default: 'This is some slot text.',
        label: 'label'
      },
      global: {
        provide: {
          unwrap: {
            isUnwrapped: {
              value: true
            }
          }
        }
      }
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.element).toMatchSnapshot()
  });

  // TODO add more checks here
  it('meets a11y requirements', async () => {
    const wrapper = shallowMount(CdrAccordion, {
      propsData: {
        id: 'test',
        level: '2',
      },
      slots: {
        default: 'This is some slot text.',
        label: 'label',
      },
    });
    const button = wrapper.find('#test');
    const contentArea = wrapper.find('.cdr-accordion__content');
    expect(button.classes()).toContain('js-cdr-accordion-button');
    // closed state
    expect(button.attributes('aria-expanded')).toBe('false');
    expect(button.attributes('aria-controls')).toBe(`${wrapper.vm.id}-collapsible`);

    // opened state
    button.trigger('click');
    wrapper.setProps({ opened: true }); // fake the opening logic
    await wrapper.vm.$nextTick();
    expect(button.attributes('aria-expanded')).toBe('true');
    expect(contentArea.attributes('aria-hidden')).toBe('false');
  })

  describe('accordion data setup', () => {
    it('sets maxHeight when starting closed', () => {
      const wrapper = shallowMount(CdrAccordion, {
        propsData: {
          id: 'test',
          level: '2',
          opened: false,
        },
        slots: {
          default: 'This is some slot text.',
          label: 'label',
        },
      });

      expect(wrapper.vm.maxHeight).toBe(0);
    });

    it('maxHeight is adjusted in created when starting open', () => {
      const wrapper = shallowMount(CdrAccordion, {
        propsData: {
          id: 'test',
          level: '2',
          opened: true,
        },
        slots: {
          default: 'This is some slot text.',
          label: 'label',
        },
      });

      expect(wrapper.vm.maxHeight).toBe('none');
    });
  });

  describe('toggling accordion', () => {
    it('updates emits an event onClick', async () => {
      const wrapper = shallowMount(CdrAccordion, {
        propsData: {
          id: 'test',
          level: '2',
        },
        slots: {
          default: 'This is some slot text.',
          label: 'label',
        },
      });

      wrapper.find('button').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('accordion-toggle'));
    });

    it('updates maxHeight on prop update', async () => {
      const wrapper = shallowMount(CdrAccordion, {
        propsData: {
          id: 'test',
          level: '2',
          opened: true,
        },
        slots: {
          default: 'This is some slot text.',
          label: 'label',
        },
      });

      wrapper.setProps({ opened: false });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.maxHeight).toBe('0px');
    });
  });

  it('isOpenClass computed prop', () => {
    const wrapper = shallowMount(CdrAccordion, {
      propsData: {
        id: 'test',
        level: '2',
        opened: false,
      },
      slots: {
        default: 'This is some slot text.',
        label: 'label',
      },
    });

    expect(wrapper.vm.isOpenClass).toEqual('cdr-accordion--closed');
  });

  it('focused style', async () => {
    const wrapper = shallowMount(CdrAccordion, {
      propsData: propsData,
      slots: {
        default: 'This is some slot text.',
        label: 'label',
      },
    });
    wrapper.find('button').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.focused).toBeTruthy();
    expect(wrapper.classes()).toContain('cdr-accordion--focused');
    wrapper.find('button').trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.focused).toBeFalsy();
  });
  it('no-spacing style', async () => {
    const wrapper = shallowMount(CdrAccordion, {
      propsData: {
        id: 'test',
        level: '2',
        contentSpacing: false,
      },
      slots: {
        default: 'This is some slot text.',
        label: 'label',
      },
    });
    expect(wrapper.classes()).toContain('cdr-accordion--no-spacing');
  });
  it('style class checks prop values', () => {
    const wrapper = shallowMount(CdrAccordion, {
      propsData: {
        id: 'test',
        level: '2',
        compact: true,
        borderAligned: true,
      },
      slots: {
        default: 'This is some slot text.',
        label: 'label',
      },
    });

    expect(wrapper.classes()).toContain('cdr-accordion--compact');
    expect(wrapper.classes()).toContain('cdr-accordion--border-aligned');
  });
});
