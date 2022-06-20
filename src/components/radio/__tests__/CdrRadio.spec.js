import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrRadio from '../CdrRadio.vue';

describe('CdrRadio', () => {
  describe('with customValue and name prop', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(CdrRadio, {
        propsData: {
          customValue: 'A',
          name: 'testName',
        }
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('is type radio', () => {
      expect(wrapper.find('input').attributes('type')).toBe('radio');
    });

    it('sets name attribute correctly', () => {
      expect(wrapper.find('input').attributes('name')).toBe('testName');
    });
  });

  it('adds a custom label class correctly', () => {
    const wrapper = mount(CdrRadio, {
      propsData: {
        labelClass: 'custom-label-class',
        customValue: 'A',
        name: 'testName',
      },
      slots: {
        default: 'Label Test',
      },
    });
    expect(wrapper.find('.custom-label-class').exists()).toBe(true);
  });

  it('adds a custom input class correctly', () => {
    const wrapper = mount(CdrRadio, {
      propsData: {
        inputClass: 'custom-input-class',
        customValue: 'A',
        name: 'testName',
      },
      slots: {
        default: 'Label Test',
      },
    });
    expect(wrapper.find('.custom-input-class').exists()).toBe(true);
  });

  it('adds a custom content class correctly', () => {
    const wrapper = mount(CdrRadio, {
      propsData: {
        contentClass: 'custom-content-class',
        customValue: 'A',
        name: 'testName',
      },
      slots: {
        default: 'Label Test',
      },
    });
    expect(wrapper.find('.custom-content-class').exists()).toBe(true);
  });

  it('evaluates simple not checked state correctly', () => {
    const wrapper = mount(CdrRadio, {
      propsData: {
        customValue: 'A',
        name: 'testName',
        modelValue: 'AA',
      },
    });
    expect(wrapper.find('input').element.checked).toBe(false);
  });

  it('evaluates simple checked state correctly', () => {
    const wrapper = mount(CdrRadio, {
      propsData: {
        customValue: 'A',
        name: 'testName',
        modelValue: 'A',
      },
    });
    expect(wrapper.find('input').element.checked).toBe(true);
  });

  it('evaluates complex group not checked state correctly', () => {
    const wrapper = mount(CdrRadio, {
      propsData: {
        customValue: {test: 'B', arr: [1,2,3]},
        name: 'testName',
        modelValue: {test: 'B'},
      },
    });
    expect(wrapper.find('input').element.checked).toBe(false);
  });

// TODO: would need to update CdrRadio.vue to do deepEquality check in order to support complex objects like this.
// I am not sure if this is something we actually need to support or if it's worth the cost of implementing into CdrRadio?
// For example, a consumer could bind ID/Key strings to the radio and use them to look up the associated object in their code rather than binding arbitrary objects
// <cdr-radio v-model="foo">
// const options = {foo: {test: 'b', arr: [1,2,3]}}, etc.
  // xit('evaluates complex group checked state correctly', () => {
  //   const wrapper = mount(CdrRadio, {
  //     propsData: {
  //       customValue: {test: 'B', arr: [1,2,3]},
  //       name: 'testName',
  //       modelValue: {test: 'B', arr: [1,2,3]},
  //     },
  //   });
  //   expect(wrapper.find('input').element.checked).toBe(true);
  // });

  it('emits a change event with correct value', () => {
    const wrapper = mount(CdrRadio, {
      propsData: {
        customValue: 'A',
        name: 'testName',
        modelValue: '',
      },
    });

    const rb = wrapper.find('input');
    rb.element.checked = 'true';
    rb.trigger('change')
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe('A');
  });
});
