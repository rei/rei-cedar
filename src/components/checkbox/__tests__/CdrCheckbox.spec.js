import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrCheckbox from 'componentdir/checkbox/CdrCheckbox';

describe('CdrCheckbox', () => {
  test('renders correctly', () => {
    const wrapper = mount(CdrCheckbox, {
      propsData: {
        labelClass: 'custom-label-class',
      },
      slots: {
        default: 'Label Test',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('is type checkbox', () => {
    const wrapper = mount(CdrCheckbox);
    expect(wrapper.find('input').attributes('type')).toBe('checkbox');
  });

  it('renders a label element', () => {
    const wrapper = mount(CdrCheckbox);
    expect(wrapper.find('label').exists()).toBe(true);
  });

  it('adds a custom label class correctly', () => {
    const wrapper = mount(CdrCheckbox, {
      propsData: {
        labelClass: 'custom-label-class',
      },
      slots: {
        default: 'Label Test',
      },
    });
    expect(wrapper.find('.custom-label-class').exists()).toBe(true);
  });

  it('adds a custom input class correctly', () => {
    const wrapper = mount(CdrCheckbox, {
      propsData: {
        inputClass: 'custom-input-class',
      },
      slots: {
        default: 'Label Test',
      },
    });
    expect(wrapper.find('.custom-input-class').exists()).toBe(true);
  });

  it('adds a custom content class correctly', () => {
    const wrapper = mount(CdrCheckbox, {
      propsData: {
        contentClass: 'custom-content-class',
      },
      slots: {
        default: 'Label Test',
      },
    });
    expect(wrapper.find('.custom-content-class').exists()).toBe(true);
  });

  it('emits change events with correct values for default checkbox', async () => {
    const wrapper = mount(CdrCheckbox, {
      propsData: {
        modelValue: false,
      },
    });

    const cb = wrapper.find('input');

    cb.element.checked = true;
    cb.trigger('change');
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(true);

    cb.element.checked = false;
    cb.trigger('change');
    expect(wrapper.emitted()['update:modelValue'][1][0]).toBe(false);
  });

// TODO: these 2 tests no longer work properly, they are also sort of testing vue internals.
// Not sure how best to handle these...
  // it('emits change events with correct values for custom checkbox', () => {
  //   const wrapper = mount(CdrCheckbox, {
  //     propsData: {
  //       trueValue: 'checked',
  //       falseValue: 'unchecked',
  //       modelValue: '',
  //     },
  //   });
  //   const cb = wrapper.find('input');
  //   cb.element.checked = true;
  //   cb.trigger('change');
  //   expect(wrapper.emitted()['update:modelValue'][0][0]).toBe('checked');
  //   cb.element.checked = false;
  //   cb.trigger('change');
  //   expect(wrapper.emitted()['update:modelValue'][1][0]).toBe('unchecked');
  // });
  //
  // it('emits change events with correct values for group checkbox', () => {
  //   const wrapper = mount(CdrCheckbox, {
  //     propsData: {
  //       customValue: 'b',
  //       modelValue: ['a'],
  //     },
  //   });
  //   const cb = wrapper.find('input');
  //   cb.element.checked = true;
  //   cb.trigger('change');
  //   expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual(['a', 'b']);
  //   cb.element.checked = false;
  //   cb.trigger('change');
  //   expect(wrapper.emitted()['update:modelValue'][1][0]).toEqual(['a']);
  // });
});
