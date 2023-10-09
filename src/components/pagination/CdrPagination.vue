<script setup lang="ts">
import {
  useCssModule, computed, ref, watch, nextTick, onMounted, type PropType
} from 'vue';
import { paginationItem } from '../../types/interfaces';
import mapClasses from '../../utils/mapClasses';
import propValidator from '../../utils/propValidator';
import IconCaretLeft from '../icon/comps/caret-left.vue';
import IconCaretRight from '../icon/comps/caret-right.vue';
import CdrSelect from '../select/CdrSelect.vue';
import uid from '../../utils/uid';

/** Allows people to navigate to the next or previous page within an experience */
defineOptions({
  name: 'CdrPagination'
});

const props = defineProps({
  /**
   * Define a custom slug for the generated pagination item IDs. Slug is randomly generated if no ID provided.
   * @demoIgnore true
   */
    id: {
    type: String,
  },
  /**
   * Sets the total number of pages for displaying "Page x of <totalPages>".
   * Sometimes the total number of pages is different than total page data objects in the pages array.
   * For example, if only the next and previous pages are provided.
   */
  totalPages: {
    type: Number,
    default: null,
  },
  /**
   * Array of objects containing pagination data.
   * Objects must have structure of `{ page: number, url: string }`
   */
  pages: {
    type: Array as PropType<paginationItem[]>,
    required: true,
    validator: (value: paginationItem[]) => {
      const result = value.every((obj) => {
        if (!Object.prototype.hasOwnProperty.call(obj, 'page')
        || typeof obj.page !== 'number') {
          console.error('Property "page" is missing or is not a number', obj); // eslint-disable-line
          return false;
        } if (!Object.prototype.hasOwnProperty.call(obj, 'url')
        || typeof obj.url !== 'string') {
          console.error('Property "url" is missing or is not a string', obj); // eslint-disable-line
          return false;
        }
        return true;
      });
      return result;
    },
  },
  /**
   * Sets which tag type is used to render pagination elements
   * @values a, button
   */
  linkTag: {
    type: String,
    default: 'a',
    validator: (value: string) => propValidator(
      value,
      ['a', 'button'],
    ),
  },
  /**
   * Used to customize the aria-label for the root pagination element.
   * For page-level pagination (i.e, pagination that updates the entire page content and changes the URL)
   * this property should be omitted.
   * For intra-page navigation this property should describe the element being paginated, for example:
   * `Pagination for sub-content`
   */
  forLabel: {
    type: String,
    default: '',
  },
  /** @ignore used for binding v-model, represents the current page */
  modelValue: {
    type: Number,
  },
});

const emits = defineEmits({
  /**
   * Event emitted by v-model on the select <input> element to indicate current page.
   * Only used on small devices
   * @param modelValue
   */
    'update:modelValue': null,
  /**
   * $emit event fired when page changes based on user interaction by clicking a link
   * or selecting an option from the select on mobile.
   * `event.preventDefault()` can be used to override the default link navigation behavior.
   */
  navigate: null,  
});

const style = useCssModule();
const currentIdx = ref(0);
const linkRefs = ref<HTMLElement[]>([]);
const uniqueId = props.id ? props.id : uid();
const setCurrentIdx = (page: number | undefined) => {
  currentIdx.value = (props.pages).map((x) => x.page).indexOf(page as number);
};
const innerValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    setCurrentIdx(val);
    emits('update:modelValue', val);
  },
});

const currentUrl = computed(() => props.pages[currentIdx.value].url);

const navigate = (pageNum: number, e: Event) => {
// Dont do anything if clicking the current active page
  const paginationLinkIsVisible = (e.target as HTMLElement)?.offsetWidth
    > 0 && (e.target as HTMLElement)?.offsetHeight > 0;
  if (pageNum === innerValue.value && paginationLinkIsVisible) {
    e.preventDefault();
    return;
  }
  innerValue.value = pageNum;
  emits('navigate', pageNum, currentUrl.value, e);
  nextTick(() => {
  // Done in a nextTick() to ensure rendering complete
    try {
    // Emulate native link click page reloading behaviour by blurring the
    // paginator and returning focus to the document
      const target = e.currentTarget as HTMLElement || e.target as HTMLElement;
      target?.blur();
    } catch (err) {
    // eslint-disable-next-line no-console
      console.error(err);
    }
  });
};

const select = (e: Event) => {
  const linkToClick = linkRefs.value.find(
    (link) => link?.innerHTML === (e.target as HTMLInputElement)?.value);
  if (linkToClick) {
    linkToClick.click();
  }
};

const ariaLabel = computed(() => props.forLabel || 'Pagination');
const prevPageData = computed(() => props.pages[currentIdx.value - 1]);
const nextPageData = computed(() => props.pages[currentIdx.value + 1]);

