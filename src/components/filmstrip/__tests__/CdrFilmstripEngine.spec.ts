import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CdrFilmstripEngine from '../CdrFilmstripEngine.vue';
import { nextTick, ref } from 'vue';
import type { CdrFilmstripArrowClickPayload } from '../interfaces';

vi.mock('@vueuse/core', async () => {
  const actual = await vi.importActual('@vueuse/core');
  return {
    ...actual,
    useElementHover: () => ref(true), // Mock hover state as always true
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
      props: {
        frames: sampleFrames,
        framesToShow: 2,
        framesToScroll: 1,
        isShowingArrows: true,
      },
    });

    // Mock `scrollBy()` on the viewport element
    const mockViewport = wrapper.vm.viewportRef?.viewportElement;
    if (mockViewport) {
      mockViewport.scrollBy = vi.fn(); // Mock as a no-op function
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ✅ 1. Basic Rendering
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

  // ✅ 2. Arrow Navigation
  it('disables left arrow at the start and right arrow at the end', async () => {
    await wrapper.setProps({ isShowingArrows: true });
    await nextTick();

    const leftArrow = wrapper.find('[data-ui="cdr-filmstrip__arrow--left"]');
    const rightArrow = wrapper.find('[data-ui="cdr-filmstrip__arrow--right"]');

    expect(leftArrow.exists()).toBe(true);
    expect(rightArrow.exists()).toBe(true);

    expect(leftArrow.attributes('disabled')).toBeDefined();
    expect(rightArrow.attributes('disabled')).toBeUndefined();

    // Move to the last frame
    await wrapper.vm.onArrowClick(new Event('click'), 'right');
    await wrapper.vm.onArrowClick(new Event('click'), 'right');
    await wrapper.vm.onArrowClick(new Event('click'), 'right');

    await nextTick();

    expect(leftArrow.attributes('disabled')).toBeUndefined();
    expect(rightArrow.attributes('disabled')).toBeDefined();
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

  // ✅ 3. Accessibility
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

  // ✅ 4. Responsive Behavior
  it('updates frame width when resizing', async () => {
    const initialWidth = wrapper.vm.frameWidth;
    wrapper.vm.containerWidth = 800;
    await nextTick();

    expect(wrapper.vm.frameWidth).not.toBe(initialWidth);
  });
});
