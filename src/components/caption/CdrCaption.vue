<script setup>

import { 
  defineComponent, 
  useCssModule 
} from 'vue';
import { buildClass } from '../../utils/buildClass';

const props = defineProps({
  summary: {
    type: String,
  },
  credit: {
    type: String,
  },
});

const baseClass = 'cdr-caption';
const style = useCssModule();
const summaryClass = 'cdr-caption__summary';
const citeClass = 'cdr-caption__cite';

</script>

<template>
  <div :class="style[baseClass]">
    <p
      v-if="summary"
      :class="style[summaryClass]"
    >
      {{ summary }}
    </p>
    <cite
      v-if="credit"
      :class="style[citeClass]"
    >
      {{ credit }}
    </cite>
  </div>
</template>

<style lang="scss" module src="./styles/CdrCaption.module.scss">
</style>
