<template>
  <div>
    <cdr-card class="card-example">
      <section>
        <div>
          <cdr-img
            alt="card test image"
            src="/src/dev/static/test-image.png"
            modifier="responsive"
          />
        </div>
        <div class="inset">
          <cdr-link
            class="cdr-card__link"
            href="#foo"
          >
          <CdrHeadingSubheadingBlock heading-tag="h3">
            Fluid heading
            <template #subheading>
              Fluid subheading goes here
            </template>
          </CdrHeadingSubheadingBlock>
          </cdr-link>
          <cdr-rating
            rating="4.2"
            count="12"
            size="small"
          />
          <cdr-text class="cdr-text-dev--body-300">
            Card content
          </cdr-text>
        </div>
      </section>
    </cdr-card>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
    name: 'FluidHeadingCard',
    components: Components,
};
</script>

<style>
.card-example {
  container-type: inline-size;
  max-width: 250px;
  width: 250px;
}
</style>
