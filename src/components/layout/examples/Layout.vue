<script setup lang="ts">
import CdrLayout from '../CdrLayout.vue';
import CdrSurface from '../../surface/CdrSurface.vue';
import CdrText from '../../text/CdrText.vue';
import type { Layout, HtmlAttributes } from '../../../types/interfaces';

defineOptions({ name: 'Layout' });

interface LayoutExample {
  props: Layout | HtmlAttributes;
  children: number;
  label: string;
  isNarrow?: boolean;
}

const layouts: LayoutExample[] = [
  {
    label: 'Basic columns',
    props: {
      columns: 2,
    },
    children: 2,
  },
  {
    label: 'Ratio columns',
    props: {
      gap: 'one-x',
      columns: [2, 1],
    },
    children: 2,
  },
  {
    label: 'Using flow to generate columns',
    props: {
      gap: 'one-x',
      flow: 'column',
      flowValue: '100px',
    },
    children: 3,
  },
  {
    label: 'Container query columns',
    props: {
      gap: 'scale-3--5',
      columns: { xs: 1, sm: ['100px', 1], md: ['400px', 1], lg: ['800px', 1] },
    },
    children: 2,
  },
  {
    label: 'Container query columns with 70% width container',
    props: {
      gap: 'one-x',
      columns: { xs: 1, sm: ['100px', 1], md: ['400px', 1], lg: ['800px', 1] },
    },
    children: 2,
    isNarrow: true,
  },
  {
    label: 'Media query columns',
    props: {
      queryType: 'media',
      gap: 'one-x',
      columns: { xs: 1, sm: ['100px', 1], md: ['400px', 1], lg: ['800px', 1] },
    },
    children: 2,
  },
  {
    label: 'Responsive columns and rows with different gaps',
    props: {
      rowGap: 'one-x',
      columnGap: 'three-x',
      columns: { xs: 1, sm: 1, md: ['400px', 1], lg: ['400px', 1] },
      rows: { xs: 1, sm: 1, md: [1, 2], lg: [1, 2] },
      class: 'example__layout--tall',
    },
    children: 4,
  },
];
</script>

<template>
  <div class="example">
    <h2>Layout</h2>

    <hr class="example__hr" />

    <template v-for="{ props, children, label, isNarrow } in layouts">
      <CdrText>
        <code>
          <strong>{{ label }}</strong>
          <br />
          {{ JSON.stringify(props) }}
        </code>
      </CdrText>
      <div :class="{ example__container: true, 'example__container--narrow': isNarrow }">
        <CdrLayout
          v-bind="props"
          class="example__surface"
        >
          <CdrSurface
            v-for="index in children"
            background="secondary"
            class="example__cell"
          >
            {{ index }}
          </CdrSurface>
        </CdrLayout>
      </div>
    </template>

    <CdrText>
      <code><strong>Responsive nested layout</strong></code>
    </CdrText>
    <CdrLayout
      class="example__surface"
      gap="one-x"
      :columns="{ xs: 1, sm: 1, md: 2, lg: 2 }"
    >
      <CdrLayout
        class="example__layout-cell"
        gap="one-x"
        :columns="{ xs: 2, sm: 2, md: 2, lg: 2 }"
        :as="CdrSurface"
        background="secondary"
      >
        <CdrLayout
          class="example__layout-cell"
          gap="one-x"
          :columns="{ xs: 1, sm: 1, md: 2, lg: 3 }"
          :rows="{ xs: 1, sm: 1, md: 3, lg: 2 }"
          background="secondary"
        >
          <CdrSurface
            v-for="index in 6"
            background="primary"
            class="example__cell"
          >
            {{ index }}
          </CdrSurface>
        </CdrLayout>
        <CdrSurface
          background="primary"
          class="example__cell"
        >
          2
        </CdrSurface>
      </CdrLayout>
      <CdrSurface
        background="secondary"
        class="example__cell"
      >
        2
      </CdrSurface>
    </CdrLayout>
  </div>
</template>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.example {
  &__hr {
    margin: $cdr-space-two-x 0;
  }

  &__surface {
    margin-bottom: $cdr-space-two-x;
  }

  &__container {
    container-type: inline-size;
  }

  &__layout-cell {
    padding: $cdr-space-half-x;
  }

  &__cell {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $cdr-space-half-x;
  }

  &__layout {
    &--tall {
      height: 200px;

      @include cdr-sm-mq-down {
        height: auto;
      }
    }
  }

  &__container {
    &--narrow {
      container-type: inline-size;
      width: 70%;
    }
  }
}
</style>
