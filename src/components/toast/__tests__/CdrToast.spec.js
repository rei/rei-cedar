import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrToast from '../CdrToast.vue';

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
    wrapper.setProps({ open: true });
    await wrapper.vm.$nextTick();
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()['closed']).toBeDefined();
  });

  it('emits close event after 5 seconds', async () => {
    expect(wrapper.emitted()['closed']).not.toBeDefined();
    vi.useFakeTimers();
    wrapper.setProps({ open: true });
    await wrapper.vm.$nextTick();
    vi.advanceTimersByTime(5500);
    expect(wrapper.emitted()['closed']).toBeDefined();
    vi.useRealTimers();
  });
});
