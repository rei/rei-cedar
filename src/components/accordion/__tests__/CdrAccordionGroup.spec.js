import { shallowMount, mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrAccordionGroup from '../CdrAccordionGroup.vue';
import CdrAccordion from '../CdrAccordion.vue';
import { h } from '@vue/runtime-core';

describe('CdrAccordionGroup', () => {
  let wrapper;
  let buttons;
  describe('when wrapped', () => {
    beforeEach(() => {
      wrapper = mount(CdrAccordionGroup, {
        slots: {
          default: [
            h(CdrAccordion, { id: 'tab1', level: '2', label: 'label1' }),
            h(CdrAccordion, { id: 'tab2', level: '2', label: 'label2' }),
            h(CdrAccordion, { id: 'tab3', level: '2', label: 'label3' }),
          ],
        },
        attachTo: document.body
      });
      buttons = wrapper.findAll('.js-cdr-accordion-button');
      buttons[0].element.focus();
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot()
    });

    describe('keyboard interactions', ()=>{
      it('hitting ArrowUp focuses on the expected element', async () => {
        buttons[0].element.focus();
        wrapper.trigger('keydown', { key: 'ArrowUp' });
        await wrapper.vm.$nextTick();
        expect(buttons[2].element).toBe(document.activeElement);
      });

      it('hitting ArrowDown focuses on the expected element', async () => {
        buttons[2].element.focus();
        wrapper.trigger('keydown', { key: 'ArrowDown' });
        await wrapper.vm.$nextTick();
        expect(buttons[0].element).toBe(document.activeElement);
      });

      it('hitting End focuses on the expected element', async () => {
        wrapper.trigger('keydown', { key: 'End' });
        await wrapper.vm.$nextTick();
        expect(buttons[2].element).toBe(document.activeElement);
      });

      it('hitting Home focuses on the expected element', async () => {
        wrapper.trigger('keydown', { key: 'Home' });
        await wrapper.vm.$nextTick();
        expect(buttons[0].element).toBe(document.activeElement);
      });
    })
  });

  describe('when unwrapped', () => {
    let wrapper;
    beforeEach(async () => {
      wrapper = mount(h(CdrAccordionGroup, { unwrap: true }, {
        default: () => [
          h(CdrAccordion, { id: 'tab1', level: '2', label: 'label1' }),
          h(CdrAccordion, { id: 'tab2', level: '2', label: 'label2' }),
          h(CdrAccordion, { id: 'tab3', level: '2', label: 'label3' }),
        ]
      }));
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot()
    });
  });

  describe('with string value for unwrapped prop', ()=>{
    beforeEach(async () => {
      wrapper = mount(h(CdrAccordionGroup, { unwrap: '@md' }, {
        default: () => [
          h(CdrAccordion, { id: 'tab1', level: '2', label: 'label1' }),
          h(CdrAccordion, { id: 'tab2', level: '2', label: 'label2' }),
          h(CdrAccordion, { id: 'tab3', level: '2', label: 'label3' }),
        ]
      }));
    })
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot()
    });
  })
});
