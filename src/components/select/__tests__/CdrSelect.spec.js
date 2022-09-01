// import { mount } from '../../../../test/vue-jest-style-workaround.js';
import { mount } from '@vue/test-utils';
import CdrSelect from '../CdrSelect.vue';

describe('CdrSelect', () => {
  describe('default configuration with a name attribute', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSelect, {
        propsData: {
          label: 'Label Test',
          id: 'renders'
        },
        attrs: {
          name: 'testing',
        }
      });
    })
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('sets select name attribute correctly', () => {
      expect(wrapper.find('select').attributes('name')).toBe('testing');
    });

    describe('with an error state', () => {
      beforeEach(() => {
        wrapper.setProps({ error: 'What happened?' })
      })

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('renders error text', () => {
        expect(wrapper.find('.cdr-form-error').text()).toBe('What happened?');
      });
    });

    describe('with a hide-label prop', () => {
      beforeEach(() => {
        wrapper.setProps({ hideLabel: true })
      })

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('it applies sr-only to label element', () => {
        expect(wrapper.find('label').classes()).toContain('cdr-label-standalone__label--sr-only');
      });
    });

    describe('with a prompt prop', () => {
      beforeEach(() => {
        wrapper.setProps({ prompt: 'what is it' })
      })

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('renders the prompt', () => {
        expect(wrapper.find('option').text()).toBe('what is it');
      });
    });


    describe('with a required prop', () => {
      beforeEach(() => {
        wrapper.setProps({ required: true })
      })

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('sets select required attribute correctly', () => {
        expect(wrapper.find('select').attributes('aria-required')).toBe('true');
      });
    });
    describe('with a required prop', () => {
      beforeEach(() => {
        wrapper.setProps({
          multiple: true,
          value: []
        })
      })

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('sets select multiple attribute correctly', () => {
        expect(wrapper.find('select').attributes('multiple')).toBe('');
      });
    });
  })

  describe('with "disabled" set to true', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSelect, {
        propsData: {
          label: 'Label Test',
          id: 'renders'
        },
        attrs: {
          disabled: true,
        }
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('sets select disabled attribute correctly', () => {
      expect(wrapper.find('select').attributes('disabled')).toBe('');
    });

    it('sets select disabled caret classname correctly', () => {
      const caret = wrapper.find('svg');
      expect(caret.classes()).toContain('cdr-select__caret--disabled');
    });
  })

  describe('with "autofocus" set to true', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSelect, {
        propsData: {
          label: 'Label Test',
          id: 'renders'
        },
        attrs: {
          autofocus: true,
        }
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('sets select autofocus attribute correctly', () => {
      expect(wrapper.find('select').attributes('autofocus')).toBe('');
    });
  })

  describe('using the error slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSelect, {
        propsData: {
          label: 'test',
          id: 'test',
        },
        slots: {
          'error': 'whoops',
        },
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('does not render error slot when error state is inactive', async () => {
      wrapper.setProps({ error: false });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.cdr-form-error').exists()).toBe(false);
    });

    it('renders the slot when error state is active', async () => {
      wrapper.setProps({ error: true });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.cdr-form-error').text()).toBe('whoops');
    });
  })

  describe('component with options and values set', () => {
    let wrapper;
    let select;
    let options;
    beforeEach(() => {
      wrapper = mount(CdrSelect, {
        propsData: {
          label: 'test',
          value: '4',
          id: 'test',
          modelValue: '4',
          options: ['3', '4'],
        },
      });
      select = wrapper.find('select');
      options = select.findAll('option');
    })

    it('has the expected initial state', async () => {
      expect(select.element.value).toBe('4');
      expect(options[1].element.selected).toBeTruthy();
    });

    it('has the expected state after a modelValue change', async () => {
      wrapper.setProps({ modelValue: '3' });
      await wrapper.vm.$nextTick();
      expect(select.element.value).toBe('3');
      expect(options[0].element.selected).toBeTruthy();
    });
  })

  describe('with info action slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSelect, {
        propsData: {
          label: 'test',
          id: 'info-action'
        },
        slots: {
          'info-action': '🤠',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders info action slot', () => {
      expect(wrapper.find('.cdr-label-standalone__info-action').text()).toBe('🤠');
    });
  })

  describe('with helper text slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSelect, {
        propsData: {
          label: 'test',
          id: 'aria-test'
        },
        slots: {
          'helper-text': 'yee haw',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders info action slot', () => {
      expect(wrapper.find('.cdr-label-standalone__helper').text()).toBe('yee haw');
    });

    it('helper text slots are linked to select via aria-describedby', () => {
      expect(wrapper.find('select').attributes('aria-describedby')).toBe('aria-test-helper-text-top');
    });
  })

  describe('with info slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSelect, {
        propsData: {
          label: 'test',
          id: 'info-action',
        },
        slots: {
          'info': 'howdy',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders info action slot', () => {
      expect(wrapper.find('.cdr-label-standalone__info').text()).toBe('howdy');
    });
  })

  describe('with pre-icon slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSelect, {
        propsData: {
          label: 'test',
          id: 'test',
        },
        slots: {
          'pre-icon': '🤠',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders info action slot', () => {
      expect(wrapper.find('.cdr-select__pre-icon').text()).toBe('🤠');
    });
  })

  describe('with aria-describedby and id provided', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSelect, {
        propsData: {
          label: 'test',
          id: 'aria-test',
        },
        attrs: {
          'aria-describedby': 'foo',
        },
        slots: {
          'helper-text': 'extremely helpful'
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('dynamic aria-describedby is merged with native attr', () => {
      expect(wrapper.find('select').attributes('aria-describedby')).toBe('aria-test-helper-text-top foo');
    });
  })

  describe('with no attr or helper slots', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSelect, {
        propsData: {
          label: 'test',
          id: 'aria-test',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('does not apply aria-describedby', () => {
      expect(wrapper.find('select').attributes('aria-describedby')).toBe(undefined);
    });
  })



  // TODO: something wrong with v-model binding for CdrSelect?
  // xit('emits change event with correct value', async () => {
  //   const wrapper = mount(CdrSelect, {
  //     propsData: {
  //       label: 'test',
  //       value: '4',
  //       options: ['3', '4'],
  //       id: 'test',
  //     },
  //   });
  //   const select = wrapper.find('select');
  //   const options = select.findAll('option');
  //   options[0].setSelected();
  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.emitted().change[0][0]).toBe('3');
  //   expect(wrapper.emitted().change[0][1] instanceof Event).toBeTruthy();
  // });

  // xit('emits change event with correct value for multiple', () => {
  //   const wrapper = mount(CdrSelect, {
  //     propsData: {
  //       label: 'test',
  //       multiple: true,
  //       id: 'test',
  //       value: ['1', '2'],
  //       options: [{
  //         value: '1',
  //         text: 'one',
  //       },
  //       {
  //         value: '2',
  //         text: 'two',
  //       },
  //       {
  //         value: '3',
  //         text: 'three',
  //       }],
  //     },
  //   });
  //   const select = wrapper.find('select');
  //   const options = select.findAll('option');
  //   console.log('multiple opt', options)
  //   options[0].element.selected = true;
  //   options[1].element.selected = false;
  //   options[2].element.selected = true;
  //   select.trigger('change');
  //   console.log('multi', wrapper.emitted())
  //   expect(wrapper.emitted().change[0][0]).toEqual(['1', '3']);
  //   expect(wrapper.emitted().change[0][1] instanceof Event).toBeTruthy();
  // });
});
