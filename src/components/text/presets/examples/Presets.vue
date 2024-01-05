<script setup lang="ts">
import * as Text from '../textPresets'

const placeholderParagraph = 'Cedrus, with the common English name cedar, is a genus of coniferous trees in the plant family Pinaceae (subfamily Abietoideae). They are native to the mountains of the western Himalayas and the Mediterranean region, occurring at altitudes of 1,500–3,200 m in the Himalayas and 1,000–2,200 m in the Mediterranean.';

</script>
<template>
  <h2>Body</h2>
  <Text.CdrBody>{{ placeholderParagraph }}</Text.CdrBody>
  <Text.CdrBody scale="1">{{ placeholderParagraph }}</Text.CdrBody>
  <Text.CdrBody :strong="true">{{ placeholderParagraph }}</Text.CdrBody>
  
  <h2>Eyebrow</h2>
  <Text.CdrEyebrow>Gear guides</Text.CdrEyebrow>

  <h2>Utility</h2>
  <Text.CdrUtilitySans>{{ placeholderParagraph }}</Text.CdrUtilitySans>
  <Text.CdrUtilitySerif>{{ placeholderParagraph }}</Text.CdrUtilitySerif>

  <h2>Subheading</h2>
  <Text.CdrSubheadingSans>We have the know-how to equip you to camp in the middle of nowhere.</Text.CdrSubheadingSans>

  <h2>Heading</h2>
  <Text.CdrHeadingSans>Camp with no reservations.</Text.CdrHeadingSans>
  <Text.CdrHeadingSerif>Camp with no reservations.</Text.CdrHeadingSerif>
  <Text.CdrHeadingDisplay tag="h4">Camp with no reservations.</Text.CdrHeadingDisplay>
</template>

