<template>
  <div>
    <cdr-card class="fluid-card-example">
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
          <CdrTitle tag="p">
            Fluid title component
          </CdrTitle>
          </cdr-link>
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
.fluid-card-example {
  container-type: inline-size;
  width: 100%;
}
</style>
