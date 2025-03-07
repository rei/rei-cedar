/**
 * Represents the model for recommended products in the carousel.
 * Maps to the main structure in the schema.json.
 */
export interface ProductRecommendation {
  /** Type of the recommended product carousel. */
  type: string;
  /** List of slides containing recommended product details. */
  items: ProductRecommendationSlide[];
  /** Message associated with the recommended products. */
  message: string;
  /** Strategy used for recommending products. */
  strategy: string;
  /** Time when the carousel is rendered. */
  renderTime: string;
  /** Name of the page area where the carousel is placed. */
  pageAreaName: string;
  /** Name of the placement for the carousel. */
  placementName: string;
}

/**
 * Represents a single slide containing details about a recommended product.
 * Maps to the items structure in the schema.json.
 */
export interface ProductRecommendationSlide {
  /** Unique identifier for the product. */
  id: string;
  /** URL to navigate to when the product is clicked. */
  href: string;
  /** Name of the product. */
  name: string;
  /** Brand of the product. */
  brand: string;
  /** Pricing details of the product. */
  price: Price;
  /** Rating details of the product. */
  rating: Rating;
  /** Click tracking URL for the product. */
  rrClickUrl: string;
  /** Analytics configuration for the product. */
  analyticsConfig: AnalyticsConfig;
}

/**
 * Represents the price details of a product.
 * Maps to the price structure in the schema.json.
 */
export interface Price {
  /** Base price of the product. May be undefined if part of a range. */
  base?: number;
  /** Indicates if the price is a range. */
  isRange: boolean;
  /** Compare at price for discount or comparison purposes. */
  compare?: number;
  /** Maximum price in the range. */
  max?: number;
  /** Minimum price in the range. */
  min?: number;
}

/**
 * Represents the rating details of a product.
 * Maps to the rating structure in the schema.json.
 */
export interface Rating {
  /** Number of ratings the product has received. */
  count: number;
  /** Average rating of the product. */
  average: number;
}

/**
 * Represents the analytics configuration for a product.
 * Maps to the analyticsConfig structure in the schema.json.
 */
export interface AnalyticsConfig {
  /** Name associated with the analytics link. */
  linkName: string;
  /** Location where the product is displayed. */
  location: string;
  /** Products related to the current product for analytics purposes. */
  products: string;
  /** Message used for analytics reporting. */
  rrMessage: string;
  /** Strategy type for analytics tracking. */
  rrStrategy: string;
  /** Placement name for analytics tracking. */
  rrPlacementName: string;
}

/**
 * Payload for slide click events in the carousel.
 * Contains event and item details.
 */
export interface ProductRecommendationSlideClickPayload {
  /** The event triggered by the slide click. */
  event: Event;
  /** The slide item that was clicked. */
  item: ProductRecommendationSlide;
}
