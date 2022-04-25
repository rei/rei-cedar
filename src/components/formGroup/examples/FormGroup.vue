<template>
  <div>
    <checkboxes />
    <radios />
    <multi />
  </div>
</template>

<script>
import checkboxes from 'componentsdir/formGroup/examples/demo/Checkboxes.vue';
import radios from 'componentsdir/formGroup/examples/demo/Radios.vue';
import multi from 'componentsdir/formGroup/examples/demo/Multi.vue';

export default {
  name: 'FormGroup',
  components: {
    checkboxes,
    radios,
    multi,
  },
};
</script>

<style>
</style>
