<template>
  <div>
    <blockquotes data-backstop="blockquote" />

    <pullquotes data-backstop="pullquote" />
  </div>
</template>

<script>
import Blockquotes from 'componentsdir/quote/examples/demo/Blockquotes.vue';
import Pullquotes from 'componentsdir/quote/examples/demo/Pullquotes.vue';

export default {
  name: 'QuoteExample',
  components: {
    Blockquotes,
    Pullquotes,
  },
};
</script>

<style>
</style>
