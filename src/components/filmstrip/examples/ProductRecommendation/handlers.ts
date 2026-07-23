import type { CdrFilmstripArrowClickPayload, CdrFilmstripScrollPayload } from '../../interfaces';

import type { ProductRecommendation, ProductRecommendationFrameClickPayload } from '.';

const format = (value?: string): string | undefined => value?.replace(/_/g, '-');

export function onFrameClick(payload: unknown): void {
  const { event, item } = payload as ProductRecommendationFrameClickPayload;

  const analytics = {
    rrClickUrl: item.rrClickUrl,
    redirectHref: item.href,
    analyticsConfig: item.analyticsConfig,
  };

  console.log('onFrameClick', { event, item, analytics });
}

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
