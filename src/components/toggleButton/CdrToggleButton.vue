<script>
import { useCssModule, defineComponent } from 'vue';

export default defineComponent({
    name: 'CdrToggleButton',
    props: {
        toggleValue: {
            type: String,
            required: true,
        }
    },
    computed: {
        isActive() {
            return this.toggleValue === this.selectedToggleValue.value;
        }
    },
    inject: ['selectedToggleValue'],
    setup() {
        return {
            style: useCssModule()
        }
    }
})
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
