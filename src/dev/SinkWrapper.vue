<template>
  <div :data-layer="'cdr-' + cdrLayer">
    Toggle layer color:
    <cdr-radio
      v-for="layer in layers"
      :custom-value="layer"
      :key="layer"
      name="layer"
      v-model="cdrLayer"
      class="layer-toggle"
    >
      {{ capitalize(layer) }}
    </cdr-radio>
    <slot />
  </div>
</template>

<script>
import { CdrRadio } from 'srcdir/lib';
import upperFirst from 'lodash-es/upperFirst';

export default {
  name: 'SinkWrapper',
  components: {
    CdrRadio,
  },
  data() {
    return {
      cdrLayer: this.$route.query.cdrLayer || 'primary',
      layers: ['primary', 'secondary', 'brand'],
    };
  },
  computed: {
    backgroundClass() {
      return `cdr-layer-${this.cdrLayer}`;
    },
  },
  watch: {
    cdrLayer() {
      this.$router.replace({
        path: this.$route.path,
        query: {
          cdrLayer: this.cdrLayer,
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

<style>
.layer-toggle {
  display: inline-block;
  margin: 0 8px;
}
</style>
