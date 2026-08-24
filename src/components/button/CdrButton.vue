<script setup lang="ts">
import { useCssModule, computed, useSlots } from 'vue';
import type { CdrButtonProps } from './types';
import mapClasses from '../../utils/mapClasses';
import { responsiveModifyClass, buildBooleanClass } from '../../utils/buildClass';

/**
 * CdrButton - Initiates an action, such as completing a task or submitting information
 *
 * Buttons allow users to trigger actions and navigate. Use buttons for important
 * actions like submitting forms or confirming choices. Buttons can contain text,
 * icons, or both.
 */

defineOptions({
  name: 'CdrButton',
});

const props = withDefaults(defineProps<CdrButtonProps>(), {
  tag: 'button',
  type: 'button',
  modifier: 'primary',
  fullWidth: false,
  iconOnly: false,
  withBackground: false,
});

defineSlots<{
  /** Icon to the left of text content */
  'icon-left'(props: Record<string, never>): any;
  'icon'(props: Record<string, never>): any;
  'default'(props: Record<string, never>): any;
  /** Icon to the right of text content */
  'icon-right'(props: Record<string, never>): any;
}>();

const slots: ReturnType<typeof useSlots> = useSlots();

const style: Record<string, string> = useCssModule();
const baseClass: string = 'cdr-button';

/** Computed button type attribute, null for anchor tags */
const buttonType = computed<string | null>(() => (props.tag === 'button' ? props.type : null));

/** Computed modifier class for button variants */
const modifierClass = computed<string>(() => `${baseClass}--${props.modifier}`);

/** Computed full width class when fullWidth prop is enabled */
const fullWidthClass = computed<string>(() =>
  !props.iconOnly && props.fullWidth
    ? buildBooleanClass(baseClass, props.fullWidth, 'full-width')
    : '',
);

/** Computed size class based on iconOnly state */
const sizeClass = computed<string>(() =>
  !props.iconOnly
    ? responsiveModifyClass(baseClass, '', props.size ?? '')
    : `cdr-button--icon-only-${props.size ?? ''}`,
);

/** Computed class when icon-left slot is used with default content */
const iconLeftClass = computed<string>(() =>
  slots['icon-left'] && slots.default ? `${baseClass}--has-icon-left` : '',
);

/** Computed class when icon-right slot is used with default content */
const iconRightClass = computed<string>(() =>
  slots['icon-right'] && slots.default ? `${baseClass}--has-icon-right` : '',
);

/** Computed class for icon-only button variant */
const iconOnlyClass = computed<string>(() => (props.iconOnly ? `${baseClass}--icon-only` : ''));

/** Computed class for icon-only button with background */
const withBackgroundClass = computed<string>(() =>
  props.iconOnly && props.withBackground ? `${baseClass}--with-background` : '',
);
</script>

<template>
  <component
    :is="tag"
    :class="
      mapClasses(
        style,
        baseClass,
        modifierClass,
        sizeClass,
        fullWidthClass,
        iconOnlyClass,
        iconLeftClass,
        iconRightClass,
        withBackgroundClass,
      )
    "
    :type="buttonType"
  >
    <!-- @slot Icon to the left of text content -->
    <slot name="icon-left" />
    <!-- @slot Icon for icon-only button -->
    <slot name="icon" />
    <!-- @slot Readable text of the button. Leave empty if icon-only -->
    <slot />
    <!-- @slot Icon to the right of text content -->
    <slot name="icon-right" />
  </component>
</template>

<style lang="scss" module src="./styles/CdrButton.module.scss" />
