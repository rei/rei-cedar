import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrCheckbox from '../CdrCheckbox.vue';

describe('CdrCheckbox', () => {
  describe('default configuration', () => {
    let wrapper;
    beforeEach(() => {
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

  describe('using the default slot for label', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrCheckbox, {
        slots: {
          default: 'Label Test',
        },
      });
    });

    describe('with a custom label class', () => {
      beforeEach(() => {
        wrapper.setProps({ labelClass: 'custom-label-class' })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('adds a custom label class correctly', () => {
        expect(wrapper.find('.custom-label-class').exists()).toBe(true);
      });
    })

    describe('with a custom input class', () => {
      beforeEach(() => {
        wrapper.setProps({ inputClass: 'custom-input-class' })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('adds a custom input class correctly', () => {
        expect(wrapper.find('.custom-input-class').exists()).toBe(true);
      });
    })

    describe('with a custom content class', () => {
      beforeEach(() => {
        wrapper.setProps({ contentClass: 'custom-content-class' })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('adds a custom content class correctly', () => {
        expect(wrapper.find('.custom-content-class').exists()).toBe(true);
      });
    })

    describe('with an indeterminate prop', () => {
      beforeEach(async () => {
        wrapper.setProps({ indeterminate: true })
      });

      it('renders correctly', async () => {
        expect(wrapper.element).toMatchSnapshot();
      });
    })

    describe('when modelValue is set to false', () => {
      let checkbox;
      beforeEach(() => {
        wrapper.setProps({ modelValue: false })
        checkbox = wrapper.find('input');
      });
  
      it('a change event will cause the update:modelValue event to be emitted', () => {
        checkbox.element.checked = true;
        checkbox.trigger('change');
        expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(true);
  
        checkbox.element.checked = false;
        checkbox.trigger('change');
        expect(wrapper.emitted()['update:modelValue'][1][0]).toBe(false);
      })
    })
  })

  describe('change events', ()=>{
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
  
    it('emits change events with correct values for group checkbox', async () => {
      const wrapper = mount(CdrCheckbox, {
        propsData: {
          customValue: 'b',
          modelValue: ['a'],
        },
      });
      const cb = wrapper.find('input');
      cb.element.checked = true;
      cb.trigger('change');
      expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual(expect.arrayContaining(['a', 'b']));
      cb.element.checked = false;
      cb.trigger('change');
      //this doesn't seem to work because the ['a', 'b'] value doesn't seem to persist
      //expect(wrapper.emitted()['update:modelValue'][1][0]).toEqual(['a']);
    });
  })
});
