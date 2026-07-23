import type { CdrFilmstripAdapter, CdrFilmstripConfig, CdrFilmstripFrame } from '../../interfaces';
import FrameComponent from './components/ProductRecommendationFrame.vue';
import type { ProductRecommendation, ProductRecommendationFrame } from '.';

export const adapter: CdrFilmstripAdapter<ProductRecommendationFrame> = (modelData) => {
  const { items = [], placementName } = modelData as Partial<ProductRecommendation>;
  const filmstripId = `product-${placementName || 'unknown'}`;
  const frames: CdrFilmstripFrame<ProductRecommendationFrame>[] = Array.isArray(items)
    ? items.map((item, index) => ({
        key: `product-frame-${index}`,
        props: item,
      }))
    : [];

  return {
    component: FrameComponent,
    frames,
    filmstripId,
    description: 'Product filmstrip',
    dataAttributes: {
      'data-placement-name': placementName,
    },
    useDefaultResizeStrategy: true,
  } satisfies CdrFilmstripConfig<ProductRecommendationFrame>;
};

export default adapter;
