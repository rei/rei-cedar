<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type { CdrListProps } from './types';

/** Groups related content items together either vertically or horizontally */
defineOptions({
  name: 'CdrList',
});

const props = withDefaults(defineProps<CdrListProps>(), {
  tag: 'ul',
});

defineSlots<{
  'default'(props: Record<string, never>): any;
}>();

const style = useCssModule();

const baseClass = 'cdr-list';
const modifierClasses = computed(() =>
  props.modifier ? props.modifier.split(' ').map((mod) => style[`${baseClass}--${mod}`]) : '',
);
</script>

<template>
  <component
    :is="tag"
    :class="[style[baseClass], modifierClasses]"
  >
    <!-- @slot CdrList content (list-items) -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrList.module.scss" />
