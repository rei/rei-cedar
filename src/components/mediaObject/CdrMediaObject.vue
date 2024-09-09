<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { surfaceSelection } from '../../types/interfaces';

/** Component for buttons that have a checked state. */

defineOptions({ name: 'CdrMediaObject' });

const props = withDefaults(defineProps<surfaceSelection>(), {
  
});

const style = useCssModule();
const baseClass = 'cdr-media-object';

// Manages the props passed along to CdrSurface
const rootProps = computed(() => {
  return { ...additionalProps, class: mapClasses(style, ...classes) || undefined };
});
</script>

<template>
  <component
    :is="tag"
    v-bind="rootProps"
  >
    Test
  </component>
</template>

<style lang="scss" module src="./styles/CdrMediaObject.module.scss"></style>