const paginationData = computed(() => {
  const total = props.pages.length;
  const current = innerValue.value;
  const delta = 1;
  let range: paginationItem[] = [];
  let over5 = true;
  let over5remain = true;

  if (total <= 7) {
  // all pages
    return props.pages;
  }
  if (!current) return;
  if (current < 5) {
    // if first 5 pages
    over5 = false;
    // [2-5]
    range = props.pages.slice(1, 5);
  } else if (total - current < 4) {
    // if last 5 pages
    over5remain = false;
    range = props.pages.slice(-5, -1);
  } else {
    // else in between
    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(total - 1, current + delta);
      i += 1
    ) {
      range.push(props.pages[i - 1]);
    }
  }

  if ((current - delta > 2) && over5) {
    range.unshift({ page: 0, url: '', ellip: true });
  }
  if ((current + delta < total - 1) && over5remain) {
    range.push({ page: 0, url: '', ellip: true });
  }

  range.unshift(props.pages[0]);
  range.push(props.pages[total - 1]);

  return range;
});

onMounted(() => setCurrentIdx(innerValue.value));
watch(() => props.pages, () => setCurrentIdx(innerValue.value));

</script>

<template>
  <nav :aria-label="ariaLabel">
    <ol :class="style['cdr-pagination']">
      <li v-if="innerValue && innerValue > pages[0].page">
        <component
          :is="linkTag"
          aria-label="Go to previous page"
          :href="(linkTag === 'a' && prevPageData && prevPageData.url) || undefined"
          :class="mapClasses(style, 'cdr-pagination__link', 'cdr-pagination__prev')"
          @click="(e: Event) => navigate(prevPageData.page, e)"
        >
          <icon-caret-left :class="style['cdr-pagination_caret--prev']" />
          Prev
        </component>
      </li>
      <li
        v-else
        aria-hidden="true"
      >
        <span
          aria-disabled="true"
          :class="mapClasses(style,
                             'cdr-pagination__link',
                             'cdr-pagination__prev',
                             'cdr-pagination__link--disabled')"
        >
          <icon-caret-left
            :class="style['cdr-pagination_caret--prev']"
            inherit-color
          />
          Prev
        </span>
      </li>

      <li
        v-for="(n, i) in paginationData"
        :key="`pagination-${uniqueId}-li-${n.page}`"
        :class="style['cdr-pagination__li--links']"
      >

        <component
          v-if="!n.ellip"
          :is="linkTag"
          :id="`pagination-${uniqueId}-link-${n.page}`"
          :class="mapClasses(
            style,
            'cdr-pagination__link',
            n.page === innerValue ? 'cdr-pagination__link--current' : ''
          )"
          :aria-label="n.page === innerValue
            ? `Current page, page ${n.page}`
            : `Go to page ${n.page}`"
          :aria-current="n.page === innerValue ? 'page' : null"
          :href="(linkTag === 'a' && n.url) || undefined"
          :ref="(el: HTMLElement) => { linkRefs[i] = el }"
          @click="(e: Event) => navigate(n.page, e)"
        >
          {{ n.page }}
        </component>
        <span
          v-else
          :class="style['cdr-pagination__ellipse']"
        >
          &hellip;
        </span>
      </li>

      <li :class="style['cdr-pagination__li--select']">
        <cdr-select
          :id="`pagination-select-${uniqueId}`"
          v-model="innerValue"
          label="Navigate to page"
          hide-label
          @change.prevent="(e: Event) => select(e)"
        >
          <option
            v-for="page in paginationData?.filter(n => n.page)"
            :key="`pagination-${uniqueId}-select-${page.page}`"
            :value="page.page"
          >
            Page {{ page.page }}{{ totalPages === null ? '' : ` of ${totalPages}` }}
          </option>
        </cdr-select>
      </li>

      <li v-if="innerValue && innerValue < pages[pages.length - 1].page">
        <component
          :is="linkTag"
          aria-label="Go to next page"
          :href="(linkTag === 'a' && nextPageData && nextPageData.url) || undefined"
          :class="mapClasses(style, 'cdr-pagination__link', 'cdr-pagination__next')"
          @click="(e: Event) => navigate(nextPageData.page, e)"
        >
          Next
          <icon-caret-right :class="style['cdr-pagination_caret--next']" />
        </component>
      </li>
      <li
        v-else
        aria-hidden="true"
      >
        <span
          aria-disabled="true"
          :class="mapClasses(style,
                             'cdr-pagination__link',
                             'cdr-pagination__next',
                             'cdr-pagination__link--disabled')"
        >
          Next
          <icon-caret-right
            :class="style['cdr-pagination_caret--next']"
            inherit-color
          />
        </span>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" module src="./styles/CdrPagination.module.scss">
</style>
