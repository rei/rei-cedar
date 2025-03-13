<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type { ObjectOverlayProps } from '../../types/interfaces';

/** Component for positioning content in 9 different positions relative to a container */

defineOptions({ name: 'CdrObjectOverlay' });

const props = withDefaults(defineProps<ObjectOverlayProps>(), {
  position: 'center-center',
  margin: 'zero',
  tag: 'div',
});

// Helper function to process component properties (position, gradient)
const processComponentProperty = (property: string, prop: any): Record<string, string> => {
  const result: Record<string, string> = {};
  
  try {
    if (typeof prop === 'string') {
      result[`data-${property}`] = prop;
    } else if (typeof prop === 'object' && prop !== null) {
      Object.entries(prop).forEach(([mq, value]) => {
        if (mq === 'xs') {
          result[`data-${property}`] = String(value);
        } else {
          result[`data-${property}-${mq}`] = String(value);
        }
      });
    }
  } catch (error) {
    console.error(`Error processing ${property}:`, error);
  }
  
  return result;
};

// Helper function to create CSS variable references
const createCssVar = (space: string): string => `var(--cdr-space-${space})`;

// Helper function to process content properties (margin, padding)
const processContentProperty = (
  property: string, 
  prop: string | string[] | Record<string, string | string[]>,
  existingStyle: Record<string, string> = {}
): Record<string, string> => {
  const style = { ...existingStyle };
  
  try {
    if (typeof prop === 'string') {
      style[`--${property}`] = createCssVar(prop);
    } else if (Array.isArray(prop)) {
      style[`--${property}`] = prop.map(createCssVar).join(' ');
    } else if (typeof prop === 'object' && prop !== null) {
      Object.entries(prop).forEach(([mq, value]) => {
        const val = typeof value === 'string' 
          ? createCssVar(value)
          : (value as string[]).map(createCssVar).join(' ');

        style[`--${property}-${mq}`] = val;
      });
    }
  } catch (error) {
    console.error(`Error processing ${property}:`, error);
  }
  
  return style;
};

const attrs = computed(() => {
  const component: Record<string, string> = {};
  const content: Record<string, any> = { style: {} };

  // Process component properties
  ['position', 'gradient'].forEach((property) => {
    const prop = props[property as keyof typeof props];
    if (prop) {
      Object.assign(component, processComponentProperty(property, prop));
    }
  });

  // Process content properties
  ['margin', 'padding'].forEach((property) => {
    const prop = props[property as keyof typeof props];
    if (prop) {
      content.style = processContentProperty(
        property, 
        prop as string | string[] | Record<string, string | string[]>,
        content.style
      );
    }
  });

  return {
    component,
    content
  };
});

const styles = useCssModule();
</script>

<template>
  <component
    :is="tag"
    :class="styles['cdr-object-overlay']"
    v-bind="attrs.component"
  >
    <div :class="styles['cdr-object-overlay__container']">
      <!-- @slot Container content that the overlay will be positioned relative to -->
      <slot name="container" />
    </div>
    <div
      :class="styles['cdr-object-overlay__content']"
      v-bind="attrs.content"
    >
      <!-- @slot Content to be positioned -->
      <slot name="content" />
    </div>
  </component>
</template>

<style lang="scss" module src="./styles/CdrObjectOverlay.module.scss" />