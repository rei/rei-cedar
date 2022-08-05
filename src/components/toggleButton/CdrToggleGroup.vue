<script setup>
import { ref, watch, onMounted, provide, useCssModule } from 'vue';

const radiogroup = ref(null);

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const selectedToggleValue = ref(props.modelValue);

watch(() => props.modelValue, (value) => {
    selectedToggleValue.value = value;
});

provide("selectedToggleValue", selectedToggleValue);

let toggleButtonElements;
onMounted(() => {
    toggleButtonElements = Array.from(radiogroup.value.querySelectorAll('button'));
})

const selectToggleButton = (e) => {
    selectedToggleValue.value = e.target.value;
    emit('update:modelValue', e.target.value);
    e.target.focus();
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

const style = useCssModule();
</script>

<template>
    <ul 
        ref="radiogroup"
        role="radiogroup" 
        :class="style['segmented-control']" 
        @click.prevent="selectToggleButton" 
        @keyup.right="focusNext"
        @keyup.left="focusPrev" 
        aria-label="things-foo"
    >
        <slot></slot>
    </ul>
</template>

<style lang="scss" module src="./styles/CdrToggleGroup.module.scss">
</style>