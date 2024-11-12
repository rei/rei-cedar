import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrToast from '../CdrToast.vue';
import sinon from 'sinon';
import { beforeAll } from 'vitest';

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