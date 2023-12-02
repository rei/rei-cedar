<template>
  <div data-backstop="simple-card">
    <simple-card />
    <hr>
    <complex-card />
    <hr>
    <filmstrip-cards />
  </div>
</template>

<script>
import FilmstripCards from './demo/FilmstripCards.vue';
import SimpleCard from './demo/simpleCard.vue';
import ComplexCard from './demo/complexCard.vue';
export default {
  name: 'Cards',
  components: {
    FilmstripCards,
    SimpleCard,
    ComplexCard,
  },
};
</script>
