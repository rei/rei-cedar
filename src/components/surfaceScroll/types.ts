/**
 * CdrSurfaceScroll component properties
 * A scrollable surface component that provides custom scrollbars and smooth scrolling behavior
 */
export interface CdrSurfaceScrollProps {
  /** Root props passed to ScrollAreaRoot */
  rootProps?: any;
  /** Scrollbar props passed to ScrollAreaScrollbar */
  scrollbarProps?: any;
  /** Thumb props passed to ScrollAreaThumb */
  thumbProps?: any;
  /** Viewport props passed to ScrollAreaViewport */
  viewportProps?: any;
}
