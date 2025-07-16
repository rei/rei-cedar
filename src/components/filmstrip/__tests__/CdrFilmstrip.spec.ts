import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CdrFilmstrip from '../CdrFilmstrip.vue';
import CdrFilmstripEngine from '../CdrFilmstripEngine.vue';
import { h, nextTick } from 'vue';
import type {
  CdrFilmstripFrame,
  CdrFilmstripConfig,
  CdrFilmstripArrowClickPayload,
  CdrFilmstripResizePayload,
} from '../interfaces';

describe('CdrFilmstrip.vue', () => {
  const sampleFrames: CdrFilmstripFrame[] = [
    { key: 'frame-1', props: { text: 'Frame 1' } },
    { key: 'frame-2', props: { text: 'Frame 2' } },
    { key: 'frame-3', props: { text: 'Frame 3' } },
    { key: 'frame-4', props: { text: 'Frame 4' } },
    { key: 'frame-5', props: { text: 'Frame 5' } },
  ];

  const mockAdapter = vi.fn(
    (): CdrFilmstripConfig => ({
      frames: sampleFrames,
      filmstripId: 'test-filmstrip',
      component: h('div'),
      description: 'Test filmstrip description',
      framesGap: 10,
      framesToShow: 3,
      useDefaultResizeStrategy: true,
    }),
  );

  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(CdrFilmstrip, {
      props: {
        model: {},
        adapter: mockAdapter,
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ✅ 1. Basic Rendering
  it('renders correctly when frames exist', async () => {
    await nextTick();
    expect(wrapper.findComponent(CdrFilmstripEngine).exists()).toBe(true);
    expect(wrapper.find('[data-ui="cdr-filmstrip__frames"]').exists()).toBe(true);
  });

  it('does not render when there are no frames', async () => {
    mockAdapter.mockReturnValueOnce({
      frames: [],
      filmstripId: 'empty-filmstrip',
      component: h('div'),
      description: 'Empty',
    });

    wrapper = mount(CdrFilmstrip, {
      props: {
        model: {},
        adapter: mockAdapter,
      },
    });

    await nextTick();
    expect(wrapper.findComponent(CdrFilmstripEngine).exists()).toBe(false);
  });

  // ✅ 2. Prop forwarding
  it('passes the correct props to CdrFilmstripEngine', async () => {
    await nextTick();
    const engine = wrapper.findComponent(CdrFilmstripEngine);

    expect(engine.props('id')).toMatch(/^test-filmstrip/);
    expect(engine.props('description')).toBe('Test filmstrip description');
    expect(engine.props('framesGap')).toBe(10);
    expect(engine.props('framesToShow')).toBe(3);
  });

  // ✅ 3. Event Bubbling
  it('bubbles up ariaMessage event to the parent', async () => {
    const message = 'Now showing frames 1-3';
    await wrapper.findComponent(CdrFilmstripEngine).vm.$emit('ariaMessage', message);
    await nextTick();

    expect(wrapper.emitted('ariaMessage')).toBeTruthy();
    expect(wrapper.emitted('ariaMessage')?.[0]).toEqual([message]);
  });

  it('bubbles up arrowClick event with the correct payload', async () => {
    const arrowEvent: CdrFilmstripArrowClickPayload = {
      event: new Event('click'),
      direction: 'right',
      model: {},
    };

    await wrapper.findComponent(CdrFilmstripEngine).vm.$emit('arrowClick', arrowEvent);
    await nextTick();

    expect(wrapper.emitted('arrowClick')).toBeTruthy();
    expect(wrapper.emitted('arrowClick')?.[0]).toEqual([arrowEvent]);
  });

  it('updates framesToShow based on window resize (default strategy)', async () => {
    global.innerWidth = 1024; // Desktop
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await wrapper.vm.onResize();
    expect(wrapper.vm.framesToShow).toBe(5);

    global.innerWidth = 768; // Tablet
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await wrapper.vm.onResize();
    expect(wrapper.vm.framesToShow).toBe(4);

    global.innerWidth = 400; // Mobile
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await wrapper.vm.onResize();
    expect(wrapper.vm.framesToShow).toBe(2);
  });

  it('emits a resize event with updated framesToShow and framesToScroll', async () => {
    await nextTick();

    window.dispatchEvent(new Event('resize'));
    await wrapper.vm.onResize();
    await nextTick();

    expect(wrapper.emitted('resize')).toBeTruthy();
    const resizePayload = wrapper.emitted('resize')?.[0]?.[0] as CdrFilmstripResizePayload;

    expect(resizePayload.framesToShow.value).toBe(wrapper.vm.framesToShow);
    expect(resizePayload.framesToScroll.value).toBe(Math.max(wrapper.vm.framesToShow - 1, 1));
  });

  it('handles case when no adapter is provided', async () => {
    wrapper = mount(CdrFilmstrip, {
      props: {
        model: {},
        adapter: () => ({
          frames: [],
          filmstripId: 'default-filmstrip',
          component: h('div'),
          description: 'Default test filmstrip',
        }),
      },
    });

    await nextTick();

    expect(wrapper.findComponent(CdrFilmstripEngine).exists()).toBe(false);

    // ✅ Instead of checking <div>, check the `hasFilmstripFrames` computed value
    expect(wrapper.vm.hasFilmstripFrames).toBe(false);
  });

  it('sets focusSelector correctly', async () => {
    await nextTick();
    expect(wrapper.vm.focusSelector).toBe(':first-child');
  });

  it('does not break when an empty model is passed', async () => {
    wrapper = mount(CdrFilmstrip, {
      props: {
        model: {},
        adapter: () => ({
          frames: [],
          filmstripId: 'empty',
          component: h('div'),
          description: 'Test filmstrip description',
        }),
      },
    });

    await nextTick();
    expect(wrapper.findComponent(CdrFilmstripEngine).exists()).toBe(false);
  });
});
