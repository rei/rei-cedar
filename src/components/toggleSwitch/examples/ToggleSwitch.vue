<template>
  <div>
    <h2>Toggle Switch</h2>
    <cdr-toggle-switch id="foo-123" label="Pull the Lever Kronk!" :modelValue="kronkLever"
      @update:modelValue="kronkLever = !kronkLever" />

    <img class="kronk" :style="{maxHeight: kronkLever ? '500px' : 0}" src="https://c.tenor.com/hPZScif7OvwAAAAC/pull-lever.gif" alt="">

  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'ToggleSwitch',
  data() {
    return {
      kronkLever: false
    }
  },
  components: {
    ...Components,
  },
};
</script>

<style>
.kronk {
    transition: max-height 1.15s ease-out;
    width: 500px;
}
</style>
