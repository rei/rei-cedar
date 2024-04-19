<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import CdrUnstyledButton, {
  type CdrUnstyledButtonProps,
} from '../unstyledButton/CdrUnstyledButton.vue';

/** Base component for styled buttons */

defineOptions({ name: 'CdrStyledButton' });

export interface CdrStyledButtonProps extends CdrUnstyledButtonProps {}

const props = withDefaults(defineProps<CdrStyledButtonProps>(), {});

const style = useCssModule();
const baseClass = 'cdr-styled-button';

// Manages the props passed along to CdrBox
const computedProps = computed(() => ({
  ...props,
  // Automatically apply a type if using button tag
  type: props.tag == 'button' ? props.type || 'button' : undefined,
  class: mapClasses(style, baseClass),
}));
</script>

<template>
  <CdrUnstyledButton v-bind="computedProps">
    <slot />
  </CdrUnstyledButton>
</template>

<style lang="scss" module src="./styles/CdrStyledButton.module.scss"></style>
