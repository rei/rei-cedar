<script setup lang="ts">
import { useCssModule } from 'vue';
import type { CdrChipProps } from './types';

/**
 * CdrChip - Allows people to make selections, filter content, or trigger actions
 *
 * Chips represent discrete pieces of information or actions. Use chips for tags,
 * filters, or selections that users can interact with. Chips can contain text,
 * icons, or both, and can be dismissible.
 */

defineOptions({
  name: 'CdrChip',
});

defineProps<CdrChipProps>();

defineSlots<{
  /** Icon to the left of the content */
  'icon-left'(props: Record<string, never>): any;
  /** Icon to the right of the content */
  'icon-right'(props: Record<string, never>): any;
  /** Primary CdrChip content */
  'default'(props: Record<string, never>): any;
}>();

const style: Record<string, string> = useCssModule();
const baseClass: string = 'cdr-chip';
</script>

<template>
  <button :class="style[baseClass]">
    <span
      v-if="$slots['icon-left']"
      :class="style['cdr-chip__icon-left']"
    >
      <!-- @slot Icon to the left of the content -->
      <slot name="icon-left" />
    </span>
    <span
      v-if="$slots['icon-right']"
      :class="style['cdr-chip__icon-right']"
    >
      <!-- @slot Icon to the right of the content -->
      <slot name="icon-right" />
    </span>
    <span :class="style['cdr-chip__content']">
      <!-- @slot Primary CdrChip content -->
      <slot />
    </span>
  </button>
</template>

<style lang="scss" module src="./styles/CdrChip.module.scss" />
