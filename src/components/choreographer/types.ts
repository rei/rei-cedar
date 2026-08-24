import type { Component } from 'vue';

/**
 * Schema definition for a choreographer component node
 */
export interface ChoreographerSchema {
  /** Component type identifier */
  type?: string;
  /** Component properties */
  props?: object;
  /** Named slots with nested schemas */
  slots?: { [key: string]: ChoreographerSchema };
  /** Content - either text or nested schema */
  content?: string | ChoreographerSchema;
}

/**
 * Map of component names to Vue component definitions
 */
export interface ChoreographerComponents {
  [key: string]: Component;
}

/**
 * CdrChoreographer component properties
 * Dynamic component renderer based on schema configuration
 */
export type CdrChoreographerProps = {
  /** Array of component schemas defining the structure */
  schema: [ChoreographerSchema];
  /** Optional map of custom components to make available */
  components?: ChoreographerComponents;
};
