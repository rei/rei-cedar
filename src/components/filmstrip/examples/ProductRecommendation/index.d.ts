/** Source model consumed by the product recommendation adapter. */
export interface ProductRecommendation {
  type: string;
  items: ProductRecommendationFrame[];
  message: string;
  /** Recommendation strategy reported with navigation analytics. */
  strategy: string;
  renderTime: string;
  pageAreaName: string;
  /** Placement identifier used in DOM metadata and analytics. */
  placementName: string;
}

/** Product card data passed unchanged from the adapter to the frame component. */
export interface ProductRecommendationFrame {
  id: string;
  href: string;
  name: string;
  brand: string;
  price: Price;
  rating: Rating;
  /** Recommendation-service click tracking URL. */
  rrClickUrl: string;
  analyticsConfig: AnalyticsConfig;
}

/** Single-price or price-range data rendered by the product frame. */
export interface Price {
  /** Current price. Omitted when the value is represented as a range. */
  base?: number;
  isRange: boolean;
  /** Previous or comparison price shown with a single current price. */
  compare?: number;
  max?: number;
  min?: number;
}

/** Aggregate rating rendered with a recommendation. */
export interface Rating {
  count: number;
  average: number;
}

/** Recommendation-service metadata forwarded with frame click analytics. */
export interface AnalyticsConfig {
  linkName: string;
  location: string;
  products: string;
  rrMessage: string;
  rrStrategy: string;
  rrPlacementName: string;
}

/** Payload published by a product frame through `CdrFilmstripEventKey`. */
export interface ProductRecommendationFrameClickPayload {
  /** Original link click event. */
  event: Event;
  /** Product represented by the activated frame. */
  item: ProductRecommendationFrame;
}
