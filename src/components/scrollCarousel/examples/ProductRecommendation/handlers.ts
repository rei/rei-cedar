import type { CdrScrollCarouselArrowClickPayload } from '../../interfaces';

import type { ProductRecommendation, ProductRecommendationSlideClickPayload } from '.';

/**
 * Handles slide click events in the carousel.
 * Extracts relevant analytics data and logs the event.
 *
 * @param {unknown} payload - The event payload containing details about the clicked slide.
 */
export function onSlideClick(payload: unknown): void {
  const { event, item } = payload as ProductRecommendationSlideClickPayload;

  const analytics = {
    rrClickUrl: item.rrClickUrl, // URL for tracking clicks
    redirectHref: item.href, // Destination URL for navigation
    analyticsConfig: item.analyticsConfig, // Custom analytics config
  };

  console.log('onSlideClick', { event, item, analytics });
}

/**
 * Handles arrow click events in the carousel.
 * Determines scroll direction and formats analytics tracking data.
 *
 * @param {unknown} payload - The event payload containing navigation details.
 */
export function onArrowClick(payload: unknown): void {
  const { direction, event, model = {} } = payload as CdrScrollCarouselArrowClickPayload;
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
