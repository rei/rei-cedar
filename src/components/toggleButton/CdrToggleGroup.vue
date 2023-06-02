<script>
import {
  ref, watch, onMounted, provide, computed, defineComponent, useCssModule,
} from 'vue';
import mapClasses from '../../utils/mapClasses';
import propValidator from '../../utils/propValidator';

export default defineComponent({
  name: 'CdrToggleGroup',
  props: {
    /** @ignore */
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      required: true,
    },
    /**
     * Sets toggle button size
     * @demoSelectMultiple false
     * @values medium, large
    */
    size: {
      type: String,
      default: 'medium',
      validator: (value) => propValidator(
        value,
        ['medium', 'large'],
      ),
    },
  },
  emits: {
    /**
     * Event emitted by v-model
     * @param modelValue
     */
    'update:modelValue': null,
  },
  setup(props, ctx) {
    const toggleGroup = ref(null);

    const selectedToggleValue = ref(props.modelValue);
    provide('selectedToggleValue', selectedToggleValue);

    const sizeClass = computed(() => (props.size
      ? `cdr-toggle-group--${props.size}`
      : 'cdr-toggle-group--medium'));

    let toggleButtonElements;

    onMounted(() => {
      toggleButtonElements = Array.from(toggleGroup.value.querySelectorAll('button'));
    });

    watch(() => props.modelValue, (value) => {
      selectedToggleValue.value = value;
    });

    const selectToggleButton = (e) => {
      if (!e.target.closest('button')) {
        return;
      }
      const button = e.target.closest('button');
      selectedToggleValue.value = button.value;
      ctx.emit('update:modelValue', button.value);
      button.focus();
    };

    const focusNext = (e) => {
      const currentButton = e.target;
      const currentButtonIndex = toggleButtonElements.indexOf(currentButton);
      const isLastButton = (currentButtonIndex === toggleButtonElements.length - 1);

      if (isLastButton) {
        return;
      }

      const nextButton = toggleButtonElements[currentButtonIndex + 1];
      nextButton.focus();
    };

    const focusPrev = (e) => {
      const currentButton = e.target;
      const currentButtonIndex = toggleButtonElements.indexOf(currentButton);
      const isFirstButton = (currentButtonIndex === 0);

      if (isFirstButton) {
        return;
      }

      const nextButton = toggleButtonElements[currentButtonIndex - 1];
      nextButton.focus();
    };

    const baseClass = 'cdr-toggle-group';
    const style = useCssModule();

    return {
      toggleGroup,
      selectedToggleValue,
      toggleButtonElements,
      selectToggleButton,
      focusNext,
      focusPrev,
      sizeClass,
      baseClass,
      mapClasses,
      style,
    };
  },
});
</script>

<template>
  <ul
    ref="toggleGroup"
    role="radiogroup"
    v-bind="$attrs"
    :class="mapClasses(
      style,
      baseClass,
      sizeClass,
    )"
    @click.prevent="selectToggleButton"
    @keyup.right.prevent="focusNext"
    @keyup.left.prevent="focusPrev"
  >
    <!-- @slot CdrToggleGroup content (CdrToggleButton components) -->
    <slot />
  </ul>
</template>

<style lang="scss" module src="./styles/CdrToggleGroup.module.scss">
</style>
