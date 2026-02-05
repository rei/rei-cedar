<script setup lang="ts">
import { useCssModule, computed, ref, watch, nextTick } from 'vue';
import type { CdrBreadcrumbProps, BreadcrumbItem } from './types';
import uid from '../../utils/uid';

/**
 * CdrBreadcrumb - Navigation used to reveal a page's location within the site hierarchy
 *
 * Provides a hierarchical navigation trail to help users understand their current location
 * and navigate back to parent pages. Supports automatic truncation for long breadcrumb trails.
 */

defineOptions({
  name: 'CdrBreadcrumb',
});

const props = withDefaults(defineProps<CdrBreadcrumbProps>(), {
  truncationEnabled: true,
});

defineSlots<{
  'link'(props: { class: string; href: string; content: string }): any;
}>();

/**
 * Navigate event emitted when a breadcrumb item is clicked
 * @event navigate
 * @param {BreadcrumbItem} breadcrumb - The breadcrumb data object
 * @param {MouseEvent} event - The click event (preventDefault() can be used to override default navigation)
 */
const emit = defineEmits<{
  navigate: [breadcrumb: BreadcrumbItem, event: MouseEvent];
}>();

const style = useCssModule();

/** Unique identifier for the breadcrumb navigation element */
const uniqueId = computed<string>(() => props.id ?? uid());

/** Reactive state controlling whether the breadcrumb list is truncated */
const truncate = ref<boolean>(props.truncationEnabled && props.items.length > 2);

/** References to all link elements in the breadcrumb */
const linkRefs = ref<HTMLAnchorElement[]>([]);

/**
 * Computed label for the ellipsis button that describes the hidden items
 * @returns Accessible label text for screen readers
 */
const ellipsisLabel = computed<string>(() => {
  const hiddenCount = props.items.length - 2;
  const s = hiddenCount > 1 ? 's' : '';
  return `show ${hiddenCount} more navigation level${s}`;
});

/**
 * Handles click on the ellipsis button to expand the full breadcrumb trail
 * Expands the breadcrumb list and focuses the first link for keyboard navigation
 */
const handleEllipsisClick = (): void => {
  truncate.value = false;
  nextTick(() => {
    // Focus the first previously-visible breadcrumb item (items.length - 2)
    // This maintains context by keeping focus on what was already visible
    const firstVisibleIndex = props.items.length - 2;
    if (linkRefs.value[firstVisibleIndex]) {
      linkRefs.value[firstVisibleIndex].focus();
    }
  });
};

/**
 * Watches for changes to the items array and resets truncation state
 */
watch(
  () => props.items,
  () => {
    truncate.value = props.truncationEnabled && props.items.length > 2;
  },
);
</script>

<template>
  <nav
    :id="uniqueId"
    :class="style['cdr-breadcrumb']"
    aria-label="breadcrumbs"
  >
    <ol
      :id="`${uniqueId}List`"
      :class="style['cdr-breadcrumb__list']"
    >
      <li
        :class="style['cdr-breadcrumb__item']"
        v-if="truncate"
      >
        <button
          :class="style['cdr-breadcrumb__ellipses']"
          :aria-controls="`${uniqueId}List`"
          :aria-label="ellipsisLabel"
          aria-expanded="false"
          @click="handleEllipsisClick"
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
        :key="breadcrumb.item.id ?? breadcrumb.item.name.replace(/ /g, '-').toLowerCase()"
        v-show="!truncate || index >= items.length - 2"
        :class="style['cdr-breadcrumb__item']"
      >
        <slot
          name="link"
          :class="style['cdr-breadcrumb__link']"
          :href="breadcrumb.item.url"
          :content="breadcrumb.item.name"
        >
          <a
            :ref="(el) => { if (el) linkRefs[index] = el as HTMLAnchorElement; }"
            :class="style['cdr-breadcrumb__link']"
            :href="breadcrumb.item.url"
            @click="(e: MouseEvent) => emit('navigate', breadcrumb, e)"
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

<style lang="scss" module src="./styles/CdrBreadcrumb.module.scss" />
