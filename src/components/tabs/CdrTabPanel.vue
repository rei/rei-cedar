<script>
import {
  computed, defineComponent, inject, useCssModule, watch,
} from 'vue';
import kebabCase from 'lodash-es/kebabCase';

export default defineComponent({
  name: 'CdrTabPanel',
  props: {
    name: String,
  },
  emits: ['tab-change'],
  setup(props, ctx) {
    const selectedTabName = inject('selectedTabName');
    const isActive = computed(() => props.name === selectedTabName?.value);
    const panelId = computed(() => `${kebabCase(props.name)}-panel`);
    const style = useCssModule();

    watch(isActive, (state) => {
      ctx.emit('tab-change', state, panelId.value);
    });

    return {
      selectedTabName,
      isActive,
      panelId,
      style,
    };
  },
});
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
    <slot />
  </section>
</template>

<style lang="scss" module src="./styles/CdrTabPanel.module.scss">
</style>
