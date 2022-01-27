
<template>
<cdr-icon v-bind="props">
  <slot/>
  <path role="presentation" d="M6 11h12a1 1 0 010 2H6a1 1 0 010-2z"></path>
</cdr-icon>
</template>
<script setup>
  import { defineProps } from 'vue';
  import CdrIcon from '../CdrIcon';
  const props = defineProps();
</script>
