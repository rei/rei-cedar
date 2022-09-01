import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrTabs from '../CdrTabs.vue';
import CdrTabPanel from '../CdrTabPanel.vue';
import { h } from 'vue';

describe('CdrTabs', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(CdrTabs, {
      slots: {
        default: [
          h(CdrTabPanel, { name: 'tab1', 'aria-labelledby': 'tab-small-one', }),
          h(CdrTabPanel, { name: 'tab2' }),
          h(CdrTabPanel, { name: 'tab3', disabled: true }),
          h(CdrTabPanel, { name: 'tab4' })
        ],
      },
      attachTo: document.body
    });
  })
  describe('mounted', () => {
    it('mounts tabs', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has the expected number of tabs', () => {
      expect(wrapper.vm.tabs.length).toBe(4);
      expect(wrapper.findAll('button').length).toBe(4);
    });

    it('selects the first index by default', () => {
      expect(wrapper.vm.selectedIndex).toBe(0);
    });

    //TODO: Acceptance or Visual test. These methods never got called in the test. setTimeout is obfuscating that it doesn't work

    // it('mounts with cdr-tab-panel children',  (done) => {
    //   setTimeout(() => { // for debounce
    //     expect(spyCalculateOverflow).toHaveBeenCalled();
    //     expect(spyUpdateUnderline).toHaveBeenCalled();
    //     done();
    //   }, 500);
    // });
  });

  describe('event listeners', () => {
    it('handles scroll event', async () => {
      wrapper.find('.cdr-tabs__header-container').element.dispatchEvent(new Event('scroll'));
      expect(wrapper.vm.overflowLeft).toBe(false);

      //TODO: Acceptance or Visual test. These methods never got called in the test. setTimeout is obfuscating that it doesn't work

      // setTimeout(() => { // for debounce
      //   expect(wrapper.vm.overflowLeft).toBe(false);
      //   expect(spyCalculateOverflow).toHaveBeenCalled();
      //   expect(spyUpdateUnderline).toHaveBeenCalled();
      // }, 600);
    });

    //TODO: Acceptance or Visual test. These methods never got called in the test. setTimeout is obfuscating that it doesn't work

    // it('handles resize event', async () => {
    //   window.dispatchEvent(new Event('resize'));

    // setTimeout(() => { // for debounce
    //   expect(spyGetHeaderWidth).toHaveBeenCalledTimes(2);
    //   expect(spyCalculateOverflow).toHaveBeenCalledTimes(2);
    //   expect(spyUpdateUnderline).toHaveBeenCalledTimes(2);
    // }, 500);
    // });
  });

  it('selectTabNext() selects changes the selectedIndex as expected', () => {
    wrapper.vm.selectedIndex = 0;
    wrapper.vm.selectTabNext();
    expect(wrapper.vm.selectedIndex).toBe(1);
  })

  it('selectTabPrev() selects changes the selectedIndex as expected', () => {
    wrapper.vm.selectedIndex = 1;
    wrapper.vm.selectTabPrev();
    expect(wrapper.vm.selectedIndex).toBe(0);
  })

  it('skips disabled tabs with selectTabNext()', () => {
    wrapper.vm.selectedIndex = 2;
    wrapper.vm.selectTabNext();
    expect(wrapper.vm.selectedIndex).toBe(3);
  })

  it('skips disabled tabs with selectTabPrev()', () => {
    wrapper.vm.selectedIndex = 3;
    wrapper.vm.selectTabPrev();
    expect(wrapper.vm.selectedIndex).toBe(1);
  })

  describe('selectTab()', () => {
    it('changes the selectedIndex', () => {
      wrapper.vm.selectedIndex = 0;
      wrapper.findAll('button')[1].trigger('click');
      expect(wrapper.vm.selectedIndex).toBe(1);
    });
  });

  it('handles right arrow key', () => {
    wrapper.vm.selectedIndex = 0;
    wrapper.findAll('button')[0].trigger('keyup.right');
    expect(wrapper.vm.selectedIndex).toBe(1);
  });

  it('handles left arrow key', async () => {
    wrapper.vm.selectedIndex = 2;
    wrapper.findAll('button')[1].trigger('keyup.left');
    expect(wrapper.vm.selectedIndex).toBe(1);
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

  describe('accessibility', () => {
    let tab1;
    beforeEach(() => {
      tab1 = wrapper.find('#tab-small-one');
    })

    it('selected tab has the expect aria-selected value', async () => {
      expect(tab1.attributes()['aria-selected']).toBe('true');
    });

    it('has the correct tab role', async () => {
      expect(tab1.attributes()['role']).toBe('tab');
    });

    it('the tab header has the correct presentation role', async () => {
      expect(wrapper.find('.cdr-tabs__header').attributes()['role']).toBe('presentation');
    });

    it('the tab container has the correct tablist role', async () => {
      expect(wrapper.find('.cdr-tabs__header-container').attributes()['role']).toBe('tablist');
    });
  })

  it('focuses on the selected tab button element', async () => {
    await wrapper.vm.selectTab(1);
    expect(wrapper.findAll('button')[1].element).toBe(document.activeElement);
  });

  it('calculateOverflow', async () => {
    //wrapper.setProps({ headerWidth: 2000 });
    wrapper.vm.calculateOverflow();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.headerOverflow).toBe(true);
  });
});