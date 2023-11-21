<template>
  <div>
    <h2>title</h2>
    <CdrTitle>Stanley Quencher H2.0 FlowState Tumbler - 40 fl. oz.</CdrTitle>

    <div class="container-md">
    <CdrTitle class="container-md--override">Stanley Quencher H2.0 FlowState Tumbler - 40 fl. oz.</CdrTitle>
  </div>
  card container
  <div class="container-sm">
    <CdrTitle>Learn to Climb Indoors for Kids</CdrTitle>
  </div>
  default container
  <div class="container-xs">
    <CdrTitle>Gifts for Her</CdrTitle>
  </div>
  card container
  <div class="container-xxs">
    <CdrTitle>Stanley Quencher H2.0 FlowState Tumbler - 40 fl. oz.</CdrTitle>
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

<style>
.container-md {
  margin: 2rem;
  border: 1px dashed red;
  container-type: inline-size;
  width: 90vw;
}
.container-sm {
  margin: 2rem;
  border: 1px dashed red;
  container: card / inline-size;
  width: 60vw;
}
.container-xs {
  margin: 2rem;
  border: 1px dashed red;
  container-type: inline-size;
  width: 33vw
}
.container-xxs {
  margin: 2rem;
  border: 1px dashed red;
  container: card / inline-size;
  width: 25vw
}
</style>
