<template>
  <!-- eslint-disable max-len -->
  <div>
    <h2>
      Tabs
    </h2>

    <tabs-default :background-color="backgroundColor" />
</div>
</template>

<script>
import {
  CdrColorBackgroundPrimary,
  CdrColorBackgroundSecondary,
} from '@rei/cdr-tokens';
import * as Components from 'srcdir/index';
import tabsDefault from 'componentsdir/tabs/examples/demo/TabsDefault';

export default {
  name: 'TabsExample',
  components: { ...Components, tabsDefault },
  data() {
    return {
      tabs: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
      backgroundColor: CdrColorBackgroundPrimary,
    };
  },
  watch: {
    $route(to) {
      this.setBackground(to.query.background);
    },
  },
  mounted() {
    // TODO: why isn't default query showing up? because radio in kitchen sink is disabled?
    this.setBackground(this.$router.currentRoute?.query?.background || 'primary');
  },
  methods: {
    setBackground(background) {
      switch (background) {
        case 'primary':
          this.backgroundColor = CdrColorBackgroundPrimary;
          break;
        case 'secondary':
          this.backgroundColor = CdrColorBackgroundSecondary;
          break;
        default:
          this.backgroundColor = CdrColorBackgroundPrimary;
      }
    },
  },
};
</script>

<style>
  .tab-demo-section {
    margin-bottom: 30px;
  }
</style>
