<template>
  <div>
    <cdr-card
      tag="div"
      class="card-example" 
      :cdr-card-is-linked="false"
    >
      <cdr-link
        href="#foo"
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
  }
</style>
