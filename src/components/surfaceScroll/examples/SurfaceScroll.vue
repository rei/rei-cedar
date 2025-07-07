<script setup lang="ts">
import CdrSurfaceScroll from '../CdrSurfaceScroll.vue';
import CdrSurface from '../../surface/CdrSurface.vue';
import CdrText from '../../text/CdrText.vue';
import CdrTitle from '../../title/CdrTitle.vue';

defineOptions({ name: 'SurfaceScrollExample' });

const loremTexts = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
  'Qui officia deserunt mollit anim id est laborum.',
  'At vero eos et accusamus et iusto odio dignissimos ducimus.',
  'Et harum quidem rerum facilis est et expedita distinctio.',
  'Nam libero tempore, cum soluta nobis est eligendi optio.',
  'Temporibus autem quibusdam et aut officiis debitis aut rerum.',
];

interface Frame {
  key: string;
  props: {
    title: string;
    content: string;
    index: number;
  };
}

// Create frames for the surface scroll
const frames: Frame[] = loremTexts.map((text, index) => ({
  key: `card-${index}`,
  props: {
    title: `Card ${index + 1}`,
    content: text,
    index,
  },
}));
</script>

<template>
  <div class="surface-scroll-example">
    <h2>Surface Scroll Example</h2>
    <p>A simple horizontal scrolling example with Lorem Ipsum cards.</p>

    <CdrSurfaceScroll
      id="surface-scroll-demo"
      description="Horizontal scrolling cards with Lorem Ipsum content"
      :frames="frames"
      :frames-gap="16"
      :is-showing-arrows="true"
      class="surface-scroll-example__scroll"
    >
      <template #frame="{ title, content }: Record<string, unknown>">
        <article class="surface-scroll-example__card">
          <CdrSurface
            border-radius="soft"
            background="secondary"
            class="surface-scroll-example__surface"
          >
            <CdrTitle tag="h3" class="surface-scroll-example__title">
              {{ title }}
            </CdrTitle>

            <CdrText class="surface-scroll-example__content">
              {{ content }}
            </CdrText>
          </CdrSurface>
        </article>
      </template>
    </CdrSurfaceScroll>
  </div>
</template>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss' as *;

.surface-scroll-example {
  padding: $cdr-space-two-x;

  h2 {
    margin-bottom: $cdr-space-one-x;
  }

  p {
    margin-bottom: $cdr-space-two-x;
    color: $cdr-color-text-secondary;
  }

  &__scroll {
    width: 100%;
  }

  &__card {
    width: 100%;
    height: 200px;
    outline: none;

    &:focus-visible {
      outline: 2px solid $cdr-color-border-secondary;
      outline-offset: 2px;
    }
  }

  &__surface {
    width: 100%;
    height: 100%;
    padding: $cdr-space-one-and-a-half-x;
    display: flex;
    flex-direction: column;
    gap: $cdr-space-one-x;
  }

  &__title {
    margin: 0;
  }

  &__content {
    margin: 0;
    flex: 1;
  }
}
</style>