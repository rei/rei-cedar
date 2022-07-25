<template>
  <ul :class="style['segmented-control']" role="radiogroup" aria-label="things-foo">
    <li
      v-for="(item, index) in items"
      :key="`${item}-${index}`"
      :class="style['segmented-control__item']"
      role="presentation"
    >
      <button 
        role="radio"
        :ref="el => { toggleButtonElements[index] = el }"
        :aria-checked="selectedIndex === index ? true : false"
        :tabindex="focusedIndex === index ? 0 : -1"
        @click.prevent="selectToggleButton($event, index)"
        @keyup.right="focusNext(index)"
        @keyup.left="focusPrev(index)"
      >
        {{ item }}
      </button>
    </li>
  </ul>
</template>

<script setup>
import { ref, provide, useSlots, onMounted, nextTick, computed, useCssModule } from 'vue';
const props = defineProps({
  items: {
    required: true,
    type: Array,
    validator: (value) => {
      const result = value.every((item) => {
        if (typeof item !== 'string') {
          console.error('All toggleButton items must be of type string', item);
          return false;
        }
        return true;
      });
      return result;
    },
  },
});
const selectedIndex = ref(0);
const focusedIndex = ref(0);
const toggleButtonElements = ref([]);
const style = useCssModule();

const selectToggleButton = (event, index) => {
  selectedIndex.value = index;
  focusedIndex.value = index;
  toggleButtonElements.value[index].focus();
}

const focusNext = (index) => {
  // const isLastButton = (focusedIndex.value === toggleButtonElements.value.length - 1);
  // if (isLastButton) {
  //   return;
  // }

  const nextIndex = index + 1;
  focusedIndex.value = nextIndex;
  toggleButtonElements.value[nextIndex].focus();
}

const focusPrev = (index) => {
  // const isLastButton = (focusedIndex.value === toggleButtonElements.value.length - 1);
  // if (isLastButton) {
  //   return;
  // }

  const prevIndex = index - 1;
  focusedIndex.value = prevIndex;
  toggleButtonElements.value[prevIndex].focus();
}

</script>


<style lang="scss" module src="./styles/CdrToggleButton.module.scss">
</style>
