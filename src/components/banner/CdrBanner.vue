<script>
import {
  defineComponent, useCssModule, computed,
} from 'vue';
import propValidator from '../../utils/propValidator';

export default defineComponent({
  name: 'CdrBanner',
  props: {
    type: {
      type: String,
      validator: (value) => propValidator(
        value,
        ['info', 'warning', 'success', 'error', 'default'],
      ),
      default: 'default',
    },
  },

  setup(props, ctx) {
    const baseClass = 'cdr-banner';
    const typeClass = computed(() => `${baseClass}--${props.type}`);
    const prominenceClass = computed(() => (ctx.slots['message-body']
      ? `${baseClass}__wrapper--prominence`
      : undefined));
    const hasIconLeft = ctx.slots['icon-left'];
    const hasIconRight = ctx.slots['icon-right'];
    const hasMessageBody = ctx.slots['message-body'];
    const hasInfoAction = ctx.slots['info-action'];
    return {
      style: useCssModule(),
      baseClass,
      typeClass,
      prominenceClass,
      hasIconLeft,
      hasIconRight,
      hasMessageBody,
      hasInfoAction,
    };
  },
});
</script>

<template>
  <div :class="[style[baseClass], style[typeClass]]">
    <div :class="[style['cdr-banner__wrapper'], style[prominenceClass]]">
      <div :class="[style['cdr-banner__main']]">
        <div
          v-if="hasIconLeft"
          :class="[style['cdr-banner__icon-left']]"
        >
          <slot name="icon-left" />
        </div>
        <span :class="[style['cdr-banner__message']]">
          <slot />
        </span>
        <div
          v-if="hasIconRight"
          :class="[style['cdr-banner__icon-right']]"
        >
          <slot name="icon-right" />
        </div>
      </div>
      <div
        v-if="hasMessageBody"
        :class="[style['cdr-banner__message-body']]"
      >
        <slot name="message-body" />
      </div>
    </div>
    <div
      v-if="hasInfoAction"
      :class="[style['cdr-banner__info-action']]"
    >
      <slot name="info-action" />
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrBanner.module.scss">
</style>
