<script setup lang="ts">
import {
  ref, provide, onMounted, nextTick, computed, useCssModule, useSlots,
} from 'vue';
import type { ComponentInternalInstance } from 'vue';
import { debounce } from '../../utils/debounce'
import {
  CdrColorBackgroundPrimary, CdrSpaceOneX, CdrSpaceHalfX,
} from '@rei/cdr-tokens/dist/rei-dot-com/js/cdr-tokens.mjs';
import mapClasses from '../../utils/mapClasses';
import { modifyClassName } from '../../utils/buildClass';
import { selectedTabKey } from '../../types/symbols';

/** Organizes related content into groups for people to navigate between */
defineOptions({
  name: 'CdrTabs'
});

const props = defineProps({
  /**
   * Sets height of the tabs container element.
   * Passing a `px` value will render tabs with a static height,
   * passing `auto` will render tabs with variable height based on content size.
   */
    height: {
    type: String,
    default: '240px',
  },
  /** Sets the index of the tab that should be active on initial page load. Note that this property is zero-indexed. */
  activeTab: {
    type: Number,
    default: 0,
  },
  /**
   * Modifies the style variants for this component
   * @values centered, compact, full-width, no-border
   */
  modifier: String,
  /**
   * Use `small` to reduce spacing around the tabs for a denser visual design
   * @demoSelectMultiple true
   * @values small
  */
  size: String,
  /**
   * Sets the background color of the tab.
   * For CdrTabs that are rendered on non-primary backgrounds.
   * Pass the background-color into the component to ensure that the scrolling gradients render correctly.
   */
  backgroundColor: {
    type: String,
    default: CdrColorBackgroundPrimary,
  },
});
const style = useCssModule();
const slots = useSlots();

const slottedTabs = computed<any>(() => slots.default?.()[0]?.children?.length
  ? slots.default?.()[0]?.children
  : slots.default?.());

const baseClass = 'cdr-tabs';

// Refs
// const tabs = ref(slottedTabs?.map((tab) => ({
//   name: tab.props.name,
//   disabled: tab.props.disabled,
//   id: tab.props['aria-labelledby'],
// })));

const tabs = computed(() => {
  if (slottedTabs.value) {
    return slottedTabs.value.map((tab: ComponentInternalInstance) => ({
      name: tab.props.name,
      disabled: tab.props.disabled,
      id: tab.props['aria-labelledby'],
    }));
  } else {
    return []; // Return an empty array if there are no slottedTabs
  }
});

const selectedTabName = ref(null);
const selectedIndex = ref<number | null>(null);
// const selectedIndex = ref(0);
const headerOverflow = ref(false);
const headerWidth = ref(0);
const tabElements = ref<HTMLButtonElement[]>([]);
const tablist = ref<HTMLUListElement | null>(null);
const containerEl = ref<HTMLDivElement | null>(null);
const overflowLeft = ref(false);
const overflowRight = ref(false);
const underlineOffsetX = ref(0);
const underlineWidth = ref(0);

provide(selectedTabKey, selectedTabName);

// Computed
const modifierClass = computed(() => props.modifier
  ? modifyClassName('cdr-tabs', props.modifier) : '');
const sizeClass = computed(() => props.size ? modifyClassName('cdr-tabs', props.size) : '');
const underlineStyle = computed(() => ({
  transform: `translateX(${underlineOffsetX.value}px)`,
  width: `${underlineWidth.value}px`,
}));
const gradientLeftStyle = computed(() => {
  const gradient = `linear-gradient(to left, rgba(255, 255, 255, 0), ${props.backgroundColor})`;
  return {
    background: gradient,
  };
});
const gradientRightStyle = computed(() => {
  const gradient = `linear-gradient(to right, rgba(255, 255, 255, 0),
    ${props.backgroundColor})`;
  return {
    background: gradient,
  };
});
const checkIfActive = (index: number, tab: any) => (selectedIndex.value === index && !tab.disabled);
const calculateOverflow = () => {
  let containerWidth = 0;
  if (containerEl.value) {
    containerWidth = containerEl.value.offsetWidth;
  }
  headerOverflow.value = headerWidth.value > containerWidth;
  if (headerOverflow.value) {
    // Get Scroll Position
    const scrollX = tablist.value?.scrollLeft ?? 0;
    overflowLeft.value = scrollX > 1;
    overflowRight.value = (scrollX + 1) < (headerWidth.value - containerWidth);
    
  } else {
    overflowLeft.value = false;
    overflowRight.value = false;
  }
};

const getHeaderWidth = () => {
  let headerElements: Element[] = [];
  if (tablist.value) {
    headerElements = Array.from(tablist.value.children);
  }
  let totalWidth = 0;
  headerElements.forEach((element, i) => {
    // account for margin-left on header elements
    if (i > 0) {
      totalWidth += props.size === 'small' ? Number(CdrSpaceHalfX) : Number(CdrSpaceOneX);
    }
    totalWidth += (element as HTMLElement).offsetWidth || 0;
  });
  return totalWidth;
};

