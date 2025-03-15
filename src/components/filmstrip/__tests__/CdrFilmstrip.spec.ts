import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CdrFilmstripEngine from '../CdrFilmstripEngine.vue';
import { nextTick, ref } from 'vue';

vi.mock('@vueuse/core', async () => {
  const actual = await vi.importActual('@vueuse/core');
  return {
    ...actual,
    useElementHover: () => ref(true), // Force hover state to be true
  };
});

describe('CdrFilmstripEngine', () => {
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
      props: { frames: sampleFrames, framesToShow: 2, framesToScroll: 1, isShowingArrows: true },
    });

    // **Mock `scrollBy()` on viewport element**
    const mockViewport = wrapper.vm.framesRef?.viewportElement;
    if (mockViewport) {
      mockViewport.scrollBy = vi.fn(); // Mock as a no-op function
    }
  });

  it('renders correctly with provided frames', async () => {
    await nextTick();
    expect(wrapper.find('.cdr-filmstrip__viewport').exists()).toBe(true);
    expect(wrapper.findAll('.cdr-filmstrip__frame')).toHaveLength(sampleFrames.length);
  });

  it('shows arrows when isShowingArrows is true', async () => {
    await wrapper.setProps({ isShowingArrows: true });
    await nextTick();

    expect(wrapper.find('[data-ui="cdr-filmstrip__arrow--left"]').exists()).toBe(true);
    expect(wrapper.find('[data-ui="cdr-filmstrip__arrow--right"]').exists()).toBe(true);
  });

  it('disables left arrow at the start and right arrow at the end', async () => {
    await wrapper.setProps({ isShowingArrows: true });
    await nextTick();

    const leftArrow = wrapper.find('[data-ui="cdr-filmstrip__arrow--left"]');
    const rightArrow = wrapper.find('[data-ui="cdr-filmstrip__arrow--right"]');

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

  // it('emits arrowClick event with correct payload', async () => {
  //   const emitSpy = vi.spyOn(wrapper.vm, '$emit');

  //   await wrapper.vm.onArrowClick(new Event('click'), 'right');
  //   await nextTick();

  //   expect(emitSpy).toHaveBeenCalledWith(
  //     'arrowClick',
  //     expect.objectContaining({ direction: 'right' }),
  //   );

  //   await wrapper.vm.onArrowClick(new Event('click'), 'left');
  //   await nextTick();

  //   expect(emitSpy).toHaveBeenCalledWith(
  //     'arrowClick',
  //     expect.objectContaining({ direction: 'left' }),
  //   );
  // });

  // it('updates correctly when frames prop changes', async () => {
  //   await wrapper.setProps({
  //     frames: [
  //       { key: 'frame-6', props: { text: 'Frame 6' } },
  //       { key: 'frame-7', props: { text: 'Frame 7' } },
  //     ],
  //   });

  //   await nextTick();
  //   expect(wrapper.findAll('.cdr-filmstrip__frame')).toHaveLength(2);
  // });

  // it('handles keyboard navigation correctly', async () => {
  //   const viewport = wrapper.find('.cdr-filmstrip__viewport');
  //   await viewport.trigger('keydown', { key: 'ArrowRight' });

  //   await nextTick();
  //   expect(wrapper.vm.currentIndex).toBe(1);

  //   await viewport.trigger('keydown', { key: 'ArrowLeft' });
  //   await nextTick();
  //   expect(wrapper.vm.currentIndex).toBe(0);
  // });

  // it('resizes correctly when container width changes', async () => {
  //   const container = wrapper.vm.containerRef;
  //   expect(container).not.toBeNull();

  //   const mockResizeObserverCallback = vi.fn();
  //   const resizeObserver = new ResizeObserver((entries) => {
  //     entries.forEach(() => mockResizeObserverCallback());
  //   });

  //   resizeObserver.observe(container);
  //   await nextTick();

  //   expect(mockResizeObserverCallback).toHaveBeenCalled();
  // });

  // it('manages focus correctly', async () => {
  //   const frames = wrapper.findAll('.cdr-filmstrip__frame');
  //   await frames[1].trigger('focusin');

  //   await nextTick();
  //   expect(wrapper.vm.focusIndex).toBe(1);

  //   await frames[0].trigger('focusin');
  //   await nextTick();
  //   expect(wrapper.vm.focusIndex).toBe(0);
  // });

  // it('announces frames to screen readers when scrolling', async () => {
  //   const mockAnnounceFrames = vi.fn();
  //   wrapper.vm.announceFrames = mockAnnounceFrames;

  //   await wrapper.vm.onArrowClick(new Event('click'), 'right');
  //   await nextTick();

  //   expect(mockAnnounceFrames).toHaveBeenCalled();
  // });
});
