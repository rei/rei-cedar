<script setup>
    import { inject, computed, useCssModule, useSlots } from 'vue';

    const props = defineProps({
        toggleValue: {
            type: String,
            required: true,
        }
    });

    const selectedToggleValue = inject('selectedToggleValue');
    const isActive = computed(() => {
        return props.toggleValue === selectedToggleValue.value;
    })
    const style = useCssModule();
</script>

<template>
    <li role="presentation" :class="style['cdr-toggle-button__container']">
        <button role="radio"
            :class="style['cdr-toggle-button__item']"
            :value="toggleValue"
            :aria-label="toggleValue"
            :aria-checked="isActive ? 'true' : 'false'"
            :tabindex="isActive ? 0 : -1"
        >
            <slot>{{toggleValue}}</slot>

        </button>
    </li>
</template>

<style lang="scss" module src="./styles/CdrToggleButton.module.scss">
</style>
