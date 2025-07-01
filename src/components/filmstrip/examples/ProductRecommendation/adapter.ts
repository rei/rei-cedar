import type { CdrFilmstripAdapter, CdrFilmstripConfig } from '../../interfaces';
import type { CdrSurfaceScrollFrame } from '../../../surfaceScroll/interfaces';
import FrameComponent from './components/ProductRecommendationFrame.vue';
import type { ProductRecommendation, ProductRecommendationFrame } from '.';

/**
 * Resolves a product filmstrip model from raw model data.
 *
 * This function takes `modelData`, extracts relevant product information,
 * and transforms it into a structured filmstrip model that conforms to the
 * `CdrFilmstripConfig<CdrSurfaceScrollFrame>` format.
 *
 * @param {Record<string, unknown>} modelData - The raw data used to populate the filmstrip.
 * @returns {CdrFilmstripConfig<ProductRecommendationFrame>} The resolved product filmstrip model.
 */
export const adapter: CdrFilmstripAdapter<ProductRecommendationFrame> = (modelData) => {
  const { items = [], placementName } = modelData as Partial<ProductRecommendation>;

  /**
   * Determines the filmstrip ID.
   */
  const filmstripId = `product-${placementName || 'unknown'}`;

  /**
   * Transforms raw items into an array of frames for the filmstrip.
   *
   * @type {CdrSurfaceScrollFrame<ProductRecommendationFrame>[]}
   */
  const frames: CdrSurfaceScrollFrame<ProductRecommendationFrame>[] = Array.isArray(items)
    ? items.map((item, index) => ({
        key: `product-frame-${index}`,
        props: item,
      }))
    : [];

  /**
   * Constructs the filmstrip config with the resolved frames and metadata.
   *
   * @type {CdrFilmstripConfig<ProductRecommendationFrame>}
   */
  const filmstripConfig: CdrFilmstripConfig<ProductRecommendationFrame> = {
    component: FrameComponent,
    frames,
    filmstripId,
    description: 'Product filmstrip',
    dataAttributes: {
      'data-placement-name': placementName,
    },
    useDefaultResizeStrategy: true,
  };

  return filmstripConfig;
};

export default adapter;
