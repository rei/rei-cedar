<script setup lang="ts">
import { useCssModule } from 'vue';

/**
 * Live demo for the Sass Mixins guide (Storybook only — not a shipped component).
 * Renders the output of the four Cedar-owned mixin families from src/mixins.
 */
const style: Record<string, string> = useCssModule();

const samples: Array<{ name: string; cls: string; text: string }> = [
  {
    name: 'cdr-text-heading-sans-600',
    cls: 'type-heading-sans-600',
    text: 'Heading sans 600',
  },
  {
    name: 'cdr-text-heading-serif-600',
    cls: 'type-heading-serif-600',
    text: 'Heading serif 600',
  },
  {
    name: 'cdr-text-body-400',
    cls: 'type-body-400',
    text: 'Body 400 — the default paragraph style for long-form content.',
  },
  {
    name: 'cdr-text-eyebrow-100',
    cls: 'type-eyebrow-100',
    text: 'Eyebrow 100',
  },
  {
    name: 'cdr-text-utility-sans-300',
    cls: 'type-utility-sans-300',
    text: 'Utility sans 300 — labels and captions',
  },
];
</script>

<template>
  <div
    id="sass-mixins-demo"
    :class="style.demo"
  >
    <section>
      <h3 :class="style['section-title']">Breakpoint media queries</h3>
      <p :class="style['section-lede']">
        <code>@include mixins.cdr-md-mq-up</code>
        switches styles when the viewport crosses the
        <code>md</code>
        breakpoint (992px).
      </p>
      <div :class="style['mq-box']">
        <span :class="style['mq-below-md']">Below md — viewport narrower than 992px</span>
        <span :class="style['mq-at-md-up']">md or wider — viewport at least 992px</span>
      </div>
      <p :class="style.note">Resize the window until the preview crosses 992px to switch styles.</p>
    </section>

    <section>
      <h3 :class="style['section-title']">Container queries</h3>
      <p :class="style['section-lede']">
        <code>@include mixins.cdr-sm-cq-up</code>
        switches styles when the
        <em>container</em>
        passes 768px — independent of the viewport.
      </p>
      <div :class="style['cq-box']">
        <span :class="style['cq-below-sm']">Container narrower than 768px</span>
        <span :class="style['cq-at-sm-up']">Container at least 768px wide</span>
      </div>
      <p :class="style.note">
        Drag the box's bottom-right corner to resize its container and cross 768px.
      </p>
    </section>

    <section>
      <h3 :class="style['section-title']">Display &amp; utility helpers</h3>
      <div :class="style['well-demo']">
        <p :class="style['section-lede']">
          <code>cdr-container</code>
          well: content typography, padding grows from 1x to 2x at the
          <code>md</code>
          breakpoint, capped at the
          <code>lg</code>
          breakpoint.
        </p>
        <p :class="style['section-lede']">
          This sentence contains visually hidden text:
          <span :class="style['sr-only']">hidden words available to screen readers</span>
          (find it by inspecting the DOM).
        </p>
        <p :class="style['section-lede']">
          Press Tab to reveal a hidden skip link:
          <a
            href="#sass-mixins-demo"
            :class="style['skip-link']"
          >
            Skip to the demo
          </a>
        </p>
      </div>
    </section>

    <section>
      <h3 :class="style['section-title']">Typography</h3>
      <p
        v-for="sample in samples"
        :key="sample.name"
        :class="style['type-row']"
      >
        <code :class="style['type-name']">{{ sample.name }}</code>
        <span :class="style[sample.cls]">{{ sample.text }}</span>
      </p>
    </section>
  </div>
</template>

<style lang="scss" module src="./styles/SassMixinsDemo.module.scss" />
