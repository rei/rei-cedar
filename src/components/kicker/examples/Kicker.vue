<template>
  <div>
    <h2>kicker</h2>
    <div class="kicker-container">
      <CdrKicker>Gear Guides</CdrKicker>
    </div>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Title',
  components: {
    ...Components,
  },
};
</script>

<style lang="scss">
.kicker-container {
  width: 80vw;
  container-type: inline-size;
  border: 1px dashed salmon;
}
</style>
