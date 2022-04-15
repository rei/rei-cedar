import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrTabPanel from 'componentdir/tabs/CdrTabPanel';
// import CdrTabs from 'componentdir/tabs/CdrTabs';
// import Vue from 'vue';


describe('CdrTabPanel', () => {
  it('renders tab', () => {
    const wrapper = mount(CdrTabPanel, {
      propsData: {
        name: 'test',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('is not active by default', () => {
    const wrapper = mount(CdrTabPanel, {
      propsData: {
        name: 'test',
      },
    });
    expect(wrapper.vm.isActive).toBe(false);
  });

  it('is active when the selectedTabName is the same as the tabPanel name', async () => {
    const wrapper = mount(CdrTabPanel, {
      propsData: {
        name: 'test',
      },
      global: {
        provide: {
          selectedTabName: {value: 'test'}
        }
      }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isActive).toBe(true);
  });

  it('is NOT active when the selectedTabName is not the same as the tabPanel name', async () => {
    const wrapper = mount(CdrTabPanel, {
      propsData: {
        name: 'test',
      },
      global: {
        provide: {
          selectedTabName: {value: 'nameofsomedifferentab'}
        }
      }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isActive).toBe(false);
  });

});
