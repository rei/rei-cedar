<template>
  <CdrSurfaceScroll
    :scrollbar-props="{ orientation: 'vertical' }"

  class="text-content-scroll">
    <div class="text-container">
      <CdrText tag="h3" class="text-container__title">Scrollable Text Content</CdrText>
      <CdrText class="text-container__paragraph">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </CdrText>
      <CdrText class="text-container__paragraph">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
        in culpa qui officia deserunt mollit anim id est laborum.
      </CdrText>
      <CdrText class="text-container__paragraph">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
        veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </CdrText>
      <CdrText class="text-container__paragraph">
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
        sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      </CdrText>
      <CdrText class="text-container__paragraph">
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
        adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
        dolore magnam aliquam quaerat voluptatem.
      </CdrText>
      <CdrText class="text-container__paragraph">
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit 
        laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure 
        reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
      </CdrText>
    </div>
  </CdrSurfaceScroll>
</template>

<script setup lang="ts">
import CdrSurfaceScroll from '../../CdrSurfaceScroll.vue';
import CdrText from '../../../text/CdrText.vue';
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss' as *;

.text-content-scroll {
  width: 100%;
  height: 300px;
  border: 1px solid $cdr-color-border-primary;
  border-radius: $cdr-radius-softer;
}

.text-container {
  padding: $cdr-space-one-x;

  &__title {
    margin-bottom: $cdr-space-one-x;
    color: $cdr-color-text-primary;
    font-weight: 600;
    border-bottom: 1px solid $cdr-color-border-secondary;
    padding-bottom: $cdr-space-half-x;
  }

  &__paragraph {
    margin-bottom: $cdr-space-one-x;
    color: $cdr-color-text-secondary;
    line-height: 1.5;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
