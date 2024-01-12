<script setup lang="ts">
import * as Text from '../textPresets'
import { CdrText } from '../../../../lib';

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
  <Text.CdrHeadingSans tag="p">Camp with no reservations.</Text.CdrHeadingSans>
  <Text.CdrHeadingSerif tag="p">Camp with no reservations.</Text.CdrHeadingSerif>
  <Text.CdrHeadingDisplay tag="p">Camp with no reservations.</Text.CdrHeadingDisplay>

<h2>Long text</h2>
<Text.CdrBody>Cedar is REI’s open-source design system for digital products and experiences, based on REI’s visual language. Its purpose is simple: to help people create consistent, unified user interfaces. We do this by simplifying common design decisions and providing reusable resources, freeing folks to focus on groundbreaking work.
</Text.CdrBody>
<div style="container-type: inline-size; max-width: 50rem">
<Text.CdrHeadingSans>Meet Cedar</Text.CdrHeadingSans>
<Text.CdrBody>Cedar is REI’s open-source design system for digital products and experiences, based on REI’s visual language. Its purpose is simple: to help people create consistent, unified user interfaces. We do this by simplifying common design decisions and providing reusable resources, freeing folks to focus on groundbreaking work.
</Text.CdrBody>
<Text.CdrBody>Cedar’s main benefit as a design system is in the reusability of its code, which increases our overall consistency and design and development efficiency. By distributing flexible design system elements (Vue components, design tokens, CSS styles) we provide teams with all the tools necessary to create functional reusable components aligned with our brand.</Text.CdrBody>
<Text.CdrHeadingSans>How to participate</Text.CdrHeadingSans>
<Text.CdrBody>Our REI community is made up of developers and designers of all kinds. Your participation is what makes Cedar possible as a sustainable, growing system.
There are many ways to participate:
Suggesting a bug fix, whether it’s in Cedar’s design, code or documentation (external contributors are welcome here!)
Adopting a new release 
Offering an answer in the #cedar-user-support Slack channel 
Taking our biannual survey and offering suggestions for improvement 
Sharing ideas for process improvements within the Cedar ecosystem 
To recognize your support, we’ll plant trees on your behalf via donations to American Forests.
To learn more about how improving Cedar, check out how REI employees can contribute ideas for possible additions and changes to the system.</Text.CdrBody>
</div>
<CdrText>Cedar’s main benefit as a design system is in the reusability of its code, which increases our overall consistency and design and development efficiency. By distributing flexible design system elements (Vue components, design tokens, CSS styles) we provide teams with all the tools necessary to create functional reusable components aligned with our brand.</CdrText>
</template>

