import type { CdrSurfaceScrollArrowClickPayload, CdrSurfaceScrollPayload } from '../../../surfaceScroll/interfaces';

import type { ProductRecommendation, ProductRecommendationFrameClickPayload } from '.';

/**
 * Handles frame click events in the filmstrip.
 * Extracts relevant analytics data and logs the event.
 *
 * @param {unknown} payload - The event payload containing details about the clicked frame.
 */
export function onFrameClick(payload: unknown): void {
  const { event, item } = payload as ProductRecommendationFrameClickPayload;

  const analytics = {
    rrClickUrl: item.rrClickUrl, // URL for tracking clicks
    redirectHref: item.href, // Destination URL for navigation
    analyticsConfig: item.analyticsConfig, // Custom analytics config
  };

  console.log('onFrameClick', { event, item, analytics });
}

/**
 * Handles arrow click events in the filmstrip.
 * Determines scroll direction and formats analytics tracking data.
 *
 * @param {unknown} payload - The event payload containing navigation details.
 */
export function onArrowClick(payload: unknown): void {
  const { direction, event, model = {} } = payload as CdrSurfaceScrollArrowClickPayload;
  const { placementName, strategy } = model as Partial<ProductRecommendation>;

  const scrollDirection = direction === 'right' ? 'forwardScroll' : 'backScroll';
  const scrollValue = `scroll-${direction}`;
  const format = (str?: string): string | undefined => str?.replace(/_/g, '-');

  const analytics = {
    rrPlacementName: format(placementName), // Formatted placement name for tracking
    rrStrategy: format(strategy), // Formatted strategy type
    [scrollDirection]: scrollValue, // Scroll direction tracking key
    linkName: `rr_${format(placementName)}_${format(strategy)}_${scrollValue}`, // Analytics event label
  };

  console.log('onArrowClick', { event, direction, analytics });
}

/**
 * Handles scroll navigation events in the filmstrip.
 * Extracts relevant analytics data based on the scrolled-to frame.
 *
 * @param {unknown} payload - The event payload containing scroll details.
 */
export function onScrollNavigate(payload: unknown): void {
  const { index, event, model = {} } = payload as CdrSurfaceScrollPayload;
  const { placementName, strategy } = model as Partial<ProductRecommendation>;

  const format = (str?: string): string | undefined => str?.replace(/_/g, '-');

  const analytics = {
    rrPlacementName: format(placementName), // Formatted placement name
    rrStrategy: format(strategy), // Formatted strategy type
    scrollPosition: index, // Index scrolled to
    linkName: `rr_${format(placementName)}_${format(strategy)}_scroll-${index}`, // Analytics label
  };

  console.log('onScrollNavigate', { index, model, event, analytics });
}
