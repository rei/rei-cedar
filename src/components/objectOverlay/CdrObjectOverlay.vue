<script setup lang="ts">
import { useCssModule, computed, ref, onMounted, nextTick } from 'vue';
import type { ObjectOverlayProps } from '../../types/interfaces';

/** Component for positioning content in 9 different positions relative to a container */

defineOptions({ name: 'CdrObjectOverlay' });

const props = withDefaults(defineProps<ObjectOverlayProps>(), {
  position: 'center-center',
  margin: 'zero',
  tag: 'div',
  gradientTheme: 'dark'
});

// Refs for DOM elements
const containerRef = ref<HTMLElement | null>(null);
const overlayRef = ref<HTMLElement | null>(null);

// Helper function to determine gradient direction based on position
const getGradientDirection = (position: string): string | null => {
  if (position === 'center-center') return null;
  
  if (['left-top', 'center-top', 'right-top'].includes(position)) {
    return 'to-bottom';
  } else if (position === 'left-center') {
    return 'to-right';
  } else if (position === 'right-center') {
    return 'to-left';
  } else if (['left-bottom', 'center-bottom', 'right-bottom'].includes(position)) {
    return 'to-top';
  }
  
  return null;
};

// Helper function to process component properties (position, withGradient)
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

  // Process position property
  if (props.position) {
    Object.assign(component, processComponentProperty('position', props.position));
  }
  
  // Process gradient based on position if withGradient is true
  if (props.withGradient) {
    // Set gradient theme
    if (props.gradientTheme) {
      component['data-gradient-theme'] = props.gradientTheme;
    }
    
    // For responsive positions, we need to determine gradient for each breakpoint
    if (typeof props.position === 'object') {
      Object.entries(props.position).forEach(([mq, pos]) => {
        const direction = getGradientDirection(pos as string);
        if (direction) {
          if (mq === 'xs') {
            component['data-gradient'] = direction;
          } else {
            component[`data-gradient-${mq}`] = direction;
          }
        }
      });
    } else {
      // For single position value
      const direction = getGradientDirection(props.position as string);
      if (direction) {
        component['data-gradient'] = direction;
      }
    }
  }

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

// Function to inherit border radius from container
const inheritBorderRadius = () => {
  if (!containerRef.value || !overlayRef.value) return;
  
  // Get the first child of the container (the actual content element)
  const containerContent = containerRef.value.firstElementChild as HTMLElement;
  if (!containerContent) return;
  
  requestAnimationFrame(() => {
    // Get computed style of the container content
    const computedStyle = window.getComputedStyle(containerContent);
    const borderRadius = computedStyle.borderRadius;

    if (!overlayRef.value) return;
    
    // Apply the same border radius to the overlay component
    if (borderRadius && borderRadius !== '0px') {
      overlayRef.value.style.borderRadius = borderRadius;
    } else {
      // Try to get border-radius from individual properties if the shorthand is not set
      const topLeft = computedStyle.borderTopLeftRadius;
      const topRight = computedStyle.borderTopRightRadius;
      const bottomLeft = computedStyle.borderBottomLeftRadius;
      const bottomRight = computedStyle.borderBottomRightRadius;
      
      if (
        topLeft !== '0px' || topRight !== '0px' || bottomLeft !== '0px' || bottomRight !== '0px'
      ) {
        overlayRef.value.style.borderTopLeftRadius = topLeft;
        overlayRef.value.style.borderTopRightRadius = topRight;
        overlayRef.value.style.borderBottomLeftRadius = bottomLeft;
        overlayRef.value.style.borderBottomRightRadius = bottomRight;
      }
    }
  }); // Small delay to ensure styles are applied
};

// Apply border radius after component is mounted and when it updates
onMounted(() => {
  nextTick(inheritBorderRadius);
  
  // Set up MutationObserver to detect when children are added/changed
  if (containerRef.value) {
    const observer = new MutationObserver(inheritBorderRadius);
    observer.observe(containerRef.value, { 
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }
});

const styles = useCssModule();
</script>

<template>
  <component
    :is="tag"
    :class="styles['cdr-object-overlay']"
    v-bind="attrs.component"
    ref="overlayRef"
  >
    <div
      :class="styles['cdr-object-overlay__container']"
      ref="containerRef"
    >
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