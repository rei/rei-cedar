<script setup>
import { ref, watch, onMounted, provide, computed, useCssModule } from 'vue';
import mapClasses from '../../utils/mapClasses.js';
import { buildBooleanClass } from '../../utils/buildClass.js';
import propValidator from '../../utils/propValidator.js';

const toggleGroup = ref(null);

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    required: true
  },
  maxWidth: {
    type: String,
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => propValidator(
      value,
      ['medium', 'large'],
    ),
  }
})

const selectedToggleValue = ref(props.modelValue);

watch(() => props.modelValue, (value) => {
    selectedToggleValue.value = value;
});

provide("selectedToggleValue", selectedToggleValue);

let toggleButtonElements;
onMounted(() => {
    //Investigate better way. Class name or data attribute
    toggleButtonElements = Array.from(toggleGroup.value.querySelectorAll('button'));
})

const selectToggleButton = (e) => {
    if (!e.target.closest('button')) {
        return;
    }
    let button = e.target.closest('button');
    selectedToggleValue.value = button.value;
    emit('update:modelValue', button.value);
    button.focus();
}

const focusNext = (e) => {
    const currentButton = e.target;
    const currentButtonIndex = toggleButtonElements.indexOf(currentButton);
    const isLastButton = (currentButtonIndex === toggleButtonElements.length - 1);

    if (isLastButton) {
        return;
    }

    const nextButton = toggleButtonElements[currentButtonIndex + 1];
    nextButton.focus();
}

const focusPrev = (e) => {
    const currentButton = e.target;
    const currentButtonIndex = toggleButtonElements.indexOf(currentButton);
    const isFirstButton = (currentButtonIndex === 0);

    if (isFirstButton) {
        return;
    }

    const nextButton = toggleButtonElements[currentButtonIndex - 1];
    nextButton.focus();
}

const baseClass = 'cdr-toggle-group';
const sizeClass = computed(() => props.size ? `cdr-toggle-group--${props.size}` : "cdr-toggle-group--medium")
const fullWidthClass = computed(() => props.fullWidth
  && buildBooleanClass(baseClass, props.fullWidth, 'full-width'));

const style = useCssModule();
</script>

<template>
    <ul 
        ref="toggleGroup"
        role="radiogroup"
        :style="{ maxWidth: maxWidth ? maxWidth: 'none' }"
        :class="mapClasses(
            style,
            baseClass,
            sizeClass,
        )"
        @click.prevent="selectToggleButton" 
        @keyup.right.prevent="focusNext"
        @keyup.left.prevent="focusPrev" 
    >
        <slot></slot>
    </ul>
</template>

<style lang="scss" module src="./styles/CdrToggleGroup.module.scss">
</style>