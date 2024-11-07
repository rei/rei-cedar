<template>
  <div>
      <cdr-card
        class="card-example"
      >
        <cdr-link
          href="#bar"
          class="cdr-card__link"
          style="padding:1.6rem"
        >A simple card</cdr-link>
      </cdr-card>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'SimpleCard',
  components: Components,
};
</script>

<style>
  .card-example {
    max-width: 250px;
    width: 250px;
    min-height:120px;
  }
</style>
