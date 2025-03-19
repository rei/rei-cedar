<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type { surface } from '../../types/interfaces';
import { getSurfaceProps } from '../../utils/surface';

/** Foundational container for creating structured layouts */
defineOptions({ name: 'CdrSurface' });

const props = withDefaults(defineProps<surface>(), {
  tag: 'div',
});

const style = useCssModule();

// Use the merged props to compute the root props for the component.
const rootProps = computed(() => getSurfaceProps(props));
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
