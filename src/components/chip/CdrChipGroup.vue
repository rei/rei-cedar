<script>
import {
  defineComponent, useCssModule, computed, ref, onMounted,
} from 'vue';

export default defineComponent({
  name: 'CdrChipGroup',
  props: {
    label: {
      type: String,
      required: true,
    },
    hideLabel: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const baseClass = 'cdr-chip-group';
    const chipsEl = ref(null);

    let chips = [];
    const currentIdx = ref(0);

    const nextIdx = computed(() => {
      const idx = currentIdx + 1;
      return idx >= chips.length ? 0 : idx;
    });
    const prevIdx = computed(() => {
      const idx = currentIdx - 1;
      return idx <= -1 ? (chips.length - 1) : idx;
    });
    const legendClass = computed(() => (props.hideLabel
      ? 'cdr-chip-group__legend--hidden'
      : 'cdr-chip-group__legend'));

    onMounted(() => {
      chips = Array.prototype.filter.call(chipsEl.value.children,
        (chip) => !(chip.getAttribute('disabled') || chip.getAttribute('aria-disabled')));
      currentIdx.value = Array.prototype.findIndex.call(chips,
        (chip) => chip.getAttribute('aria-checked') === 'true');
    });

    const handleKeyDown = (e) => {
      // something besides the button is focused
      if (currentIdx.value === -1) return;

      const { key } = e;
      switch (key) {
        case 'Home':
          e.preventDefault();
          chips[0].focus();
          break;
        case 'End':
          e.preventDefault();
          chips[chips.length - 1].focus();
          break;
        case 'ArrowDown':
        case 'Down':
          e.preventDefault();
          chips[nextIdx.value].focus();
          break;
        case 'ArrowUp':
        case 'Up':
          e.preventDefault();
          chips[prevIdx.value].focus();
          break;
        default: break;
      }
    };
    const handleFocusIn = (e) => {
      // find out which, if any, button is focused
      currentIdx.value = Array.prototype.indexOf.call(chips, e.target);
    };
    return {
      style: useCssModule(),
      baseClass,
      chipsEl,
      legendClass,
      handleKeyDown,
      handleFocusIn,
    };
  },
});

</script>

<template>
  <fieldset
    :class="style[baseClass]"
    @focusin="handleFocusIn"
    @keydown="handleKeyDown"
  >
    <legend :class="style[legendClass]">
      <slot name="label">
        {{ label }}
      </slot>
    </legend>
    <div
      ref="chipsEl"
      :class="style['cdr-chip-group__content']"
    >
      <slot />
    </div>
  </fieldset>
</template>

<style lang="scss" module src="./styles/CdrChipGroup.module.scss">
</style>
