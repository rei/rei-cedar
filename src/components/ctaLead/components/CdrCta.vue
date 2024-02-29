<script setup lang="ts">
import { useCssModule } from 'vue';
import { baseButtonProps} from '../../../types/interfaces.ts';


interface ctaProps extends baseButtonProps {
 
  /** sets the html element */
  tag?: string,
  /** Modifies the style variant for this component */
  modifier?: string,
}

const props = withDefaults(defineProps<ctaProps>(), {
  tag: '',
  href: '',
  modifier: '',
});

const baseClass = 'cdr-cta'
const style = useCssModule();
</script>

<template>
  <component 
    :is="tag"
    modifier="secondary"
    :class="style[baseClass]"
  >
    <slot />  
    <cdr-icon
      use="#caret-right"
      inherit-color
      v-slot:icon-right
    />
  </component>
</template>

<style lang="scss" module src="../styles/CdrCta.module.scss" />