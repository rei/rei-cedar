<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import CdrSurfaceSelection from '../surfaceSelection/CdrSurfaceSelection.vue';
import CdrSubheadingSans from '../text/presets/CdrSubheadingSans.vue';
import CdrBody from '../text/presets/CdrBody.vue';
import type { surfaceSelection } from '../../types/interfaces';
import { getSurfaceProps } from '../../utils/surface';

/** Selection variant of CdrSurfaceSelection with additional interactive states */
defineOptions({ name: 'CdrFulfillmentTile' });

const props = withDefaults(defineProps<surfaceSelection>(), {
  tag: 'div',
  role: 'checkbox',
  borderRadius: 'soft'
});

const style = useCssModule();

// Compute surface props including selection-specific attributes
const surfaceProps = computed(() => ({
  ...getSurfaceProps(props),
  'aria-checked': props.checked,
  'aria-disabled': props.disabled,
  'data-loading': props.loading,
}));
</script>

<template>
  <CdrSurfaceSelection
    v-bind="surfaceProps"
    :class="style['cdr-fulfillment-tile']"
    :tag="props.tag"
    :role="props.role"
  >
    <div :class="style['cdr-fulfillment-tile__content']">
      <div
        v-if="$slots.header"
        :class="style['cdr-fulfillment-tile__header']"
      >
        <span
          v-if="$slots['icon-left']"
          :class="style['cdr-fulfillment-tile-header__icon']"
        >
          <!-- @slot Icon to display on the left of the header. -->
          <slot name="icon-left" />
        </span>
        <div v-if="$slots.header">
          <CdrSubheadingSans
            :strong="true"
            scale="-1"
            tag="span"
          >
            <!-- @slot Header content that is still visible during loading. -->
            <slot name="header" />
          </CdrSubheadingSans>
        </div>
        <span
          v-if="$slots['icon-right']"
          :class="style['cdr-fulfillment-tile-header__icon']"
        >
          <!-- @slot Icon to display on the right of the header. -->
          <slot name="icon-right" />
        </span>
      </div>
      <div
        :class="style['cdr-fulfillment-tile__main']"
        v-if="$slots['body'] || $slots['footer']"
      >
        <CdrBody
          tag="div"
          scale="-2"
          v-if="$slots['body']"
        >
          <!-- @slot Default font size is a step down. Placed just below the header. -->
          <slot name="body" />
        </CdrBody>
        <CdrBody
          tag="div"
          scale="-1"
          v-if="$slots['footer']"
        >
          <!-- @slot Footer content will be at the bottom of the component. -->
          <slot name="footer" />
        </CdrBody>
      </div>
    </div>
  </CdrSurfaceSelection>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTitle.module.scss" />