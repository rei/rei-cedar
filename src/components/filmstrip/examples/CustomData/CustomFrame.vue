<template>
  <div
    class="custom-frame"
    data-focus
  >
    <h3>{{ name }}</h3>
    <p>Value: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
/**
 * Custom Frame Component
 *
 * This is your custom frame component that renders each item.
 * It receives the props passed from the adapter.
 */
defineProps<{
  name: string;
  value: number;
}>();
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/scss' as *;

.custom-frame {
  padding: $cdr-space-one-x;
  border: 1px solid $cdr-color-border-primary;
  border-radius: $cdr-radius-md;
  background: $cdr-color-background-primary;
  min-width: 200px;

  h3 {
    margin: 0 0 $cdr-space-half-x 0;
    font-size: $cdr-text-heading-sans-400;
  }

  p {
    margin: 0;
    color: $cdr-color-text-secondary;
  }
}
</style>
