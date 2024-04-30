<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import CdrBox from '../box/CdrBox.vue';
import type { SurfaceProps } from '../../types/interfaces';

/** Base component for all other buttons */

defineOptions({ name: 'CdrHeadlessButton' });

export interface CdrHeadlessButtonProps extends SurfaceProps {
  type?: 'button' | 'reset' | 'submit' | undefined;
}

const props = withDefaults(defineProps<CdrHeadlessButtonProps>(), {
  tag: 'button',
  type: undefined,
});

const style = useCssModule();
const baseClass = 'cdr-headless-button';

// Manages the props passed along to CdrBox
const computedProps = computed(() => ({
  ...props,
  surface: props.surface || 'transparent',
  // Automatically apply a type if using button tag
  type: props.tag == 'button' ? props.type || 'button' : undefined,
  class: mapClasses(style, baseClass),
}));
</script>

<template>
  <CdrBox v-bind="computedProps">
    <slot />
  </CdrBox>
</template>

<style lang="scss" module src="./styles/CdrHeadlessButton.module.scss"></style>
