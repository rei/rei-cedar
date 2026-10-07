import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CdrFilmstripEngine from '../CdrFilmstripEngine.vue';
import { h, nextTick } from 'vue';
import type { CdrFilmstripArrowClickPayload } from '../interfaces';

const resizeObserver = vi.hoisted(() => ({
  callback: undefined as ((entries: ResizeObserverEntry[]) => void) | undefined,
  stop: vi.fn(),
}));

vi.mock('@vueuse/core', async () => {
  const actual = await vi.importActual('@vueuse/core');
  return {
    ...actual,
    useResizeObserver: (_target: unknown, callback: (entries: ResizeObserverEntry[]) => void) => {
      resizeObserver.callback = callback;
      return { stop: resizeObserver.stop };
    },
  };
});

describe('CdrFilmstripEngine.vue', () => {
  const sampleFrames = [
    { key: 'frame-1', props: { text: 'Frame 1' } },
    { key: 'frame-2', props: { text: 'Frame 2' } },
    { key: 'frame-3', props: { text: 'Frame 3' } },
    { key: 'frame-4', props: { text: 'Frame 4' } },
    { key: 'frame-5', props: { text: 'Frame 5' } },
  ];

  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(CdrFilmstripEngine, {
      attachTo: document.body,
      props: {
        frames: sampleFrames,
        framesToShow: 2,
        framesToScroll: 1,
        isShowingArrows: true,
      },
      slots: {
        frame: (slotProps: { index: number; tabindex: string; [key: string]: any }) =>
          h('button', { tabindex: slotProps.tabindex }, slotProps.text),
      } as any,
    });

    const mockViewport = wrapper.vm.viewportRef?.viewportElement;
    if (mockViewport) {
      mockViewport.scrollBy = vi.fn();
    }
  });

  afterEach(() => {
    wrapper.unmount();
    vi.restoreAllMocks();
    resizeObserver.stop.mockClear();
  });

  it('renders correctly with provided frames', async () => {
    await nextTick();
    expect(wrapper.find('.cdr-surface-scroll__viewport').exists()).toBe(true);
    expect(wrapper.findAll('.cdr-filmstrip__frame')).toHaveLength(sampleFrames.length);
  });

  it('does not break when no frames are provided', async () => {
    wrapper = mount(CdrFilmstripEngine, {
      props: {
        frames: [],
        framesToShow: 2,
        framesToScroll: 1,
        isShowingArrows: true,
      },
    });

    await nextTick();
    expect(wrapper.findAll('.cdr-filmstrip__frame')).toHaveLength(0);
  });

  it('disables left arrow at the start and right arrow at the end', async () => {
    await wrapper.setProps({ isShowingArrows: true });
    await nextTick();

    const leftArrow = wrapper.find('[data-ui="cdr-filmstrip__arrow--left"]');
    const rightArrow = wrapper.find('[data-ui="cdr-filmstrip__arrow--right"]');

    expect(leftArrow.exists()).toBe(true);
    expect(rightArrow.exists()).toBe(true);

    expect(leftArrow.attributes('disabled')).toBeDefined();
    expect(rightArrow.attributes('disabled')).toBeUndefined();

    await wrapper.vm.onArrowClick(new Event('click'), 'right');
    await wrapper.vm.onArrowClick(new Event('click'), 'right');
    await wrapper.vm.onArrowClick(new Event('click'), 'right');

    await nextTick();

    expect(leftArrow.attributes('disabled')).toBeUndefined();
    expect(rightArrow.attributes('disabled')).toBeDefined();
  });

  it('adds the consumer disabled modifier to disabled arrows', () => {
    wrapper = mount(CdrFilmstripEngine, {
      attrs: {
        class: 'custom-filmstrip',
      },
      props: {
        frames: sampleFrames,
        framesToShow: 2,
        isShowingArrows: true,
      },
    });

    const leftArrow = wrapper.find('[data-ui="cdr-filmstrip__arrow--left"]');

    expect(leftArrow.classes()).toContain('custom-filmstrip__arrow--disabled');
  });

  it('moves to the next and previous set of frames when clicking arrows', async () => {
    const rightArrow = wrapper.find('[data-ui="cdr-filmstrip__arrow--right"]');
    const leftArrow = wrapper.find('[data-ui="cdr-filmstrip__arrow--left"]');

    await rightArrow.trigger('click');
    await nextTick();
    expect(wrapper.vm.currentIndex).toBe(1);

    await rightArrow.trigger('click');
    await nextTick();
    expect(wrapper.vm.currentIndex).toBe(2);

    await leftArrow.trigger('click');
    await nextTick();
    expect(wrapper.vm.currentIndex).toBe(1);
  });

  it('stops at the last complete set of visible frames', async () => {
    await wrapper.setProps({
      framesToShow: 2,
      framesToScroll: 4,
    });

    await wrapper.vm.onArrowClick(new Event('click'), 'right');
    await nextTick();

    expect(wrapper.vm.currentIndex).toBe(3);
  });

  it('clamps navigation and focus indexes when the available range shrinks', async () => {
    await wrapper.vm.onArrowClick(new Event('click'), 'right');
    await wrapper.vm.onArrowClick(new Event('click'), 'right');
    await wrapper.vm.onShiftFocus(new Event('keydown'), 'left');

    expect(wrapper.vm.currentIndex).toBe(2);
    expect(wrapper.vm.focusIndex).toBe(sampleFrames.length - 1);

    await wrapper.setProps({
      frames: sampleFrames.slice(0, 2),
      framesToShow: 2,
    });

    expect(wrapper.vm.currentIndex).toBe(0);
    expect(wrapper.vm.focusIndex).toBe(1);
  });

  it('emits arrowClick event when arrow is clicked', async () => {
    const arrowEvent: CdrFilmstripArrowClickPayload = {
      event: new Event('click'),
      direction: 'right',
    };

    await wrapper.vm.onArrowClick(new Event('click'), 'right');
    await nextTick();

    expect(wrapper.emitted('arrowClick')).toBeTruthy();
    expect(wrapper.emitted('arrowClick')?.[0]).toEqual([arrowEvent]);
  });

  it('emits ariaMessage event when scrolling', async () => {
    await wrapper.vm.announceFrames();
    await nextTick();

    expect(wrapper.emitted('ariaMessage')).toBeTruthy();
    expect(wrapper.emitted('ariaMessage')?.[0][0]).toContain('Now showing frames');
  });

  it('emits ariaMessage event when focus enters', async () => {
    const focusEvent = new FocusEvent('focusin');
    await wrapper.vm.handleFocusIn(focusEvent);
    await nextTick();

    expect(wrapper.emitted('ariaMessage')).toBeTruthy();
    expect(wrapper.emitted('ariaMessage')?.[0][0]).toContain('Showing');
  });

  it('announces a single visible frame', async () => {
    await wrapper.setProps({ framesToShow: 1 });

    await wrapper.vm.announceFrames();
    await wrapper.vm.handleFocusIn(new FocusEvent('focusin'));

    expect(wrapper.emitted('ariaMessage')).toEqual([
      ['Now showing frame 1 of 5'],
      ['Showing frame 1 of 5. Use left and right arrow keys to navigate.'],
    ]);
  });

  it('does not announce when focus moves within the filmstrip', async () => {
    const container = wrapper.element as HTMLElement;
    const child = container.querySelector('button');

    await wrapper.vm.handleFocusIn({
      currentTarget: container,
      relatedTarget: child,
    } as unknown as FocusEvent);

    expect(wrapper.emitted('ariaMessage')).toBeUndefined();
  });

  it('moves focus between frames and wraps at each boundary', async () => {
    const frameItems = wrapper.findAll('.cdr-filmstrip__frame');
    const lastButton = frameItems.at(-1)?.find('button');

    await frameItems[0].trigger('keydown', { key: 'ArrowLeft' });
    expect(wrapper.vm.focusIndex).toBe(sampleFrames.length - 1);
    expect(lastButton?.element).toBe(document.activeElement);

    await frameItems.at(-1)?.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.vm.focusIndex).toBe(0);
    expect(frameItems[0].find('button').element).toBe(document.activeElement);
  });

  it('emits manual scroll navigation and announces a changed frame', async () => {
    wrapper.vm.containerWidth = 500;
    await nextTick();

    const scrollTarget = document.createElement('div');
    scrollTarget.scrollLeft = wrapper.vm.calculateScrollPosition(2);
    const scrollEvent = { target: scrollTarget } as unknown as Event;

    await wrapper.vm.debouncedHandleScroll(scrollEvent);
    await wrapper.vm.announceFrames();

    expect(wrapper.vm.currentIndex).toBe(2);
    expect(wrapper.emitted('scrollNavigate')?.[0]).toEqual([
      {
        event: scrollEvent,
        index: 2,
      },
    ]);
    expect(wrapper.emitted('ariaMessage')?.at(-1)).toEqual(['Now showing frames 3 through 4 of 5']);
  });

  it('suppresses manual navigation events during programmatic scrolling', async () => {
    const clickEvent = new Event('click');
    await wrapper.vm.onArrowClick(clickEvent, 'right');

    const scrollTarget = document.createElement('div');
    scrollTarget.scrollLeft = wrapper.vm.calculateScrollPosition(1);
    await wrapper.vm.debouncedHandleScroll({
      target: scrollTarget,
    } as unknown as Event);

    expect(wrapper.emitted('scrollNavigate')).toBeUndefined();
  });

  it('hides default arrows when arrow navigation is disabled', async () => {
    await wrapper.setProps({ isShowingArrows: false });

    expect(wrapper.find('[data-ui="cdr-filmstrip__arrow--left"]').exists()).toBe(false);
    expect(wrapper.find('[data-ui="cdr-filmstrip__arrow--right"]').exists()).toBe(false);
  });

  it('keeps enabled arrows keyboard-focusable without JavaScript hover state', () => {
    wrapper = mount(CdrFilmstripEngine, {
      attachTo: document.body,
      props: {
        frames: sampleFrames,
        framesToShow: 2,
        isShowingArrows: true,
      },
    });

    const rightArrow = wrapper.find('[data-ui="cdr-filmstrip__arrow--right"]');
    (rightArrow.element as HTMLElement).focus();

    expect(rightArrow.exists()).toBe(true);
    expect(rightArrow.element).toBe(document.activeElement);
  });

  it('updates frame width when resizing', async () => {
    resizeObserver.callback?.([
      {
        contentRect: { width: 800 },
      } as ResizeObserverEntry,
    ]);
    await nextTick();

    expect(wrapper.vm.containerWidth).toBe(800);
    expect(wrapper.vm.frameWidth).toBeGreaterThan(0);
  });

  it('stops observing resize when unmounted', () => {
    wrapper.unmount();

    expect(resizeObserver.stop).toHaveBeenCalledOnce();
  });
});
