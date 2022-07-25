<template>
  <div>
    <cdr-toggle-button :items="items"/>
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