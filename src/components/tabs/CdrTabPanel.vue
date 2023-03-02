<script>
import {
  computed, defineComponent, inject, useCssModule, watch,
} from 'vue';
import kebabCase from 'lodash-es/kebabCase';

export default defineComponent({
  name: 'CdrTabPanel',
  props: {
    /** Sets reference identifier for tab content. This property is required and is necessary for accessibility. Must be unique for each tabPanel, and cannot be the same as the `aria-labelledby` property. */
    id: String,
    /** Sets tab display name. Required and must be unique for each tab. If `id` is not provided, this value will be used as the reference identifier. */
    name: String,
    /** Sets reference identifier for tab header. This property is required and is necessary for accessibility. Must be unique for each tabPanel, and cannot be the same as the `id` property. */
    ariaLabelledby: String,
  },
  emits: {
    /**
     * Emits when active tab is changed
     * @params state, panelId
     */
    'tab-change': null,
  },
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
    <!-- @slot CdrTabPanel content -->
    <slot />
  </section>
</template>

<style lang="scss" module src="./styles/CdrTabPanel.module.scss">
</style>
