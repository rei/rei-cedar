<template>
  <div>
    Toggle background palette color:
    <cdr-radio
      v-for="pal in palettes"
      :custom-value="pal"
      :key="pal"
      name="palette"
      v-model="palette"
      class="palette-toggle"
    >
      {{ capitalize(pal) }}
    </cdr-radio>
    <cdr-surface :palette="palette">
      <slot />
    </cdr-surface>
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
      palette: this.$route.query.palette || 'primary',
      palettes: ['primary', 'secondary'],
    };
  },
  watch: {
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

<style>
.palette-toggle {
  display: inline-block;
  margin: 0 8px;
}
</style>
