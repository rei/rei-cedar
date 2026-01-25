<script setup lang="ts">
import { computed, ref, inject, useCssModule, watch } from 'vue';
import type { CdrTabPanelProps } from '../../types/interfaces';
import kebabCase from '../../utils/kebabCase';
import { selectedTabKey } from '../../types/symbols';

defineOptions({
  name: 'CdrTabPanel',
});

const props = defineProps<CdrTabPanelProps>();

const emits = defineEmits({
  /**
   * Emits when active tab is changed
   * @params state, panelId
   */
  'tab-change': null,
});

const style = useCssModule();
const selectedTabName = inject(selectedTabKey, ref(null));
const isActive = computed(() => props.name === selectedTabName?.value);
const panelId = computed(() => (props.name ? `${kebabCase(props.name)}-panel` : undefined));

watch(isActive, (state) => {
  emits('tab-change', state, panelId.value);
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

<style lang="scss" module src="./styles/CdrTabPanel.module.scss" />
