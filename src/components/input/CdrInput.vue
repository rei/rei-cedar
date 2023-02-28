<script>
import {
  defineComponent, useCssModule, computed, ref,
} from 'vue';
import propValidator from '../../utils/propValidator';
import CdrLabelStandalone from '../labelStandalone/CdrLabelStandalone.vue';
import CdrFormError from '../formError/CdrFormError.vue';
import sizeProps from '../../props/size';
import backgroundProps from '../../props/background';
import mapClasses from '../../utils/mapClasses';
import uid from '../../utils/uid';

export default defineComponent({
  name: 'CdrInput',
  components: { CdrLabelStandalone, CdrFormError },
  inheritAttrs: false,
  customOptions: {},
  props: {
    /**
     * `id` for the input that is mapped to the label `for` attribute.
    */
    id: {
      type: String,
    },
    /**
     *  'type' attribute for the input as defined by w3c.
     *  Only supporting text|email|number|password|search|url.
     *  The increment/decrement webkit psuedo element is hidden for number.
     *  @demoSelectMultiple false
     *  @values text, email, number, password, search, url, tel
    */
    type: {
      type: [String],
      default: 'text',
      validator: (value) => propValidator(
        value,
        ['text', 'email', 'number', 'password', 'search', 'url', 'tel', 'date'],
      ),
    },
    /**
     * Label text. This is required for a11y even if hiding the label with `hideLabel`.
    */
    label: {
      type: String,
      required: true,
    },
    // sets default attrs for inputs that should use a numeric keyboard but are not strictly "numbers" (security code, CC number, postal code)
    numeric: {
      type: Boolean,
      default: false,
    },
    /**
     * Removes the label element but sets the input `aria-label` to `label` text for a11y.
    */
    hideLabel: Boolean,
    /**
     * Number of rows for input.  Converts component to text-area if rows greater than 1.
    */
    rows: Number,
    // Set which background type the input renders on
    background: backgroundProps,
    /**
     * Sets the input field size
    * @demoSelectMultiple false
    * @values medium, large
   */
    size: sizeProps,

    /**
     * Override the error message role, default is `status`.
     */
    errorRole: {
      type: String,
      required: false,
      default: 'status',
    },
    // Set error styling
    error: {
      type: [Boolean, String],
      default: false,
    },
    disabled: Boolean,
    required: Boolean,
    optional: Boolean,
    modelValue: {
      type: [String, Number, Function],
    },
    // Adds a custom class to the cdr-lable-standalone wrapping div
    labelClass: String,
  },
  emits: ['update:modelValue'],

  setup(props, ctx) {
    const baseClass = 'cdr-input';
    const isFocused = ref(false);
    const hasHelperTop = ctx.slots['helper-text-top'];
    const hasHelperBottom = ctx.slots['helper-text-bottom'];
    const hasPreIcon = ctx.slots['pre-icon'];
    const hasPostIcon = ctx.slots['post-icon'];
    const hasPostIcons = hasPostIcon && ctx.slots['post-icon']().length > 1;
    const hasInfo = ctx.slots.info;
    const hasInfoAction = ctx.slots['info-action'];

    const uniqueId = props.id ? props.id : uid();
    const multilineClass = computed(() => props.rows > 1 && 'cdr-input--multiline');
    const preIconClass = computed(() => hasPreIcon && 'cdr-input--preicon');
    const postIconClass = computed(() => hasPostIcon && 'cdr-input--posticon');
    const postIconsClass = computed(() => hasPostIcons && 'cdr-input--posticons');
    const errorClass = computed(() => props.error && 'cdr-input--error');
    const backgroundClass = computed(() => `cdr-input--${props.background}`);
    const sizeClass = computed(() => props.size && `${baseClass}--${props.size}`);
    const focusedClass = computed(() => isFocused.value && 'cdr-input--focus');

    const describedby = computed(() => {
      const helperText = [
        ctx.slots['helper-text-top'] ? `${uniqueId}-helper-text-top` : '',
        ctx.slots['helper-text-bottom'] ? `${uniqueId}-helper-text-bottom` : '',
        ctx.attrs['aria-describedby'],
      ].filter((x) => x).join(' ');

      if (props.error) {
        return `${uniqueId}-error`;
      }

      return helperText;
    });

    const inputAttrs = computed(() => {
      const isNum = props.numeric || props.type === 'number';
      return {
        id: uniqueId,
        autocorrect: 'off',
        spellcheck: 'false',
        autocapitalize: 'off',
        pattern: (isNum && '[0-9]*') || null,
        inputmode: (isNum && 'numeric') || null,
        novalidate: isNum || null,
        ...ctx.attrs,
      };
    });
    const inputModel = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        ctx.emit('update:modelValue', newValue);
      },
    });
    return {
      style: useCssModule(),
      baseClass,
      isFocused,
      hasHelperTop,
      hasHelperBottom,
      hasPreIcon,
      hasPostIcon,
      hasInfo,
      hasInfoAction,
      uniqueId,
      multilineClass,
      preIconClass,
      postIconClass,
      postIconsClass,
      errorClass,
      backgroundClass,
      sizeClass,
      focusedClass,
      describedby,
      inputAttrs,
      inputModel,
      mapClasses,
    };
  },
});
</script>

