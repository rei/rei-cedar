import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrTabs from '../CdrTabs.vue';
import CdrTabPanel from '../CdrTabPanel.vue';
import { h } from 'vue';
// Tests use nextTick because of the nextTick in mounted hook of tabs

describe('CdrTabs', () => {
  let wrapper;
  beforeEach(()=>{
    wrapper = mount(CdrTabs, {
      slots: {
        default: [
          h(CdrTabPanel, {name: 'tab1', 'aria-labelledby': 'tab-small-one',}), 
          h(CdrTabPanel, {name: 'tab2'}),
          h(CdrTabPanel, {name: 'tab3', disabled: true}),
          h(CdrTabPanel, {name: 'tab4'})
        ],
      },
    });
  })
  describe('mounted', () => {
    it('mounts tabs', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('mounts with cdr-tab-panel children', async () => {
      const spyCalculateOverflow = vi.spyOn(wrapper.vm, 'calculateOverflow');
      const spyUpdateUnderline = vi.spyOn(wrapper.vm, 'updateUnderline');

    //   await wrapper.vm.$nextTick();

      expect(wrapper.vm.tabs.length).toBe(4);
      expect(wrapper.findAll('button').length).toBe(4);
      expect(wrapper.vm.selectedIndex).toBe(0);
      setTimeout(() => { // for debounce
        expect(spyCalculateOverflow).toHaveBeenCalled();
        expect(spyUpdateUnderline).toHaveBeenCalled();
      }, 500);
    });
  });

  describe('event listeners', () => {
    it('handles scroll event', async () => {
      const spyCalculateOverflow = vi.spyOn(wrapper.vm, 'calculateOverflow');
      const spyUpdateUnderline = vi.spyOn(wrapper.vm, 'updateUnderline');

      wrapper.find('.cdr-tabs__header-container').element.dispatchEvent(new Event('scroll'));
      await wrapper.vm.$nextTick();

      setTimeout(() => { // for debounce
        expect(wrapper.vm.overflowLeft).toBe(false);
        expect(spyCalculateOverflow).toHaveBeenCalled();
        expect(spyUpdateUnderline).toHaveBeenCalled();
      }, 600);
    });

    it('handles resize event', async () => {
      const spyCalculateOverflow = vi.spyOn(wrapper.vm, 'calculateOverflow');
      const spyUpdateUnderline = vi.spyOn(wrapper.vm, 'updateUnderline');
      const spyGetHeaderWidth = vi.spyOn(wrapper.vm, 'getHeaderWidth');
      window.dispatchEvent(new Event('resize'));
      await wrapper.vm.$nextTick();

      setTimeout(() => { // for debounce
        expect(spyGetHeaderWidth).toHaveBeenCalledTimes(2);
        expect(spyCalculateOverflow).toHaveBeenCalledTimes(2);
        expect(spyUpdateUnderline).toHaveBeenCalledTimes(2);
      }, 500);
    });
  });

  it('getNextTab and getPreviousTab', async() => {
    expect(wrapper.vm.selectedIndex).toBe(0);
    wrapper.vm.selectTabNext();
    expect(wrapper.vm.selectedIndex).toBe(1);
    wrapper.vm.selectTabNext();
    //TODO: There should be a separate it block to test that disabled tabs are skipped
    expect(wrapper.vm.selectedIndex).toBe(3);
    wrapper.vm.selectTabPrev();
    expect(wrapper.vm.selectedIndex).toBe(1);
    wrapper.vm.selectTabPrev();
    expect(wrapper.vm.selectedIndex).toBe(0);
  });

  describe('handleClick', () => {
    it('changes the selectedIndex', async () => {
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.selectedIndex).toBe(0);
      wrapper.findAll('button')[1].trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.selectedIndex).toBe(1);
    });
  });

  it('handles right arrow key', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedIndex).toBe(0);
    // Trigger right arrow keyup event
    wrapper.findAll('button')[0].trigger('keyup.right');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedIndex).toBe(1);
  });

  it('handles left arrow key', async () => {
    wrapper.vm.selectedIndex = 1;
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedIndex).toBe(1);
    // Trigger left arrow keyup event
    wrapper.findAll('button')[1].trigger('keyup.left');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedIndex).toBe(0);
  });

  describe('overflow classes', () => {
    it('adds gradient-left class', async () => {
      await wrapper.vm.$nextTick();
      wrapper.vm.overflowLeft = true;
      wrapper.vm.overflowRight = false;
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.cdr-tabs__gradient--right.cdr-tabs__gradient--active').exists()).toBe(false);
      expect(wrapper.find('.cdr-tabs__gradient--left.cdr-tabs__gradient--active').exists()).toBe(true);
    });

    it('adds gradient-right class', async () => {
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.cdr-tabs__gradient--right.cdr-tabs__gradient--active').exists()).toBe(true);
      expect(wrapper.find('.cdr-tabs__gradient--left.cdr-tabs__gradient--active').exists()).toBe(false);
    });
  });

  it('accessibility', async () => {
    const tab1 = wrapper.find('#tab-small-one');
    //TODO: Separate describe block for accessibility with single it blocks for each of these expect statements
    expect(tab1.attributes()['aria-selected']).toBe('true');
    expect(tab1.attributes()['role']).toBe('tab');
    expect(wrapper.find('.cdr-tabs__header').attributes()['role']).toBe('presentation');
    expect(wrapper.find('.cdr-tabs__header-container').attributes()['role']).toBe('tablist');
  });

  it('focuses on the selected tab button element', async () => {
    await wrapper.vm.selectTab(1);
    setTimeout(()=>{
      expect(wrapper.findAll('button')[1]).toBe(document.activeElement);
    }, 500);
  });

  it('calculateOverflow', async () => {
    // wrapper.setData({ headerWidth: 2000 });
    await wrapper.vm.$nextTick();
    wrapper.vm.calculateOverflow();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.headerOverflow).toBe(true);
  });
});