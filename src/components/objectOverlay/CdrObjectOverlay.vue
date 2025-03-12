<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import {
  ObjectPosition,
  ResponsivePosition,
  ResponsiveSpace,
  Spacing,
  Gradient,
  ResponsiveGradient
} from '../../types/interfaces';

/** Component for positioning content in 9 different positions relative to a container */

defineOptions({ name: 'CdrObjectOverlay' });

interface ObjectOverlayProps {
  /** Gradient to be applied to the container */
  gradient?: ResponsiveGradient | Gradient;
  /** Position of the content relative to the container */
  position?: ResponsivePosition | ObjectPosition;
  /** Margin space around the positioned content */
  margin?: ResponsiveSpace | Spacing;
  /** Padding space around the positioned content */
  padding?: ResponsiveSpace | Spacing;
  /** Sets the HTML tag for the container element */
  tag?: string;
}

const props = withDefaults(defineProps<ObjectOverlayProps>(), {
  position: 'center-center',
  margin: 'zero',
  tag: 'div',
});

const attrs = computed(() => {
  const component: Record<string, string> = {};
  const content: Record<string, any> = {};

  const componentProperties = [
    'position',
    'gradient'
  ];

  componentProperties.forEach((property) => {
    const prop = props[property as keyof typeof props];

    if (typeof prop ==='string') {
      component[`data-${property}`] = prop;
    } else if (typeof prop === 'object') {
      Object.entries(prop).forEach(([mq, value]) => {
        if (mq === 'xs') {
          component[`data-${property}`] = value;
        } else {
          component[`data-${property}-${mq}`] = value;
        }
      });
    }
  });

  const contentProperties = [
    'margin',
    'padding'
  ]

  contentProperties.forEach((property) => {
      const prop = props[property as keyof typeof props];

      if (typeof prop === 'string') {
        content.style = {
          ...(content.style || {}),
          [`--${property}`]: `var(--cdr-space-${prop})`
        };
      } else if (typeof prop === 'object') {
        if (Array.isArray(prop)) {
          content.style = {
            ...content.style,
            [`--${property}`]: prop.map(
              (val) => `var(--cdr-space-${val})`
            ).join(' ')
          };
        } else {
          Object.entries(prop).forEach(([mq, value]) => {
            const val = typeof value === 'string' ? 
              `var(--cdr-space-${value})`
              :
              value.map(
                (v: string) => `var(--cdr-space-${v})`
              ).join(' ');

            content.style = {
              ...content.style,
              [`--${property}-${mq}`]: val
            };
          });
        }
      }
  });

  return {
    component,
    content
  }
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