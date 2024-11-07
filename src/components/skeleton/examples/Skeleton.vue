<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Skeleton',
  components: {
    ...Components,
  },
  data() {
    return {
      motionToggle: true,
    };
  },
};
</script>

<template>
  <div>
    <h2>skeleton 💀</h2>
    <CdrSwitch
      id="motion-toggle"
      v-model="motionToggle"
    >
      Motion
    </CdrSwitch>
    <h3>default</h3>
    <CdrSkeleton :motion="motionToggle">
      <CdrSkeletonBone />
    </CdrSkeleton>
    <h3>heading</h3>
    <CdrSkeleton :motion="motionToggle">
      <CdrSkeletonBone type="heading" />
    </CdrSkeleton>

    <h3>line</h3>
    <CdrSkeleton :motion="motionToggle">
      <CdrSkeletonBone type="line" />
      <CdrSkeletonBone type="line" />
      <CdrSkeletonBone type="line" />
      <CdrSkeletonBone type="line" />
      <CdrSkeletonBone type="line" />
    </CdrSkeleton>
    <h3>rectangle (4:3 image)</h3>
    <CdrSkeleton :motion="motionToggle">
      <CdrSkeletonBone type="rectangle" />
    </CdrSkeleton>
    <h3>square (1:1 image)</h3>
    <CdrSkeleton :motion="motionToggle">
      <CdrSkeletonBone type="square" />
    </CdrSkeleton>
    <h3>custom</h3>
    <hr style="margin: 6.4rem 0">
    <h2>Loading example</h2>
    <h3>Card example</h3>
    <CdrSkeleton :loaded="onLoad">
      <!--  Skelly -->
      <cdr-card class="skeleton-card">
        <section>
          <CdrSkeletonBone type="rectangle" />
          <div class="inset">
            <CdrSkeletonBone type="heading" />
            <div class="skeleton-card--body">
              <CdrSkeletonBone type="line" />
              <CdrSkeletonBone type="line" />
              <CdrSkeletonBone type="line" />
            </div>
          </div>
        </section>
      </cdr-card>
      <!-- Content  -->
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
              <h2>
                Complex Card Title
              </h2>
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
    </CdrSkeleton>
  </div>
</template>

<style lang="scss">
  .custom {
    inline-size: 50rem;
    block-size: 35rem;
    border-radius: 999;
  }
  .skeleton-card {
    max-width: 250px;
    width: 250px;
    &--body {
      * {
        margin-bottom: 0.5rem;
      }
    }
}
</style>
