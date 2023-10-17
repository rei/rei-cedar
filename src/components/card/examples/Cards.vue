<template>
  <div data-backstop="simple-card">
    <simple-card />
    <hr>
    <complex-card />
    <hr>
    <fluid-heading-card />
  </div>
</template>

<script>
import simpleCard from 'componentsdir/card/examples/demo/simpleCard.vue';
import complexCard from 'componentsdir/card/examples/demo/complexCard.vue';
import fluidHeadingCard from './demo/fluidHeadingCard.vue';

export default {
  name: 'Cards',
  components: {
    simpleCard,
    complexCard,
    fluidHeadingCard
  },
};
</script>
