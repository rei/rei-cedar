<script setup lang="ts">
import CdrStatusIcon from '../CdrStatusIcon.vue';
import CdrText from '../../text/CdrText.vue';
import type { CdrStatusIconProps } from '../CdrStatusIcon.vue';
import {
  IconInformationFill,
  IconWarningFill,
  IconCheckFill,
  IconErrorFill,
  IconQuestionFill,
} from '../../icon';

defineOptions({ name: 'StatusIcon' });

interface Example extends CdrStatusIconProps {
  icon: Object;
}

const examples: Example[] = [
  { type: 'default', icon: IconInformationFill },
  { type: 'warning', icon: IconWarningFill },
  { type: 'success', icon: IconCheckFill },
  { type: 'error', icon: IconErrorFill },
  { type: 'info', icon: IconQuestionFill },
];
</script>

<template>
  <div class="example">
    <h2>Status Icon</h2>
    <ul>
      <li
        v-for="{ type, icon } in examples"
        :key="type"
      >
        <CdrStatusIcon :type="type">
          <component
            :is="icon"
            inherit-color
          />
        </CdrStatusIcon>
        <CdrText>{{ type }}</CdrText>
      </li>
      <li>
        <CdrStatusIcon type="default">
          <IconErrorFill inherit-color />
        </CdrStatusIcon>
        <CdrText>default color with error icon</CdrText>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.example {
  & ul {
    margin: 0;
    background: $cdr-color-background-secondary;
    padding: $cdr-space-two-x;
  }

  & li {
    display: flex;
    align-items: center;
    gap: $cdr-space-one-x;

    &:not(:first-child) {
      margin-top: $cdr-space-two-x;
    }
  }
}
</style>
