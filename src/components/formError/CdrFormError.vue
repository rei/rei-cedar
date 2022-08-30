<template>
  <div
    :class="style[baseClass]"
    role="status"
  >
    <span :class="style[iconClass]">
      <icon-error-stroke
        size="small"
        inherit-color
      />
    </span>
    <slot name="error">
      <span>{{ error }}</span>
    </slot>
  </div>
</template>

<script>
import { defineComponent, useCssModule } from 'vue';
import IconErrorStroke from '../icon/comps/error-stroke.vue';

export default defineComponent({
  name: 'CdrFormError',
  components: { IconErrorStroke },
  props: {
    error: [Boolean, String],
  },

  setup() {
    return {
      style: useCssModule(),
      baseClass: 'cdr-form-error',
      iconClass: 'cdr-form-error__icon',
    };
  },
});
</script>

<style lang="scss" module src="./styles/CdrFormError.module.scss">
</style>
