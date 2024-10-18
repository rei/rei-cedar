<template>
  <div style="min-height: 100vh">
    <CdrToggleGroup
      v-model="palettes"
      style="max-width: clamp(300px, 25vw, 30vw)"
    >
      <CdrToggleButton toggle-value="default">Default</CdrToggleButton>
      <CdrToggleButton toggle-value="sandstone">Sandstone</CdrToggleButton>
    </CdrToggleGroup>
    <h2>Split surface container</h2>
    <CdrSplitSurface :class="`theme-${palettes}`">
      <template #top>
        <CdrImg :src="leadStaticImage" />
      </template>
      <template #bottom>
        <CdrTitle>Title</CdrTitle>
      </template>
    </CdrSplitSurface>

    <h2>Split surface container with surface on top</h2>
    <CdrSplitSurface
      surface="top"
      :class="`theme-${palettes}`"
    >
      <template #top>
        <CdrTitle>Title</CdrTitle>
      </template>
      <template #bottom>
        <CdrImg :src="leadStaticImage" />
      </template>
    </CdrSplitSurface>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';
import leadStaticImage from '../../../dev/static/lead-static.jpg';

export default {
  name: 'Lead',
  components: {
    ...Components,
  },
  data() {
    return {
      palettes: 'default',
      leadStaticImage,
    };
  },
};
</script>

<style lang="scss">
.theme-sandstone {
  --cdr-split-surface-surface-color: #f4f2ed;
}
</style>
