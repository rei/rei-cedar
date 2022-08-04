<script setup>
    import { inject, computed, useCssModule } from 'vue';

    const props = defineProps({
        customValue: String,
    });
    const selectedToggleValue = inject('selectedToggleValue');
    const isActive = computed(() => {
        return props.customValue === selectedToggleValue.value;
    })

    const style = useCssModule();
</script>

<template>
    <li role="presentation" :class="style['segmented-control__item']">
        <button role="radio"
            :class="style['cdr-toggle-button__button']"
            :value="customValue"
            :aria-checked="isActive ? 'true' : 'false'"
            :tabindex="isActive ? 0 : -1"
        >
            <slot></slot>
        </button>
    </li>
</template>

<style lang="scss" module src="./styles/CdrToggleButton.module.scss">
</style>
