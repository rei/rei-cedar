import { h } from 'vue';
import { mount } from '../../../../test/vue-jest-style-workaround.js';

import CdrChipGroup from '../CdrChipGroup.vue';
import CdrChip from '../CdrChip.vue';

describe('CdrChipGroup', () => {
  let wrapper;
  let chips
  describe('default configuration', () => {
    beforeEach(() => {
      wrapper = mount(CdrChipGroup, {
        props: {
          label: 'test',
        },
        slots: {
          default: [
            h(CdrChip, { 'aria-checked': 'true', tabindex: 0, role: 'radio' }, { default: () => 'chip 1' }),
            h(CdrChip, { 'aria-checked': 'false', tabindex: -1, role: 'radio' }, { default: () => 'chip 2' }),
            h(CdrChip, { 'aria-checked': 'false', tabindex: -1, role: 'radio' }, { default: () => 'chip 3' }),
          ],
        },
        attachTo: document.body
      })
      chips = wrapper.findAll('.cdr-chip').map(domWrapper => domWrapper.element);
    })
    
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    describe('keyboard interactions', () => {
      it('hitting ArrowUp focuses on the expected element', async () => {
        chips[0].focus();
        wrapper.trigger('keydown', { key: 'ArrowUp' });
        await wrapper.vm.$nextTick();
        expect(chips[2]).toBe(document.activeElement);
      });

      it('hitting ArrowDown focuses on the expected element', async () => {
        chips[2].focus();
        wrapper.trigger('keydown', { key: 'ArrowDown' });
        await wrapper.vm.$nextTick();
        expect(chips[0]).toBe(document.activeElement);
      });

      it('hitting End focuses on the expected element', async () => {
        chips[0].focus();
        wrapper.trigger('keydown', { key: 'End' });
        await wrapper.vm.$nextTick();
        expect(chips[2]).toBe(document.activeElement);
      });

      it('hitting Home focuses on the expected element', async () => {
        chips[2].focus();
        wrapper.trigger('keydown', { key: 'Home' });
        await wrapper.vm.$nextTick();
        expect(chips[0]).toBe(document.activeElement);
      });
    })
  });

  describe('when label is visible', () => {
    beforeEach(() => {
      wrapper = mount(h(CdrChipGroup, {
        label: 'test',
        hideLabel: false,
      },
        {
          default: () => [
            h(CdrChip, { 'aria-checked': true, tabindex: 0, role: 'radio' }, { default: () => 'chip 1' }),
            h(CdrChip, { 'aria-checked': false, tabindex: -1, role: 'radio' }, { default: () => 'chip 2' }),
          ]
        },
      ));
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('with label slot', () => {
    beforeEach(() => {
      wrapper = mount(h(CdrChipGroup, {
        label: 'test',
        hideLabel: false,
      },
        {
          default: () => [
            h(CdrChip, { 'aria-checked': true, tabindex: 0, role: 'radio' }, { default: () => 'chip 1' }),
            h(CdrChip, { 'aria-checked': false, tabindex: -1, role: 'radio' }, { default: () => 'chip 2' }),
          ],
          label: 'hey im overriding here!!!',
        },
      ));
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when current index is set', () => {
    beforeEach(() => {
      wrapper = mount(CdrChipGroup, {
        props: {
          label: 'test',
        },
        slots: {
          default: [
            h(CdrChip, { 'aria-checked': 'false', tabindex: -1, role: 'radio' }, { default: () => 'chip 1' }),
            h(CdrChip, { 'aria-checked': 'true', tabindex: 0, role: 'radio' }, { default: () => 'chip 2' }),
          ],
        },
      },
      );
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
