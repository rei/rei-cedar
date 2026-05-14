<script setup lang="ts">
import { useCssModule } from 'vue';
import { CdrTitleProps } from './types';

/**
 * Content building blocks with pre-defined, fluid styles
 * @preview true
 **/
defineOptions({
  name: 'CdrTitle',
});

withDefaults(defineProps<CdrTitleProps>(), {
  tag: 'h1',
});

defineSlots<{
  'default'(props: Record<string, never>): any;
}>();

const style = useCssModule();
const baseClass = 'cdr-title';
</script>

<template>
  <component
    :is="tag"
    :class="style[baseClass]"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrTitle.module.scss" />
