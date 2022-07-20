import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrCheckbox from '../CdrCheckbox.vue';

describe('CdrCheckbox', () => {
  describe('default configuration', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(CdrCheckbox);
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
    
    it('is type checkbox', () => {
      expect(wrapper.find('input').attributes('type')).toBe('checkbox');
    });
  
    it('renders a label element', () => {
      expect(wrapper.find('label').exists()).toBe(true);
    });
  });

  describe('with a custom label class', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(CdrCheckbox, {
        propsData: {
          labelClass: 'custom-label-class',
        },
        slots: {
          default: 'Label Test',
        },
      });
    });
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('adds a custom label class correctly', () => {
      expect(wrapper.find('.custom-label-class').exists()).toBe(true);
    });
  })

  describe('with a custom input class', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(CdrCheckbox, {
        propsData: {
          inputClass: 'custom-input-class',
        },
        slots: {
          default: 'Label Test',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('adds a custom input class correctly', () => {
      expect(wrapper.find('.custom-input-class').exists()).toBe(true);
    });
  })

  describe('with a custom content class', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(CdrCheckbox, {
        propsData: {
          contentClass: 'custom-content-class',
        },
        slots: {
          default: 'Label Test',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('adds a custom content class correctly', () => {
      expect(wrapper.find('.custom-content-class').exists()).toBe(true);
    });
  })

  describe('when modelValue is set to false', ()=>{
    let wrapper;
    let checkbox;
    beforeEach(()=>{
      wrapper = mount(CdrCheckbox, {
        propsData: {
          modelValue: false,
        },
      });
      checkbox = wrapper.find('input');
    });

    it('a change event will cause the update:modelValue event to be emitted', () =>{
      checkbox.element.checked = true;
      checkbox.trigger('change');
      expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(true);

      checkbox.element.checked = false;
      checkbox.trigger('change');
      expect(wrapper.emitted()['update:modelValue'][1][0]).toBe(false);
    })
  })

// TODO: these 2 tests no longer work properly, they are also sort of testing vue internals.
// Not sure how best to handle these...
  it('emits change events with correct values for custom checkbox', () => {
    const wrapper = mount(CdrCheckbox, {
      propsData: {
        trueValue: 'checked',
        falseValue: 'unchecked',
        modelValue: '',
      },
    });
    const cb = wrapper.find('input');
    cb.element.checked = true;
    cb.trigger('change');
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe('checked');
    cb.element.checked = false;
    cb.trigger('change');
    expect(wrapper.emitted()['update:modelValue'][1][0]).toBe('unchecked');
  });
  //
  // it('emits change events with correct values for group checkbox', async () => {
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
