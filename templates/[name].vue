<script setup lang="ts">
import { useCssModule } from 'vue';

defineOptions({
  name: '{NAME-FULLNAME}',
});

const baseClass = '{NAME-TAGNAME}';
const style = useCssModule();
</script>

<template>
  <div :class="style[baseClass]">
    <slot />
  </div>
</template>

<style lang="scss" module src="./styles/{NAME-FULLNAME}.scss">
</style>
