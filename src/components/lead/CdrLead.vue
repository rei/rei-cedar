<script setup lang="ts">
import { useCssModule } from 'vue';

/** Container used for assembling leads */
defineOptions({
  name: 'CdrLead'
});

const style = useCssModule();
const baseClass = 'cdr-lead'
</script>

<template>
  <div :class="style[baseClass]">
    <div :class="style[`${baseClass}__media`]">
      <!-- @slot Media slot -->
      <slot name="media" />
    </div>
    <div :class="style[`${baseClass}__content`]">
      <!-- @slot Content slot -->
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrLead.module.scss">
</style>
