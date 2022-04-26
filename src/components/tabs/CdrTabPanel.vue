<script setup>
  import { computed, inject, useCssModule } from 'vue';
  import kebabCase from 'lodash/kebabCase';

  const props = defineProps({
    name: String,
  })
  const selectedTabName = inject("selectedTabName");

  const isActive = computed(() => {
    return props.name === selectedTabName?.value;
  })
  const panelId = computed(() => {
    return `${kebabCase(props.name)}-panel`
  })
  const style = useCssModule();
</script>

<template>
  <section
    v-show="isActive"
    tabindex="0"
    :aria-hidden="!isActive"
    role="tabpanel"
    :class="style['cdr-tab-panel']"
    :id="panelId"
    :aria-labelledby="name"
  >
    <slot></slot>
  </section>
</template>

<style lang="scss" module src="./styles/CdrTabPanel.module.scss">
</style>