import type {
  CdrScrollCarouselAdapter,
  CdrScrollCarouselConfig,
  CdrScrollCarouselSlide,
} from '../../interfaces';
import SlideComponent from './components/ProductRecommendationSlide.vue';
import type { ProductRecommendation, ProductRecommendationSlide } from '.';

/**
 * Resolves a product carousel model from raw model data.
 *
 * This function takes `modelData`, extracts relevant product information,
 * and transforms it into a structured carousel model that conforms to the
 * `CarouselConfig<ProductSlide>` format.
 *
 * @param {Record<string, unknown>} modelData - The raw data used to populate the carousel.
 * @returns {CarouselConfig<ProductRecommendationSlide>} The resolved product carousel model.
 */
export const adapter: CdrScrollCarouselAdapter<ProductRecommendationSlide> = (modelData) => {
  const { items = [], placementName } = modelData as Partial<ProductRecommendation>;

  /**
   * Determines the carousel ID.
   */
  const carouselId = `product-${placementName || 'unknown'}`;

  /**
   * Transforms raw items into an array of slides for the carousel.
   *
   * @type {Slide<ProductRecommendationSlide>[]}
   */
  const slides: CdrScrollCarouselSlide<ProductRecommendationSlide>[] = Array.isArray(items)
    ? items.map((item, index) => ({
        key: `product-slide-${index}`,
        props: item,
      }))
    : [];

  /**
   * Constructs the carousel config with the resolved slides and metadata.
   *
   * @type {CarouselConfig<ProductRecommendationSlide>}
   */
  const carouselConfig: CdrScrollCarouselConfig<ProductRecommendationSlide> = {
    component: SlideComponent,
    slides,
    carouselId,
    description: 'Product carousel',
    dataAttributes: {
      'data-placement-name': placementName,
    },
    useDefaultResizeStrategy: true,
  };

  return carouselConfig;
};

export default adapter;
