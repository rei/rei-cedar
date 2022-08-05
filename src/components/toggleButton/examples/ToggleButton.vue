<template>
  <div>
    <cdr-toggle-group v-model="selected">
      <cdr-toggle-button custom-value="thing-1">Thing 1</cdr-toggle-button>
      <cdr-toggle-button custom-value="thing-2">Thing 2</cdr-toggle-button>
      <cdr-toggle-button custom-value="thing-3">Thing 3</cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-text>Model Value: <strong>{{selected}}</strong></cdr-text>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'ToggleButton',
  components: {
    ...Components,
  },
  data() {
    return {
      selected: 'thing-1'
    }
  }
};
</script>

<style>
</style>