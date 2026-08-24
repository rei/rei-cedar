import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CdrFilmstrip from '../CdrFilmstrip.vue';
import CdrFilmstripEngine from '../CdrFilmstripEngine.vue';
import { defineComponent, h, inject, nextTick } from 'vue';
import { CdrFilmstripEventKey } from '../../../types/symbols';
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
      frameExtra: 0.5,
      framesGap: 10,
      framesToScroll: 2,
      framesToShow: 3,
      isShowingArrows: false,
      useDefaultResizeStrategy: true,
      viewportTabindex: '0',
    }),
  );

  let wrapper: VueWrapper<any>;

  // Helper function to mock window.innerWidth
  const setWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
  };

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
    expect(engine.props('frameExtra')).toBe(0.5);
    expect(engine.props('framesGap')).toBe(10);
    expect(engine.props('framesToScroll')).toBe(2);
    expect(engine.props('framesToShow')).toBe(3);
    expect(engine.props('isShowingArrows')).toBe(false);
    expect(engine.props('viewportTabindex')).toBe('0');
  });

  it('updates adapter-owned layout when the model changes', async () => {
    const adapter = (model: unknown): CdrFilmstripConfig => {
      const { framesToScroll, framesToShow, useDefaultResizeStrategy } = model as {
        framesToScroll: number;
        framesToShow: number;
        useDefaultResizeStrategy: boolean;
      };

      return {
        component: h('div'),
        description: 'Reactive filmstrip',
        filmstripId: 'reactive-filmstrip',
        frames: sampleFrames,
        framesToScroll,
        framesToShow,
        useDefaultResizeStrategy,
      };
    };
    wrapper = mount(CdrFilmstrip, {
      props: {
        adapter,
        model: {
          framesToScroll: 2,
          framesToShow: 3,
          useDefaultResizeStrategy: false,
        },
      },
    });

    await wrapper.setProps({
      model: {
        framesToScroll: 1,
        framesToShow: 2,
        useDefaultResizeStrategy: true,
      },
    });

    const engine = wrapper.findComponent(CdrFilmstripEngine);
    expect(engine.props('framesToShow')).toBe(2);
    expect(engine.props('framesToScroll')).toBe(1);
    expect(wrapper.vm.useDefaultResizeStrategy).toBe(true);
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

  it('adds the model to scroll navigation events', async () => {
    const model = { placement: 'homepage' };
    wrapper = mount(CdrFilmstrip, {
      props: {
        model,
        adapter: mockAdapter,
      },
    });
    const scrollEvent = {
      event: new Event('scroll'),
      index: 2,
    };

    await wrapper.findComponent(CdrFilmstripEngine).vm.$emit('scrollNavigate', scrollEvent);

    expect(wrapper.emitted('scrollNavigate')?.[0]).toEqual([
      {
        ...scrollEvent,
        model,
      },
    ]);
  });

  it('forwards custom events from frame descendants', async () => {
    const FrameComponent = defineComponent({
      setup() {
        const emitFilmstripEvent = inject(CdrFilmstripEventKey);
        return () =>
          h(
            'button',
            {
              onClick: (event: Event) => emitFilmstripEvent?.('frameClick', { event }),
            },
            'Frame',
          );
      },
    });
    wrapper = mount(CdrFilmstrip, {
      props: {
        model: {},
        adapter: () => ({
          component: FrameComponent,
          description: 'Custom event filmstrip',
          filmstripId: 'custom-event',
          frames: [{ key: 'frame', props: {} }],
        }),
      },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('frameClick')).toHaveLength(1);
    expect(wrapper.emitted('frameClick')?.[0][0]).toHaveProperty('event');
  });

  it('updates framesToShow based on window resize (default strategy)', async () => {
    setWindowWidth(1024); // Desktop
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await wrapper.vm.onResize();
    expect(wrapper.vm.framesToShow).toBe(5);

    setWindowWidth(768); // Tablet
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await wrapper.vm.onResize();
    expect(wrapper.vm.framesToShow).toBe(4);

    setWindowWidth(400); // Mobile
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

  it('applies an adapter resize strategy before emitting the legacy resize event', async () => {
    const model = { placement: 'homepage' };
    const resizeStrategy = vi.fn(() => ({
      framesToScroll: 2,
      framesToShow: 3,
    }));
    wrapper = mount(CdrFilmstrip, {
      props: {
        model,
        adapter: () => ({
          component: h('div'),
          description: 'Strategy filmstrip',
          filmstripId: 'strategy-filmstrip',
          frames: sampleFrames,
          framesToScroll: 3,
          framesToShow: 4,
          resizeStrategy,
        }),
      },
    });

    await wrapper.vm.onResize([
      {
        contentRect: { width: 640 },
      } as ResizeObserverEntry,
    ]);

    expect(resizeStrategy).toHaveBeenCalledWith({
      containerWidth: 640,
      model,
      viewportWidth: window.innerWidth,
    });
    expect(wrapper.vm.framesToShow).toBe(3);
    expect(wrapper.vm.framesToScroll).toBe(2);

    const resizePayload = wrapper.emitted('resize')?.at(-1)?.[0] as CdrFilmstripResizePayload;
    expect(resizePayload.framesToShow.value).toBe(3);
    expect(resizePayload.framesToScroll.value).toBe(2);
  });

  it('does not render when the adapter returns no frames', async () => {
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
  });

  it('warns and renders nothing when no adapter is provided', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    wrapper = mount(CdrFilmstrip);

    expect(warn).toHaveBeenCalledWith('No adapter provided for CdrFilmstrip');
    expect(wrapper.findComponent(CdrFilmstripEngine).exists()).toBe(false);
  });

  it('preserves configured frame counts when default resizing is disabled', async () => {
    setWindowWidth(400);
    wrapper = mount(CdrFilmstrip, {
      props: {
        model: {},
        adapter: () => ({
          component: h('div'),
          description: 'Fixed layout filmstrip',
          filmstripId: 'fixed-layout',
          frames: sampleFrames,
          framesToScroll: 2,
          framesToShow: 3,
          useDefaultResizeStrategy: false,
        }),
      },
    });

    await wrapper.vm.onResize();

    expect(wrapper.vm.framesToShow).toBe(3);
    expect(wrapper.vm.framesToScroll).toBe(2);
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
