<script setup lang="ts">
import CdrLayout from '../CdrLayout.vue';
import CdrSurface from '../../surface/CdrSurface.vue';
import CdrText from '../../text/CdrText.vue';
import type { Layout } from '../../../types/interfaces';

defineOptions({ name: 'Layout' });

interface LayoutExample {
  props: Layout;
  children: number;
  label: string;
}

const layouts: LayoutExample[] = [
  {
    label: 'Basic columns',
    props: {
      gap: 'one-x',
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
    label: 'Using flow in column mode',
    props: {
      gap: 'one-x',
      columns: 'auto',
      flow: 'column',
    },
    children: 3,
  },
  {
    label: 'Using flow in row mode',
    props: {
      gap: 'one-x',
      columns: 'auto',
      flow: 'row',
    },
    children: 3,
  },
  {
    label: 'Responsive columns',
    props: {
      gap: 'one-x',
      columns: { xs: 1, sm: ['100px', 1], md: ['400px', 1], lg: ['800px', 1] },
    },
    children: 2,
  },
  {
    label: 'Responsive rows',
    props: {
      gap: 'one-x',
      rows: { xs: 1, sm: 1, md: [1, 2], lg: [1, 2] },
      class: 'example__layout--tall',
    },
    children: 2,
  },
  {
    label: 'Responsive columns and rows',
    props: {
      gap: 'one-x',
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

    <template v-for="{ props, children, label } in layouts">
      <CdrText>
        <code>
          <strong>{{ label }}</strong>
          <br />
          {{ JSON.stringify(props) }}
        </code>
      </CdrText>
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
    </template>
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
}
</style>
