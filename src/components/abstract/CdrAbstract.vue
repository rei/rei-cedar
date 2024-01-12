<script setup lang="ts">
import { useCssModule } from 'vue';
import { baseTextProps } from '../../types/interfaces';

/** 
 * Atomic content component used for kickers
 * @preview true
 **/
defineOptions({
  name: 'CdrAbstract',
});

withDefaults(defineProps<baseTextProps>(), {
  tag: 'p',
});

const baseClass = 'cdr-abstract';
const style = useCssModule();
</script>

<template>
  <component
    :is="tag"
    :class="style[baseClass]"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrAbstract.module.scss">
</style>
