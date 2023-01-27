<template>
  <div data-backstop="cards">
    <simple-card />
    <hr>
    <div v-for="palette in availablePalettes">
      <complex-card :palette="palette" @cdr-card-clicked="handleCardClick"/>
    </div>
  </div>
</template>

<script>
import simpleCard from 'componentsdir/card/examples/demo/simpleCard.vue';
import complexCard from 'componentsdir/card/examples/demo/complexCard.vue';

export default {
  name: 'Cards',
  components: {
    simpleCard,
    complexCard,
  },
  computed: {
    availablePalettes() {
        return ['default', 'dark'] 
    },
    cardClass() {
        return `cdr-card cdr-card--${this.palette}`;
    }
  }
};
</script>

