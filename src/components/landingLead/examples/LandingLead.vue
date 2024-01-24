<template>
  <div style="min-height: 100vh">
    <CdrToggleGroup v-model="palettes" style="max-width: clamp(300px, 25vw, 30vw)">
      <CdrToggleButton toggle-value="default">
        Default
      </CdrToggleButton>
      <CdrToggleButton toggle-value="sandstone">
        Sandstone
      </CdrToggleButton>
    </CdrToggleGroup>
    <h2>Static landing lead composition</h2>
    <CdrLandingLead
      :class="`theme-${palettes}`"
      img-src="src/dev/static/lead-static.jpg"
      heading="Camp with no reservations."
      subheading="We have the know-how to equip you to camp in the middle of nowhere."
    />

    <h2>Static landing lead w/out valid image path</h2>
    <CdrLandingLead
      :class="`theme-${palettes}`"
      img-src="error.jpg"
      heading="Camp with no reservations."
      subheading="We have the know-how to equip you to camp in the middle of nowhere."
    />
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Lead',
  components: {
    ...Components,
  },
  data() {
    return {
      palettes: 'default'
    }
  }
};
</script>

<style lang="scss">
.theme-sandstone {
  --cdr-landing-lead-surface-color: #f4f2ed;
}
</style>
