
<template>
<cdr-icon v-bind="props">
  <slot/>
  <path role="presentation" d="M8 11h8a1 1 0 010 2H8a1 1 0 010-2z"></path>
</cdr-icon>
</template>
<script setup>
  import CdrIcon from '../CdrIcon';
  const props = defineProps({
    props: {
      type: Object,
    },
  })
</script>
