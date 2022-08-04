<script setup>
import { ref, onMounted, provide, useSlots, useCssModule } from 'vue';

const slots = useSlots();
const slottedToggleButtons = slots.default()[0].children?.length
    ? slots.default()[0]
    : slots.default();
const radiogroup = ref(null);
const selectedToggleValue = ref(slottedToggleButtons[0].props['custom-value']);

provide("selectedToggleValue", selectedToggleValue);

let toggleButtonElements;
onMounted(() => {
    toggleButtonElements = Array.from(radiogroup.value.querySelectorAll('button'));
})

const selectToggleButton = (e) => {
    selectedToggleValue.value = e.target.value;
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