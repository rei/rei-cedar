<template>
  <div
    class="list-examples"
    data-backstop="lists"
  >

    <h2>
      List
    </h2>

    <unordered-list class="mega-stack" />
    <ordered-list class="mega-stack" />
    <bare-list class="mega-stack" />
    <resilience-test class="mega-stack" />
  </div>
</template>

<script>
import unorderedList from 'componentsdir/list/examples/demo/Unordered.vue';
import orderedList from 'componentsdir/list/examples/demo/Ordered.vue';
import bareList from 'componentsdir/list/examples/demo/Bare.vue';
import resilienceTest from 'componentsdir/list/examples/demo/Resilience.vue';

export default {
  name: 'Lists',
  components: {
    unorderedList,
    orderedList,
    bareList,
    resilienceTest,
  },
};
</script>

<style>
/** normalize line-height for consistent testing because lists inherit it */

.list-examples {
  line-height: 1;
}
</style>
