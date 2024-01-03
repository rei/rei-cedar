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
    <h2>Lead container</h2>
    <CdrLead :class="`theme-${palettes}`">
      <template #top>
        <CdrImg src="/src/dev/static/cedar-1920x1080.jpg" />
      </template>
      <template #bottom>
        <CdrTitle>Global lead title</CdrTitle>
      </template>
    </CdrLead>

    <h2>Lead container with surface on top</h2>
    <CdrLead surface="top" :class="`theme-${palettes}`">
      <template #top>
        <CdrTitle>Global lead title</CdrTitle>
      </template>
      <template #bottom>
        <CdrImg src="/src/dev/static/cedar-1920x1080.jpg" />
      </template>
    </CdrLead>

    <h2>Static landing lead composition</h2>
    <CdrLandingLead
      :class="`theme-${palettes}`"
      img-src="src/dev/static/lead-static.jpg"
      heading="Camp with no reservations."
      subheading="We have the know-how to equip you to camp in the middle of nowhere."
    />

    <h2>Static landing lead w/out image</h2>
    <CdrLead
      :class="`theme-${palettes}`"
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
  --cdr-lead-surface-color: #f4f2ed;
}
</style>