<template>
  <cdr-label-standalone
    :for-id="uniqueId"
    :label="label"
    :hide-label="hideLabel"
    :required="required"
    :optional="optional"
    :disabled="disabled"
    :class="labelClass"
  >
    <template
      #helper
      v-if="hasHelperTop"
    >
      <slot name="helper-text-top" />
    </template>
    <template
      #info
      v-if="hasInfo"
    >
      <slot name="info" />
    </template>

    <!-- default input slot -->
    <div :class="mapClasses(style, 'cdr-input-wrap', focusedClass)">
      <textarea
        v-if="rows && rows > 1"
        :rows="rows"
        :class="mapClasses(style,
                           baseClass,
                           multilineClass,
                           preIconClass,
                           postIconClass,
                           postIconsClass,
                           errorClass,
                           backgroundClass,
                           sizeClass,
        )"
        :id="uniqueId"
        :disabled="disabled"
        :aria-required="required || null"
        :aria-invalid="!!error || null"
        :aria-errormessage="(!!error && `${uniqueId}-error`) || null"
        v-bind="inputAttrs"
        :aria-describedby="describedby || null"
        @focus="isFocused = true"
        @blur="isFocused = false"
        v-model="inputModel"
      />
      <input
        v-else
        :type="type"
        :class="mapClasses(style,
                           baseClass,
                           preIconClass,
                           postIconClass,
                           postIconsClass,
                           errorClass,
                           backgroundClass,
                           sizeClass,
        )"
        :id="uniqueId"
        :disabled="disabled"
        :aria-required="required || null"
        :aria-invalid="!!error || null"
        :aria-errormessage="(!!error && `${uniqueId}-error`) || null"
        v-bind="inputAttrs"
        :aria-describedby="describedby || null"
        @focus="isFocused = true"
        @blur="isFocused = false"
        v-model="inputModel"
      >
      <span
        v-if="hasPreIcon"
        :class="style['cdr-input__pre-icon']"
      >
        <slot name="pre-icon" />
      </span>

      <span
        v-if="hasPostIcon"
        :class="style['cdr-input__post-icon']"
      >
        <slot name="post-icon" />
      </span>
    </div>

    <template
      #info-action
      v-if="hasInfoAction"
    >
      <slot name="info-action" />
    </template>

    <template
      #helper-text-bottom
      v-if="hasHelperBottom && !error"
    >
      <span
        :id="`${uniqueId}-helper-text-bottom`"
        :class="style['cdr-input__helper-text']"
      >
        <slot name="helper-text-bottom" />
      </span>
    </template>

    <template
      #error
      v-if="error"
    >
      <cdr-form-error
        :error="error"
        :role="errorRole"
        :id="`${uniqueId}-error`"
        v-if="error"
      >
        <template #error>
          <slot name="error" />
        </template>
      </cdr-form-error>
    </template>
  </cdr-label-standalone>
</template>

<style lang="scss" module src="./styles/CdrInput.module.scss">
</style>
