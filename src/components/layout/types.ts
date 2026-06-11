import type { Component } from 'vue';
import type { Space, Flow, StructureOption, QueryType } from '../../types/componentOptions';
import { layoutGapDemoOptions, flowOptions, queryTypeOptions } from '../../types/componentOptions';

/**
 * Generic key-value pair object allowing any property types
 */
export interface NameValuePair {
  [key: string]: any;
}

/**
 * Properties for foundational layout container using CSS Grid.
 * Provides responsive grid configuration with flow, columns, rows, and gap options.
 */
export interface Layout {
  /**
   * Determines if the layout is in horizontal or vertical mode.
   * @demoSelectMultiple false
   * @values container, media
   */
  queryType?: QueryType;
  /**
   * Specifies the auto-placement behavior. This is translated to `grid-auto-flow`.
   * @demoSelectMultiple false
   * @values row, column
   */
  flow?: Flow;
  /**
   * Specifies how auto-generated tracks will be created. This is translated to either `grid-auto-columns` or `grid-auto-rows`, depending on flow.
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
   * @demoSelectMultiple false
   * @values zero, one-x, two-x, 4, 3--5
   */
  gap?: Space;
  /**
   * Specifies a row gap based on the token options within Cedar.
   * @demoSelectMultiple false
   * @values zero, one-x, two-x, 4, 3--5
   */
  rowGap?: Space;
  /**
   * Specifies a column gap based on the token options within Cedar.
   * @demoSelectMultiple false
   * @values zero, one-x, two-x, 4, 3--5
   */
  columnGap?: Space;
  /**
   * The component or HTML tag to render at the root level. Note: The component "CdrSurface" has special treatment and may be used in quotes.
   */
  as?: Component | string;
  /** Additional properties allowed */
  [key: string]: any;
}

/**
 * CdrLayout component properties
 * Foundational layout container using CSS Grid with responsive configuration
 */
export type CdrLayoutProps = Layout;

export const cdrLayoutQueryTypeOptions = queryTypeOptions;
export const cdrLayoutFlowOptions = flowOptions;
export const cdrLayoutGapOptions = layoutGapDemoOptions;
