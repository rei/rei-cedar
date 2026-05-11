<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import CdrSurfaceSelection from '../surfaceSelection/CdrSurfaceSelection.vue';
import CdrSubheadingSans from '../text/presets/CdrSubheadingSans.vue';
import CdrBody from '../text/presets/CdrBody.vue';
import type { CdrFulfillmentTileProps } from './types';
import { getSurfaceProps } from '../../utils/surface';

/**
 * CdrFulfillmentTile - Selection variant of CdrSurfaceSelection with additional interactive states
 *
 * Fulfillment tiles present delivery and pickup options in a selectable format.
 * Use these tiles to display shipping methods, store pickup availability,
 * or other fulfillment choices with relevant details and pricing.
 */

defineOptions({ name: 'CdrFulfillmentTile' });

const props = withDefaults(defineProps<CdrFulfillmentTileProps>(), {
  tag: 'div',
  role: 'checkbox',
  borderColor: 'primary',
  borderStyle: 'solid',
  borderWidth: 'sixteenth-x',
  borderRadius: 'soft',
});

defineSlots<{
  /** Icon to display on the left of the header. */
  'icon-left'(props: Record<string, never>): any;
  /** Header content that is still visible during loading. */
  'header'(props: Record<string, never>): any;
  /** Icon to display on the right of the header. */
  'icon-right'(props: Record<string, never>): any;
  /** Default font size is a step down. Placed just below the header. */
  'body'(props: Record<string, never>): any;
  /** Footer content will be at the bottom of the component. */
  'footer'(props: Record<string, never>): any;
}>();

const style: Record<string, string> = useCssModule();

/**
 * Compute surface props including selection-specific attributes
 * Combines inherited surface properties with ARIA attributes for accessibility
 */
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
        v-if="!!$slots.header"
        :class="style['cdr-fulfillment-tile__header']"
      >
        <span
          v-if="!!$slots['icon-left']"
          :class="style['cdr-fulfillment-tile-header__icon']"
        >
          <!-- @slot Icon to display on the left of the header. -->
          <slot name="icon-left" />
        </span>
        <div v-if="!!$slots.header">
          <CdrSubheadingSans
            :strong="true"
            scale="scale-minus-1"
            tag="span"
          >
            <!-- @slot Header content that is still visible during loading. -->
            <slot name="header" />
          </CdrSubheadingSans>
        </div>
        <span
          v-if="!!$slots['icon-right']"
          :class="style['cdr-fulfillment-tile-header__icon']"
        >
          <!-- @slot Icon to display on the right of the header. -->
          <slot name="icon-right" />
        </span>
      </div>
      <div
        :class="style['cdr-fulfillment-tile__main']"
        v-if="!!$slots['body'] || !!$slots['footer']"
      >
        <CdrBody
          tag="div"
          scale="scale-minus-2"
          v-if="!!$slots['body']"
        >
          <!-- @slot Default font size is a step down. Placed just below the header. -->
          <slot name="body" />
        </CdrBody>
        <CdrBody
          tag="div"
          scale="scale-minus-1"
          v-if="!!$slots['footer']"
        >
          <!-- @slot Footer content will be at the bottom of the component. -->
          <slot name="footer" />
        </CdrBody>
      </div>
    </div>
  </CdrSurfaceSelection>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTitle.module.scss" />
