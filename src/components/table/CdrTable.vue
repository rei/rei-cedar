<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type { CdrTableProps } from './types';
import mapClasses from '../../utils/mapClasses';
import { buildBooleanClass } from '../../utils/buildClass';

/** Organizes structured data for users to easily scan, compare, and analyze */
defineOptions({
  name: 'CdrTable',
});

const props = withDefaults(defineProps<CdrTableProps>(), {
  striped: false,
  border: true,
  fullWidth: true,
  responsive: true,
  hover: false,
});

defineSlots<{
  /** CdrTable content (Valid table elements <th>, <tbody>, <tr>, <td>, etc.) */
  'default'(props: Record<string, never>): any;
}>();
const style = useCssModule();
const baseClass = 'cdr-table';
const sizeClass = computed(() => (props.size ? `${baseClass}--${props.size}` : ''));
const stripedClass = computed(() => (props.striped ? `${baseClass}--striped` : ''));
const hoverClass = computed(() => (props.hover ? `${baseClass}--hover` : ''));
const borderClass = computed(() => (props.border && !props.striped ? `${baseClass}--border` : ''));
const fullWidthClass = computed(() =>
  props.fullWidth ? buildBooleanClass(baseClass, props.fullWidth, 'full-width') : '',
);
const wrapperClass = computed(() => (props.responsive ? `${baseClass}--responsive` : ''));
</script>

<template>
  <div :class="style[wrapperClass]">
    <table
      v-bind="$attrs"
      :class="
        mapClasses(
          style,
          baseClass,
          sizeClass,
          stripedClass,
          hoverClass,
          borderClass,
          fullWidthClass,
        )
      "
    >
      <!-- @slot CdrTable content (Valid table elements <th>, <tbody>, <tr>, <td>, etc.) -->
      <slot />
    </table>
  </div>
</template>

<style lang="scss" module src="./styles/CdrTable.module.scss" />
