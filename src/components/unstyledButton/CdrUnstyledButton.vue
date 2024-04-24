<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import CdrBox, { type CdrBoxProps } from '../box/CdrBox.vue';

/** Base component for all other buttons */

defineOptions({ name: 'CdrUnstyledButton' });

export interface CdrUnstyledButtonProps extends CdrBoxProps {
  type?: 'button' | 'reset' | 'submit' | undefined;
}

const props = withDefaults(defineProps<CdrUnstyledButtonProps>(), {
  tag: 'button',
  type: undefined,
});

const style = useCssModule();
const baseClass = 'cdr-unstyled-button';

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

<style lang="scss" module src="./styles/CdrUnstyledButton.module.scss"></style>
