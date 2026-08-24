import type { CdrFilmstripArrowClickPayload, CdrFilmstripScrollPayload } from '../../interfaces';

import type { ProductRecommendation, ProductRecommendationFrameClickPayload } from '.';

/** Normalizes recommendation identifiers for analytics link names. */
const format = (value?: string): string | undefined => value?.replace(/_/g, '-');

/** Demonstrates the click data available to a frame analytics handler. */
export function onFrameClick(payload: unknown): void {
  const { event, item } = payload as ProductRecommendationFrameClickPayload;

  const analytics = {
    rrClickUrl: item.rrClickUrl,
    redirectHref: item.href,
    analyticsConfig: item.analyticsConfig,
  };

  console.log('onFrameClick', { event, item, analytics });
}

/** Builds arrow-navigation analytics from recommendation placement data. */
export function onArrowClick(payload: unknown): void {
  const { direction, event, model = {} } = payload as CdrFilmstripArrowClickPayload;
  const { placementName, strategy } = model as Partial<ProductRecommendation>;

  const scrollDirection = direction === 'right' ? 'forwardScroll' : 'backScroll';
  const scrollValue = `scroll-${direction}`;

  const analytics = {
    rrPlacementName: format(placementName),
    rrStrategy: format(strategy),
    [scrollDirection]: scrollValue,
    linkName: `rr_${format(placementName)}_${format(strategy)}_${scrollValue}`,
  };

  console.log('onArrowClick', { event, direction, analytics });
}

/** Builds direct-scroll analytics for the first visible product index. */
export function onScrollNavigate(payload: unknown): void {
  const { index, event, model = {} } = payload as CdrFilmstripScrollPayload;
  const { placementName, strategy } = model as Partial<ProductRecommendation>;

  const analytics = {
    rrPlacementName: format(placementName),
    rrStrategy: format(strategy),
    scrollPosition: index,
    linkName: `rr_${format(placementName)}_${format(strategy)}_scroll-${index}`,
  };

  console.log('onScrollNavigate', { index, model, event, analytics });
}
