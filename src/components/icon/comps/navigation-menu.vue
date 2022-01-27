
<template>
<cdr-icon v-bind="props">
  <slot/>
  <path role="presentation" d="M20 17a1 1 0 010 2H4a1 1 0 010-2h16zm0-6a1 1 0 010 2H4a1 1 0 010-2h16zm0-6a1 1 0 010 2H4a1 1 0 110-2h16z"></path>
</cdr-icon>
</template>
<script setup>
  import { defineProps } from 'vue';
  import CdrIcon from '../CdrIcon';
  const props = defineProps();
</script>
