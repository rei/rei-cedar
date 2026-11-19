<template>
  <div
    class="custom-frame"
    :data-focus="true"
    tabindex="0"
  >
    <img
      :src="imageUrl"
      :alt="title"
      class="custom-frame__image"
    />
    <div class="custom-frame__content">
      <span class="custom-frame__category">{{ category }}</span>
      <h3 class="custom-frame__title">{{ title }}</h3>
      <p class="custom-frame__description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/scss' as *;
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/utilities/cdr-type-mixins' as type;

.custom-frame {
  display: flex;
  flex-direction: column;
  gap: $cdr-space-half-x;
  padding: $cdr-space-one-x;
  background: $cdr-color-background-secondary;
  border-radius: $cdr-radius-softer;
  min-width: 200px;
  cursor: pointer;
  transition: box-shadow $cdr-duration-2-x $cdr-timing-function-ease;

  &:focus-visible {
    outline: 2px solid $cdr-color-border-brand;
    outline-offset: 2px;
  }

  &:hover {
    box-shadow: $cdr-prominence-raised;
  }

  &__image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: $cdr-radius-softer;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $cdr-space-quarter-x;
  }

  &__category {
    @include type.cdr-text-utility-sans-200;
    color: $cdr-color-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &__title {
    @include type.cdr-text-heading-sans-400;
    color: $cdr-color-text-primary;
    margin: 0;
  }

  &__description {
    @include type.cdr-text-body-300;
    color: $cdr-color-text-secondary;
    margin: 0;
  }
}
</style>
