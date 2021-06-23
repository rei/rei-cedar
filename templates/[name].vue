<template>
  <div :class="$style[baseClass]">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: '{NAME-FULLNAME}',
  setup(props) {
    const baseClass = '{NAME-TAGNAME}';
    return {
      baseClass,
    };
  },
});
</script>

<style lang="scss" module src="./styles/{NAME-FULLNAME}.scss">
</style>
