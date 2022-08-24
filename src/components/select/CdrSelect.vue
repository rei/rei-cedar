<script>
import { defineComponent, useCssModule, computed } from 'vue';
import IconCaretDown from '../icon/comps/caret-down.vue';
import CdrLabelStandalone from '../labelStandalone/CdrLabelStandalone.vue';
import CdrFormError from '../formError/CdrFormError.vue';
import sizeProps from '../../props/size';
import backgroundProps from '../../props/background';
import mapClasses from '../../utils/mapClasses';
import uid from '../../utils/uid';

export default defineComponent({
  name: 'CdrSelect',
  components: {
    IconCaretDown,
    CdrLabelStandalone,
    CdrFormError,
  },
  inheritAttrs: false,
  props: {
    /**
     * `id` for the select that is mapped to the label `for` attribute. If one is not provided, it will be generated.
    */
    id: {
      type: String,
      default: uid(),
    },
    /**
     * Label text. This is required for a11y even if hiding the label with `hideLabel`.
    */
    label: {
      type: String,
      required: true,
    },
    /**
     * Removes the label element but sets the select `aria-label` to `label` text for a11y.
    */
    hideLabel: {
      type: Boolean,
      default: false,
    },
    /**
     * Adds an option that is disabled and selected by default to serve as a `placeholder` for the select.
    */
    prompt: String,
    /**
     * Build options programatically with data. Array of objects [{ text: String, value: String}] to give greater control. Array of strings ['String'] for simpler setup (value and text will be the same).
    */
    options: {
      type: Array,
    },
    // Set which background type the select renders on
    background: backgroundProps,
    size: sizeProps,
    // Set error styling
    error: {
      type: [Boolean, String],
      default: false,
    },
    /**
    * Override the error message role, default is `status`.
    */
    errorRole: {
      type: String,
      required: false,
    },
    modelValue: {
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
    },
    disabled: Boolean,
    required: Boolean,
    optional: Boolean,
    multiple: Boolean,
    multipleSize: Number,
  },
  customOptions: {},
  setup(props, ctx) {
    const baseClass = 'cdr-select';
    const hasHelper = ctx.slots['helper-text'];
    const hasInfo = ctx.slots.info;
    const hasInfoAction = ctx.slots['info-action'];
    const hasPreIcon = ctx.slots['pre-icon'];

    const multipleClass = computed(() => props.multiple && 'cdr-select--multiple');
    const promptClass = computed(() => !props.modelValue && 'cdr-select__prompt');
    const preIconClass = computed(() => hasPreIcon && 'cdr-select--preicon');
    const errorClass = computed(() => props.error && 'cdr-select--error');
    const backgroundClass = computed(() => `cdr-select--${props.background}`);
    const sizeClass = computed(() => props.size && `${baseClass}--${props.size}`);
    const caretDisabledClass = computed(() => props.disabled && 'cdr-select__caret--disabled');

    const describedby = computed(() => {
      const helperText = [
        ctx.slots['helper-text'] ? `${props.id}-helper-text-top` : '',
        ctx.attrs['aria-describedby'],
      ].filter((x) => x).join(' ');

      if (props.error) {
        return `${props.id}-error`;
      }

      return helperText;
    });

    // TODO: refactor, would be much clearer as a 1-2 liner
    const computedOpts = computed(() => {
      const optsArr = [];
      if (props.options) {
        props.options.forEach((o) => {
          const optObj = {};
          let text = '';
          let val = '';
          if (typeof o === 'string') {
            text = o;
            val = o;
          } else {
            const { text: t, value: v } = o;
            text = t;
            val = v;
          }
          optObj.text = text;
          optObj.value = val;
          optsArr.push(optObj);
        });
      }
      return optsArr;
    });

    const selectModel = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        ctx.emit('update:modelValue', newValue);
      },
    });
    const style = useCssModule();

    return {
      mapClasses,
      baseClass,
      hasHelper,
      hasInfo,
      hasInfoAction,
      hasPreIcon,
      multipleClass,
      promptClass,
      preIconClass,
      errorClass,
      backgroundClass,
      sizeClass,
      caretDisabledClass,
      describedby,
      computedOpts,
      selectModel,
      style,
    };
  },
});
</script>

<template>
  <cdr-label-standalone
    :for-id="id"
    :label="label"
    :hide-label="hideLabel"
    :required="required"
    :optional="optional"
    :disabled="disabled"
  >
    <template
      #helper
      v-if="hasHelper"
    >
      <slot name="helper-text" />
    </template>
    <template
      #info
      v-if="hasInfo"
    >
      <slot name="info" />
    </template>

    <!-- default slot -->
    <div :class="style['cdr-select-wrap']">
      <span
        v-if="hasPreIcon"
        :class="style['cdr-select__pre-icon']"
      >
        <slot name="pre-icon" />
      </span>

      <select
        :id="id"
        :class="mapClasses(style,
                           baseClass,
                           sizeClass,
                           promptClass,
                           multipleClass,
                           backgroundClass,
                           errorClass,
                           preIconClass,
        )"
        :multiple="multiple"
        :size="multipleSize"
        :disabled="disabled"
        :aria-required="required || null"

        :aria-invalid="!!error || null"
        :aria-errormessage="(!!error && `${id}-error`) || null"
        v-bind="$attrs"
        :aria-describedby="describedby || null"
        :value="modelValue"
        v-model="selectModel"
      >
        <option
          v-if="prompt"
          :class="style['cdr-select__prompt']"
          value=""
          disabled
        >
          {{ prompt }}
        </option>
        <option
          v-for="option in computedOpts"
          :key="option.text"
          :value="option.value"
        >
          {{ option.text }}
        </option>
        <slot />
      </select>

      <icon-caret-down :class="mapClasses(style, 'cdr-select__caret', caretDisabledClass)" />
    </div>

    <template
      #info-action
      v-if="hasInfoAction"
    >
      <slot name="info-action" />
    </template>

    <template
      #error
      v-if="error"
    >
      <cdr-form-error
        :error="error"
        :role="errorRole"
        :id="`${id}-error`"
        v-if="error"
      >
        <template #error>
          <slot name="error" />
        </template>
      </cdr-form-error>
    </template>
  </cdr-label-standalone>
</template>

<style lang="scss" module src="./styles/CdrSelect.module.scss">
</style>
