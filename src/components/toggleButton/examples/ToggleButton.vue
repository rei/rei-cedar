<template>
  <div>
    <cdr-toggle-group>
      <cdr-toggle-button custom-value="thing-1">Thing 1</cdr-toggle-button>
      <cdr-toggle-button custom-value="thing-2">Thing 2</cdr-toggle-button>
      <cdr-toggle-button custom-value="thing-3">Thing 3</cdr-toggle-button>
    </cdr-toggle-group>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';
import { ref } from 'vue';

export default {
  name: 'ToggleButton',
  components: {
    ...Components,
  },
    data() {
    return { 
      items: ['thing-1', 'thing-2', 'thing-3']
    }
    }
};
</script>

<style>
</style>