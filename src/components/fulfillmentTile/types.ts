import type { Component } from 'vue';
import type { StatusType } from '../../types/componentOptions';
import type { CdrSurfaceSelectionProps } from '../surfaceSelection/types';

/**
 * Content configuration for CdrFulfillmentTile component.
 */
export interface FulfillmentTileContent {
  /**
   * Sets the type scale for text sizing using Cedar values derived from cdr-tokens CdrTypeKey values.
   * @type TypeScale
   * @values -2, -1, 0, 1
   */
  scale?: '-2' | '-1' | '0' | '1';
}

/**
 * Icon configuration for CdrFulfillmentTile component.
 */
export interface FulfillmentTileIcon {
  /**
   * The intent or type of message being displayed.
   * @values info, warning, success, error, default
   */
  type?: StatusType;
}

/**
 * Layout interface for fulfillment tile
 */
export interface FulfillmentTileLayout {
  /** The component or HTML tag to render at the root level */
  as?: Component | string;
  [key: string]: any;
}

/**
 * CdrFulfillmentTile component properties
 * Selection variant of surface with interactive states for fulfillment options
 */
export type CdrFulfillmentTileProps = CdrSurfaceSelectionProps & {
  /** Layout props that will be merged with selection defaults */
  layout?: FulfillmentTileLayout;
};

/**
 * CdrFulfillmentTileIcon component properties
 */
export type CdrFulfillmentTileIconProps = {
  /** The intent or type of icon being displayed */
  type?: StatusType;
};
