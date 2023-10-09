<script setup lang="ts">
import {
  useCssModule, computed, ref, watch, nextTick, type PropType
} from 'vue';
import { breadcrumbItem } from '../../types/interfaces';
import uid from '../../utils/uid';

/** Navigation used to reveal a page's location within the site hierarchy */
defineOptions({
  name: 'CdrBreadcrumb',
});

const props = defineProps({
   /**
     * Sets the array of a breadcrumb object containing a 'url' and 'name' property.
     * @demoIgnore true
     */
     items: {
      type: Array as PropType<breadcrumbItem[]>,
      default: () => [],
      validator: (value: breadcrumbItem[]) => {
        if (value.length && value.length > 0) {
          for (let i = 0; i < value.length; i += 1) {
            if (!(typeof value[i].item === 'object')) {
              console.error('Breadcrumb items array missing item key at index ', i); // eslint-disable-line no-console
              return false;
            }
            if (!Object.hasOwnProperty.call(value[i].item, 'name')) {
              console.error('Breadcrumb items array is missing item.name value at index ', i); // eslint-disable-line no-console
              return false;
            }
          }
        }
        return true;
      },
    },
    /**
     * Controls the ability to truncate the entire breadcrumb path. If this value is false, truncation will no longer occur.
     */
    truncationEnabled: {
      type: Boolean,
      default: true,
    },
    /**
     * Define a custom ID for the `<nav>` element. Randomly generated if no ID provided.
     * @demoIgnore true
     */
    id: {
      type: String,
    },
});
defineEmits({
      /**
     * Emits when a breadcrumb item is clicked. `e.preventDefault()` may be used to override the default link navigation.
     * @param breadcrumb The breadcrumb data object
     */

     navigate: null,
});
const style = useCssModule();
const uniqueId = props.id ? props.id : uid();
const truncate = ref(props.truncationEnabled && props.items.length > 2);
const itemListEl = ref<HTMLAnchorElement | null>(null);
const firstAnchorEl = ref<HTMLAnchorElement | null | undefined>(null);
const ellipsisLabel = computed(() => {
  const s = (props.items.length - 2) > 1 ? 's' : '';
  return `show ${props.items.length - 2} more navigation level${s}`;
});

const handleEllipsisClick = () => {
  truncate.value = false;
  nextTick(() => {
    firstAnchorEl.value = itemListEl.value?.querySelector('li a');
    firstAnchorEl.value?.focus();
  });
};

watch(() => props.items, () => {
  truncate.value = props.truncationEnabled && props.items.length > 2;
});
</script>

<template>
  <nav
    :class="style['cdr-breadcrumb']"
    :id="uniqueId"
    aria-label="breadcrumbs"
  >
    <ol
      :id="`${uniqueId}List`"
      :class="style['cdr-breadcrumb__list']"
      ref="itemListEl"
    >
      <li
        :class="style['cdr-breadcrumb__item']"
        v-if="truncate"
      >
        <button
          @click="handleEllipsisClick"
          aria-expanded="false"
          :class="style['cdr-breadcrumb__ellipses']"
          :aria-controls="`${uniqueId}List`"
          :aria-label="ellipsisLabel"
        >
          <span
            :class="style['cdr-breadcrumb__ellipses-icon']"
            aria-hidden="true"
          >
            . . .
          </span>
        </button>
        <span
          :class="style['cdr-breadcrumb__delimiter']"
          aria-hidden="true"
        >
          /
        </span>
      </li>

      <li
        v-for="(breadcrumb, index) in items"
        :class="style['cdr-breadcrumb__item']"
        :key="breadcrumb.item.id || breadcrumb.item.name.replace(/ /g, '-').toLowerCase()"
        v-show="!truncate || (index >= items.length - 2)"
      >
        <slot
          name="link"
          :class="style['cdr-breadcrumb__link']"
          :href="breadcrumb.item.url"
          :content="breadcrumb.item.name"
        >
          <a
            :class="style['cdr-breadcrumb__link']"
            :href="breadcrumb.item.url"
            @click="(e) => $emit('navigate', breadcrumb, e)"
          >
            {{ breadcrumb.item.name }}
          </a>
        </slot>

        <span
          v-if="index < items.length - 1"
          :class="style['cdr-breadcrumb__delimiter']"
          aria-hidden="true"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" module src="./styles/CdrBreadcrumb.module.scss">
</style>