const updateUnderline = () => {
  if (tabElements.value.length > 0) {
    const activeTab = tabElements.value[selectedIndex.value || 0];
    const activeRect = (activeTab as HTMLElement).getBoundingClientRect();
    const parentRect = tablist.value?.getBoundingClientRect();
    const offset = parentRect ? activeRect.x - parentRect.x : 0;

    underlineOffsetX.value = tablist.value ? offset - tablist.value?.scrollLeft : 0;
    underlineWidth.value = activeRect.width;

    // shrink/hide the underline if it scrolls outside the container
    if (parentRect && underlineOffsetX.value + underlineWidth.value >= parentRect.width) {
      underlineWidth.value = Math.max(0, parentRect.width - underlineOffsetX.value);
      underlineOffsetX.value = Math.min(underlineOffsetX.value, parentRect.width);
    } else if (underlineOffsetX.value < 0) {
      underlineWidth.value = Math.max(0, underlineWidth.value + underlineOffsetX.value);
      underlineOffsetX.value = 0;
    }
  }
};
const selectTab = async (index: number) => {
  const tabToSelect = tabElements.value[index];
  selectedTabName.value = tabs.value[index].name;
  selectedIndex.value = index;
  await nextTick();
  (tabToSelect as HTMLElement).focus();
  updateUnderline();
};

const selectTabNext = () => {

  const isLastTab = (selectedIndex.value === tabElements.value.length - 1);
  if (isLastTab) {
    return;
  }

  let nextIndex = (selectedIndex.value || 0) + 1;
  if (tabElements.value[nextIndex].disabled) {
    nextIndex += 1;
  }

  const nextIndexExists = (nextIndex <= tabElements.value.length - 1);
  if (!nextIndexExists) {
    return;
  }

  selectTab(nextIndex);
};

const selectTabPrev = () => {
  const isFirstTab = (selectedIndex.value && selectedIndex.value <= 0);
  if (isFirstTab) {
    return;
  }

  let prevIndex = (selectedIndex.value || 0) - 1;
  if (tabElements.value[prevIndex].disabled) {
    prevIndex -= 1;
  }

  const previousIndexExists = (prevIndex >= 0);
  if (!previousIndexExists) {
    return;
  }
  selectTab(prevIndex);
};

const setInitialTabStates = () => {
  tabElements.value.forEach((tab, index) => {
    if (!tab.disabled && selectedIndex.value === null) {
      selectedIndex.value = index;
      selectedTabName.value = tabs.value[index].name;
    }
  });
};

onMounted(() => {
  setInitialTabStates();
  headerWidth.value = getHeaderWidth();
  calculateOverflow();
  setTimeout(() => {
    updateUnderline();
  }, 250);
  window.addEventListener('resize', debounce(() => {
    headerWidth.value = getHeaderWidth();
    calculateOverflow();
    updateUnderline();
  }, 250));
  tablist.value?.addEventListener('scroll', debounce(() => {
    calculateOverflow();
    updateUnderline();
  }, 50));
});


</script>

<template>
  <div
    :class="mapClasses(style, baseClass, modifierClass, sizeClass)"
    ref="containerEl"
    :style="{ height }"
  >
    <div
      :class="style['cdr-tabs__gradient-container']"
    >
      <div
        :class="mapClasses(
          style,
          'cdr-tabs__gradient',
          'cdr-tabs__gradient--left',
          overflowLeft ? 'cdr-tabs__gradient--active' : ''
        )"
        :style="gradientLeftStyle"
      />
      <ul
        :class="style['cdr-tabs__header-container']"
        role="tablist"
        ref="tablist"
      >
        <li
          v-for="(tab, index) in tabs"
          :key="`${tab.name}-${index}`"
          role="presentation"
          :class="style['cdr-tabs__header']"
        >
          <button
            :ref="(el: HTMLButtonElement | any) => { tabElements[index] = el }"
            :id="tab.id"
            :disabled="tab.disabled"
            :aria-selected="checkIfActive(index, tab)"
            :tabIndex="checkIfActive(index, tab) ? 0 : -1"
            :class="mapClasses(
              style,
              checkIfActive(index, tab) ? 'cdr-tabs__header-item-active' : '',
              'cdr-tabs__header-item',
              tab.disabled ? 'cdr-tabs__header-item--disabled' : '',
            )"
            role="tab"
            @click.prevent="selectTab(index)"
            @keyup.right="selectTabNext"
            @keyup.left="selectTabPrev"
          >
            {{ tab.name }}
          </button>
        </li>
      </ul>
      <div
        :class="mapClasses(
          style,
          'cdr-tabs__gradient',
          'cdr-tabs__gradient--right',
          overflowRight ? 'cdr-tabs__gradient--active' : '',
        )"
        :style="gradientRightStyle"
      />
      <div
        :class="style['cdr-tabs__underline']"
        :style="underlineStyle"
      />
    </div>
    <!-- @slot CdrTabs content (CdrTabPanel components) -->
    <slot />
  </div>
</template>

<style lang="scss" module src="./styles/CdrTabs.module.scss">
</style>