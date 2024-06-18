<template>
  <div :data-palette="palette">
    <div class="radios">
      <div>Toggle palette:</div>
      <cdr-radio
        v-for="pal in palettes"
        :custom-value="pal"
        :key="pal"
        name="palette"
        v-model="palette"
      >
        {{ capitalize(pal) }}
      </cdr-radio>
    </div>
    <cdr-surface
      background="primary"
      p="two-x"
      :with-border="true"
      border-width="sixteenth-x"
      border-color="primary"
    >
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
      palette: this.$route.query.palette || 'default',
      palettes: ['default', 'sandstone'],
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
.radios {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
</style>
