<script>
import {
  defineComponent, useCssModule, computed, ref, watch, nextTick,
} from 'vue';
import uid from '../../utils/uid';

export default defineComponent({
  name: 'CdrBreadcrumb',
  props: {
    /**
     * Sets the array of a breadcrumb object containing a 'url' and 'name' property.
     * @demoIgnore true
     */
    items: {
      type: Array,
      default: () => [],
      validator: (value) => {
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
  },
  emits: {
    /**
     * Emits when a breadcrumb item is clicked. `e.preventDefault()` may be used to override the default link navigation.
     */
    navigate: null,
  },

  setup(props) {
    const uniqueId = props.id ? props.id : uid();
    const truncate = ref(props.truncationEnabled && props.items.length > 2);
    const itemListEl = ref(null);
    const ellipsisLabel = computed(() => {
      const s = (props.items.length - 2) > 1 ? 's' : '';
      return `show ${props.items.length - 2} more navigation level${s}`;
    });

    const handleEllipsisClick = () => {
      truncate.value = false;
      nextTick(() => {
        itemListEl.value.querySelector('li a').focus();
      });
    };

    watch(() => props.items, () => {
      truncate.value = props.truncationEnabled && props.items.length > 2;
    });

    return {
      style: useCssModule(),
      uniqueId,
      truncate,
      itemListEl,
      ellipsisLabel,
      handleEllipsisClick,
    };
  },
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
            @click="$emit('navigate', breadcrumb, e)"
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
