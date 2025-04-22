<script setup lang="ts">
import { useCssModule, computed, type StyleValue } from 'vue';
import type { surface } from '../../types/interfaces';
import { getSurfaceProps } from '../../utils/surface';

/** Foundational container for creating structured layouts */
defineOptions({ name: 'CdrSurface' });

const props = withDefaults(defineProps<surface & {
  /** URL for the background image */
  backgroundImage?: string;
  /** Value for the background-size CSS property */
  backgroundSize?: string;
  /** Value for the background-position CSS property */
  backgroundPosition?: string;
}>(), {
  tag: 'div',
  backgroundImage: undefined,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const style = useCssModule();

// Use the merged props to compute the root props for the component.
const baseProps = computed(() => getSurfaceProps(props));

// Compute the inline styles for background image properties
const imageStyles = computed(() => {
  const styles: StyleValue = {};
  if (props.backgroundImage) {
    styles['--cdr-surface-background-image'] = `url(${props.backgroundImage})`;
    styles['--cdr-surface-background-size'] = props.backgroundSize;
    styles['--cdr-surface-background-position'] = props.backgroundPosition;
  }
  return styles;
});

// Merge base props and image styles
const rootProps = computed(() => ({
  ...baseProps.value,
  style: imageStyles.value,
}));
</script>

<template>
  <component
    :is="props.tag"
    :class="style['cdr-surface']"
    v-bind="rootProps"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrSurface.module.scss" />
