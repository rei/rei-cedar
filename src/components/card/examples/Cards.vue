<template>
  <div data-backstop="simple-card">
    <!-- <simple-card />
    <hr>
    <complex-card />
    <hr> -->
    <filmstrip-cards />
  </div>
</template>

<script>
import FilmstripCards from './demo/FilmstripCards.vue';

export default {
  name: 'Cards',
  components: {
    FilmstripCards
  },
};
</script>
