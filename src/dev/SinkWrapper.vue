<template>
  <div :data-palette="palette">
    <div class="sink-wrapper__radios">
      <div>Toggle palette:</div>
      <CdrRadio
        v-for="pal in palettes"
        :custom-value="pal"
        :key="pal"
        name="palette"
        v-model="palette"
      >
        {{ capitalize(pal) }}
      </CdrRadio>
    </div>
    <CdrSurface
      background="primary"
      border-style="solid"
      border-width="sixteenth-x"
      border-color="primary"
      class="sink-wrapper__container"
    >
      <slot />
    </CdrSurface>
  </div>
</template>

<script>
import { CdrRadio, CdrSurface } from 'srcdir/lib';
import { upperFirst } from 'lodash-es';

export default {
  name: 'SinkWrapper',
  components: {
    CdrRadio,
    CdrSurface,
  },
  data() {
    return {
      palette: this.$route.query.palette || 'default',
      palettes: ['default', 'sandstone', 'membership-vibrant', 'membership-subtle'],
    };
  },
  watch: {
    '$route.query.palette': {
      immediate: true,
      handler(newValue) {
        this.palette = newValue || 'default';
      }
    },
    palette() {
      this.$router.replace({
        path: this.$route.path,
        query: {
          palette: this.palette,
        },
      });
    },
  },
  methods: {
    capitalize(str) {
      return upperFirst(str);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.sink-wrapper {
  &__radios {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    container-type: inline-size;
  }

  &__container {
    padding: $cdr-space-two-x;
  }
}
</style>
