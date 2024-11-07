import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrTooltip from '../CdrTooltip.vue';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('CdrTooltip', () => {
  describe('default component settings', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrTooltip, {
        propsData: {
          id: 'tooltip-test'
        },
        slots: {
          trigger: '<button id="tooltip-trigger"></button>',
          default: 'tooltip content',
        }
      });
    })

    it('matches snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('emits event when opened', () => {
      wrapper.vm.openTooltip(true);
      expect(wrapper.emitted('opened')).toBeTruthy();
    });

    it('emits event when closed', async () => {
      wrapper.vm.closeTooltip(true);
      await timeout(500);
      expect(wrapper.emitted('closed')).toBeTruthy();
    });

    it('sets aria properties on trigger', () => {
      expect(wrapper.find('#tooltip-trigger').attributes('aria-describedby')).toBe('tooltip-test');
    });

    describe('with contentClass', () => {
      beforeEach(() => {
        wrapper.setProps({ contentClass: 'tooltip-override' })
      })
      it('binds contentClass to content', () => {
        expect(wrapper.find('.tooltip-override').exists()).toBe(true);
      });
    })
  })
});
