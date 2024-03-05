<script setup lang="ts">
import { defineProps, useCssModule } from 'vue'
import { CdrButton } from '../../../lib';
import propValidator from '../../../utils/propValidator';

const props = defineProps({
  ...CdrButton.props,
  
    /**
     * Modifies the style variant for this component
     * @demoSelectMultiple false
     * @values primary, secondary, sale, dark, link
     */
     modifier: {
      type: String,
      default: 'cta',
      validator: (value: string) => propValidator(
        value, [ 'cta', 'primary', 'secondary', 'sale', 'dark', 'link',]
        ),
    },

});
const baseClass = 'cdr-cta';
const style = useCssModule();
</script>


<template>
  <div :class="style[baseClass]">
    <CdrButton
      tag="a"
      size="medium"
      v-bind="props"
      :class="[
        props.cta ? 'cdr-button--cta' : '',
        props.modifier ? `cdr-button--${props.modifier}` : '',
      ]"
    >
      <!-- @slot Readable text of the button. Leave empty if icon-only -->
      I'm a button
      <!-- #icon-right shorthand for named slot -->
      <template #icon-right>
        <cdr-icon 
          use="#account-profile"
          class="icon-hover"
        />
      </template>
    </CdrButton>
  </div>
</template>

<style lang="scss" module src="../styles/CdrCta.module.scss" />