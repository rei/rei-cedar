<template>
  <div>
    <headings />
    <paragraphs data-backstop="paragraphs" />
  </div>
</template>

<script>
import headings from 'componentsdir/text/examples/demo/Headings.vue';
import paragraphs from 'componentsdir/text/examples/demo/Paragraphs.vue';

export default {
  name: 'TextExamples',
  components: {
    headings,
    paragraphs,
  },
};
</script>
