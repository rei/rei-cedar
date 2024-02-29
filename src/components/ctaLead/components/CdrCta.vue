<script setup lang="ts">
import { useCssModule } from 'vue';
import { CdrButton, CdrIcon } from '../../../lib';

interface ctaProps extends baseButtonProps {
  /** An object containing 1..n child objects containing HTMLSourceElement attributes */
  sources: ctaSourceObject
}

withDefaults(defineProps<ctaProps>(), {
  modifier: '',
  href: '',
});


const baseClass = 'cdr-cta'
const style = useCssModule();
</script>

<template>
  <cta :class="style[baseClass]">
    <cdr-button
      tag="a"
      :href="href"
      :modifier="modifier"
    >
      <cdr-icon
        use="#caret-right"
        inherit-color
        v-slot:icon-right
      />
    </cdr-button>
  </cta>
</template>

<style lang="scss" module src="../styles/CdrCta.module.scss" />