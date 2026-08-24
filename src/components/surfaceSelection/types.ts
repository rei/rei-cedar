import type { Component } from 'vue';
import type { Surface } from '../surface/types';
import type { Layout } from '../layout/types';

/**
 * Layout interface for surface selection
 */
export interface SurfaceSelectionLayout {
  /** The component or HTML tag to render at the root level */
  as?: Component | string;
  [key: string]: any;
}

/**
 * Extended surface interface for selectable/interactive surfaces.
 * Adds support for checked, disabled, and loading states with appropriate ARIA attributes.
 */
export interface SurfaceSelection extends Surface {
  /**
   * Determines if the surface is in a checked state. Adds an `aria-checked` attribute.
   */
  checked?: boolean;
  /**
   * Determines if the surface is in a disabled state.
   */
  disabled?: boolean;
  /**
   * Determines if the surface is in a loading state.
   */
  loading?: boolean;
  /**
   * Determines the ARIA role of the surface. Typically 'radio' or 'checkbox'.
   */
  role?: string;
  /**
   * Layout props that will be merged with selection defaults.
   */
  layout?: Layout;
}

/**
 * CdrSurfaceSelection component properties
 * Extended surface for selectable/interactive surfaces with state management
 */
export type CdrSurfaceSelectionProps = SurfaceSelection;
