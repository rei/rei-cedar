<template>
  <div>
    <h2>abstract</h2>
    <CdrAbstract>Fueling well is the key to longevity and improvement in running. Our experts guide you on filling your plate for your goals.</CdrAbstract>
    <div class="abstract-container">
      <CdrAbstract>Fueling well is the key to longevity and improvement in running. Our experts guide you on filling your plate for your goals.</CdrAbstract>
    </div>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Abstract',
  components: {
    ...Components,
  },
};
</script>

<style>
.abstract-container {
  max-width: 540px;
  border: 1px dashed lightcoral;
  container-type: inline-size;
}
</style>
