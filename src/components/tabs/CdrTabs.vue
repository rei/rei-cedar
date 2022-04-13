<template>
  <div
    :class="mapClasses(style, baseClass, modifierClass, sizeClass)"
    :style="{ height }"
  >
    <ul :class="style['cdr-tabs__header-container']" role="tablist">
      <li v-for="(tab, index) in tabs" 
        :key="tab.name" role="presentation"
        :class="style['cdr-tabs__header']" 
      >
        <button
          :ref="el => { tabElements[index] = el }"
          :id="getTabId(tab.name)"
          :disabled="tab.disabled"
          :aria-disabled="tab.disabled"
          :aria-selected="(selectedIndex === index && !tab.disabled) ? true : false"
          :tabIndex="(selectedIndex === index && !tab.disabled) ? 0 : -1"
          :class="mapClasses(
              style,
              (selectedIndex === index && !tab.disabled) ? 'cdr-tabs__header-item-active' : '',
              'cdr-tabs__header-item',
              tab.disabled ? 'cdr-tabs__header-item--disabled' : '',
            )"
          role="tab"
          @click.prevent="selectTab(index)"
          @keyup.right="selectTabNext"
          @keyup.left="selectTabPrev"
        >{{ tab.name }}</button>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, provide, useSlots, onMounted, nextTick, computed, useCssModule } from 'vue';
import kebabCase from 'lodash/kebabCase';
import mapClasses from '../../utils/mapClasses';
import { buildClass } from '../../utils/buildClass';
import {
  CdrColorBackgroundPrimary, CdrSpaceOneX, CdrSpaceHalfX,
} from '@rei/cdr-tokens/dist/js/cdr-tokens.esm';

const props = defineProps({
    height: {
      type: String,
      default: '240px',
    },
    activeTab: {
      type: Number,
      default: 0,
    },
    modifier: String,
    size: String,
    backgroundColor: {
      type: String,
      default: CdrColorBackgroundPrimary,
    }
})

const slots = useSlots()
const tabs = ref(slots.default().map((tab) => ({ name: tab.props.name, disabled: tab.props.disabled })));
const selectedTabName = ref(null);
const selectedIndex = ref(null);
const tabElements = ref([]);
const baseClass = 'cdr-tabs';

const modifierClass = computed(() => buildClass('cdr-tabs', props.modifier));
const sizeClass = computed(() => props.size && buildClass('cdr-tabs', props.size));

provide("selectedTabName", selectedTabName);

const getTabId = (name) => {
  return `${kebabCase(name)}-tab`
}

const selectTabNext = () => {
  const isLastTab = (selectedIndex.value === tabElements.value.length - 1);
  if (isLastTab) {
    return;
  }

  let nextIndex = selectedIndex.value + 1;
  if(tabElements.value[nextIndex].disabled) {
      nextIndex +=1
  }

  const nextIndexExists = (nextIndex <= tabElements.value.length - 1);
  if (!nextIndexExists){
      return;
  }

  selectTab(nextIndex);
}

const selectTabPrev = () => {
  const isFirstTab = (selectedIndex.value <= 0);
  if (isFirstTab) {
    return;
  }

  let prevIndex = selectedIndex.value - 1;
  if(tabElements.value[prevIndex].disabled) {
      prevIndex -=1
  }

  const previousIndexExists = (prevIndex >= 0);
  if (!previousIndexExists){
      return;
  }
  selectTab(prevIndex)
}

const selectTab = async (index) => {
  const tabToSelect = tabElements.value[index];  
  selectedTabName.value = tabs.value[index].name;
  selectedIndex.value = index;
  await nextTick();
  tabToSelect.focus();
}

onMounted(() => {
  setInitialTabStates();
})

const setInitialTabStates = () => {
tabElements.value.forEach((tab, index) =>{
    if(!tab.disabled && selectedIndex.value === null){
        selectedIndex.value = index;
        selectedTabName.value = tabs.value[index].name;
    }
 })
}

const style = useCssModule();
</script>

<style lang="scss" module src="./styles/CdrTabs.module.scss">
</style>
