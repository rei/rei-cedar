import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrToast from '../CdrToast.vue';
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
describe('CdrToast', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(CdrToast, {
      slots: {
        default: 'toast content',
        'icon-left': '<div />',
      },
    });
  });

  it('matches snapshot', async () => {
    wrapper.setProps({ open: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('handles close triggers', async () => {
    const spyCloseToast = vi.spyOn(wrapper.vm, 'closeToast');
    wrapper.setProps({ open: true });
    await wrapper.vm.$nextTick();
    wrapper.find('button').trigger('click');
    expect(spyCloseToast).toBeCalled();
  });
  //To Do: This one is still not working correctly
  // it('closes after 5 seconds', async () => {
  //   vi.useFakeTimers();
  //   const spyCloseToastWithDelay = vi.spyOn(wrapper.vm, 'closeToastWithDelay');
  //   wrapper.setProps({ open: true });
  //   vi.advanceTimersByTime(5500),
  //   await wrapper.vm.$nextTick();
  //   expect(spyCloseToastWithDelay).toBeCalled();
  // });
});