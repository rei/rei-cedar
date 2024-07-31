<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { Status } from '../../types/other';

/** Provides stylized icons for typical notifications */

defineOptions({ name: 'CdrStatusIcon' });

export interface CdrStatusIconProps {
  /**
   * Sets the icon style.
   * @demoSelectMultiple false
   * @values info, warning, success, error, default
   */
  type?: Status;
}

const props = withDefaults(defineProps<CdrStatusIconProps>(), {
  type: 'default',
});

const style = useCssModule();
const baseClass = 'cdr-status-icon';
const typeClass = computed(() => `${baseClass}--${props.type}`);
</script>

<template>
  <span :class="[style[baseClass], style[typeClass]]">
    <slot />
  </span>
</template>

<style lang="scss" module src="./styles/CdrStatusIcon.module.scss"></style>
