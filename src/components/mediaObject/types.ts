import type { Component } from 'vue';
import type {
  Space,
  SpaceOption,
  Flow,
  StructureOption,
  QueryType,
  Position,
  Alignment,
  AlignmentValue,
  MediaMeasurement,
} from '../../types/other';
import {
  alignmentValueOptions,
  mediaObjectContentPaddingDemoOptions,
  positionValueOptions,
} from '../../types/other';

/**
 * Generic key-value pair object allowing any property types
 */
export interface NameValuePair {
  [key: string]: any;
}

/**
 * HtmlAttributes data object for allowing any HTML attribute
 */
export interface HtmlAttributes {
  [key: string]: any;
}

/**
 * Properties for MediaObject component layout configuration.
 * Extends Layout with media-specific positioning and sizing options.
 */
export interface MediaObject {
  /**
   * @ignore
   */
  queryType?: QueryType;
  /**
   * Specifies the auto-placement behavior. This is translated to `grid-auto-flow`.
   */
  flow?: Flow;
  /**
   * Specifies how auto-generated tracks will be created.
   */
  flowValue?: string;
  /**
   * Determines the number of columns at various breakpoints
   */
  columns?: StructureOption;
  /**
   * Determines the number of rows at various breakpoints
   */
  rows?: StructureOption;
  /**
   * Specifies a gap based on the token options within Cedar.
   */
  gap?: Space;
  /**
   * Specifies a row gap based on the token options within Cedar.
   */
  rowGap?: Space;
  /**
   * Specifies a column gap based on the token options within Cedar.
   */
  columnGap?: Space;
  /**
   * The component or HTML tag to render at the root level.
   */
  as?: Component | string;
  /**
   * The alignment of the media and content along the x or y axis, depending on the layout. This can be an object with values for each Cedar breakpoint (xs, sm, md, lg).
   * @values start, center, end
   */
  align?: Alignment;
  /**
   * The position of the media, in relation to the content. This can be an object with values for each Cedar breakpoint (xs, sm, md, lg).
   * @demoSelectMultiple false
   * @values top, right, bottom, left
   */
  mediaPosition?: Position;
  /**
   * The width of the column that media is placed within. This can be any CSS value. This can be an object with values for each Cedar breakpoint (xs, sm, md, lg).
   * @values 1fr, auto, 25%, 50%, 75%, 200px, 50cqh
   */
  mediaWidth?: MediaMeasurement;
  /**
   * The height of the column that media is placed within. This can be any CSS value. This can be an object with values for each Cedar breakpoint (xs, sm, md, lg).
   * @values 1fr, auto, 25%, 50%, 75%, 200px, 50cqw
   */
  mediaHeight?: MediaMeasurement;
  /**
   * This property forces media to take up the full height and width of the media container and positions media to be absolute. Images and videos will still need to be configured with object-fit and object-position.
   */
  mediaCover?: boolean;
  /**
   * Determines if content will overlay the media. A default media height is set, but it is suggested to apply your own using as value such as container width units (cqw) or rem.
   */
  overlay?: boolean;
  /**
   * The alignment of the content along the x axis.
   * @values start, center, end
   */
  overlayRowAlign?: AlignmentValue;
  /**
   * The alignment of the content along the y axis.
   * @values start, center, end
   */
  overlayColumnAlign?: AlignmentValue;
  /**
   * The spacing token to use for padding around the content. This can be an object with values for each Cedar breakpoint (xs, sm, md, lg).
   * @demoSelectMultiple false
   * @values zero, one-x, two-x
   */
  contentPadding?: SpaceOption;
  /** Additional properties allowed */
  [key: string]: any;
}

/**
 * CdrMediaObject component properties
 * Component that pairs images or videos with related text in a consistent way
 */
export type CdrMediaObjectProps = MediaObject;

export const cdrMediaObjectAlignmentOptions = alignmentValueOptions;
export const cdrMediaObjectPositionOptions = positionValueOptions;
export const cdrMediaObjectContentPaddingOptions = mediaObjectContentPaddingDemoOptions;
