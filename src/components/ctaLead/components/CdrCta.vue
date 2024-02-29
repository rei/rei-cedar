<script setup lang="ts">
import { useCssModule } from 'vue';
import { CdrButton, CdrIcon } from '../../../lib';
import { baseButtonProps } from '../../../types/interfaces.ts';


interface ctaProps extends baseButtonProps {
 
  /** sets the html element */
  tag?: string,
  /** Modifies the style variant for this component */
  modifier?: string,
}

withDefaults(defineProps<ctaProps>(), {
  tag: '',
  href: '',
  modifier: '',
});


const baseClass = 'cdr-cta'
const style = useCssModule();
</script>

<template>
  <cta :class="style[baseClass]">
    <cdr-button
      tag="a"
    >
      <cdr-icon
        use="#caret-right"
        inherit-color
        v-slot: icon-right
      />
    </cdr-button>
  </cta>
</template>

<style lang="scss" module src="../styles/CdrCta.module.scss" />