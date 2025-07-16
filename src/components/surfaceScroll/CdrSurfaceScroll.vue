<script setup lang="ts">
import { useCssModule, ref } from 'vue';
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from 'radix-vue';
import type { CdrSurfaceScroll } from './interfaces';

/** A scrollable surface component that provides custom scrollbars and smooth scrolling behavior */
defineOptions({
  name: 'CdrSurfaceScroll',
});
const props = defineProps<CdrSurfaceScroll>();

const style = useCssModule();

// Expose the viewport ref for external access
const viewportRef = ref<typeof ScrollAreaViewport | null>(null);

defineExpose({ viewportRef });
</script>

<template> 
  <ScrollAreaRoot
    v-bind="props.rootProps"
    :class="style['cdr-surface-scroll__root']"
    type="always"
  >
    <ScrollAreaViewport
      ref="viewportRef"
      v-bind="props.viewportProps"
      :class="style['cdr-surface-scroll__viewport']"
    >
      <slot />
    </ScrollAreaViewport>
    
    <ScrollAreaScrollbar
      v-bind="props.scrollbarProps"
      :class="style['cdr-surface-scroll__bar']"
    >
      <ScrollAreaThumb
        v-bind="props.thumbProps"
        :class="style['cdr-surface-scroll__thumb']"
      />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>

<style module src="./styles/CdrSurfaceScroll.module.scss" lang="scss" />