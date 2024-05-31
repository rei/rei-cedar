<script setup lang="ts">
import { ref } from 'vue';
import CdrFulfillmentTile from '../CdrFulfillmentTile.vue';
import CdrFulfillmentTileHeader from '../CdrFulfillmentTileHeader.vue';
import { IconCheckFill, IconErrorFill, IconXFill } from '../../icon';
import CdrButton from '../../button/CdrButton.vue';
import CdrSurface from '../../surface/CdrSurface.vue';
import CdrSurfaceSelection from '../../surfaceSelection/CdrSurfaceSelection.vue';
import CdrUtilitySans from '../../text/presets/CdrUtilitySans.vue';

defineOptions({ name: 'FulfillmentTile' });

const recommendedValue1 = ref(2);
const recommendedValue2 = ref([1]);
const otherValue1 = ref(1);
const otherValue2 = ref([1]);

const toggleCheckbox = (value) => {
  if (recommendedValue2.value.includes(value)) {
    recommendedValue2.value = recommendedValue2.value.filter((v) => v !== value);
  } else {
    recommendedValue2.value.push(value);
  }
};

const toggleCheckbox2 = (value) => {
  if (otherValue2.value.includes(value)) {
    otherValue2.value = otherValue2.value.filter((v) => v !== value);
  } else {
    otherValue2.value.push(value);
  }
};
</script>

<template>
  <div class="example">
    <h2>FulfillmentTile</h2>
    <h3 class="action-tile-demo__h3">Recommended patterns</h3>
    <div class="example__tile-row">
      <CdrFulfillmentTile :disabled="true" class="example__tile example__tile--checkout example__tile--recommended">
        <template #icon-right>
          <IconErrorFill inherit-color />
        </template>
        <template #label>Pick up</template>
        <template #body>Not offered</template>
      </CdrFulfillmentTile>
      <CdrFulfillmentTile class="example__tile example__tile--checkout example__tile--recommended"
        :checked="recommendedValue1 === 1" @click="recommendedValue1 = 1">
        <template v-if="recommendedValue1 === 1" #icon-right>
          <IconCheckFill inherit-color />
        </template>
        <template #label>Ship to address</template>
        <template #body>
          Today after 2pm
        </template>
        <template #footer>
          <strong>FREE</strong>
          - $60 minimum
        </template>
      </CdrFulfillmentTile>
      <CdrFulfillmentTile class="example__tile example__tile--checkout example__tile--recommended"
        :checked="recommendedValue1 === 2" @click="recommendedValue1 = 2">
        <template v-if="recommendedValue1 === 2" #icon-right>
          <IconCheckFill inherit-color />
        </template>
        <template #label>Ship to address</template>
        <template #body>
          Today after 2pm
          <br />
          at Encinitas
        </template>
        <template #footer>
          <strong>FREE</strong>
          - $60 minimum
        </template>
      </CdrFulfillmentTile>
    </div>
    <br />
    <div class="example__tile-row example__tile-row--vertical">
      <div>
        <CdrFulfillmentTile class="example__tile example__tile--search example__tile--recommended"
          :checked="recommendedValue2.includes(1)" type-scale="-1" role="checkbox" @click="toggleCheckbox(1)">
          <template #icon-left>
            <IconCheckFill v-if="recommendedValue2.includes(1)" inherit-color />
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="example__icon">
              <g>
                <path fill-rule="evenodd"
                  d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z"
                  clip-rule="evenodd"></path>
              </g>
            </svg>
          </template>
          <template #label>Store Pickup (32)</template>
          <template #footer>
            In stock at
            <strong>Encinitas</strong>
          </template>

        </CdrFulfillmentTile>
        <CdrButton class="example__change-store" modifier="link">
          Change store
        </CdrButton>
      </div>
      <CdrFulfillmentTile class="example__tile example__tile--search example__tile--recommended"
        :checked="recommendedValue2.includes(2)" type-scale="-1" role="checkbox" @click="toggleCheckbox(2)">
        <template #icon-left>
          <IconCheckFill v-if="recommendedValue2.includes(2)" inherit-color />
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="example__icon">
            <g>
              <path fill-rule="evenodd"
                d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z"
                clip-rule="evenodd"></path>
            </g>
          </svg>
        </template>
        <template #label>Ship to address (32)</template>
      </CdrFulfillmentTile>
    </div>
    <h3 class="action-tile-demo__h3">Other patterns</h3>
    <div class="example__tile-row">
      <CdrFulfillmentTile class="example__tile example__tile--checkout example__tile--checkout-other-disabled"
        :checked="otherValue1 === 0" @click="otherValue1 = 0">
        <template v-if="otherValue1 === 0" #icon-right>
          <IconXFill inherit-color />
        </template>
        <template #label>Pick up</template>
        <template #body>Not offered</template>
      </CdrFulfillmentTile>
      <CdrFulfillmentTile class="example__tile example__tile--checkout example__tile--recommended"
        :checked="otherValue1 === 1" @click="otherValue1 = 1">
        <template v-if="otherValue1 === 1" #icon-right>
          <IconCheckFill inherit-color />
        </template>
        <template #label>Ship to address</template>
        <template #body>
          Today after 2pm
          <br />
          at Encinitas
        </template>
        <template #footer>
          <strong>FREE</strong>
          - $60 minimum
        </template>
      </CdrFulfillmentTile>
    </div>
    <br />
    <!--  type-scale="-1"
         @click="toggleCheckbox2(1)" -->
    <div class="example__tile-row example__tile-row--vertical">
      <CdrSurface class="example__tile example__tile--search example__tile--search-other"
        :border-width="otherValue2.includes(1) ? 'eighth-x' : 'sixteenth-x'" :with-border="true">
        <CdrSurfaceSelection class="example__search-other-header-button" :checked="otherValue2.includes(1)"
          role="checkbox" @click="toggleCheckbox2(1)">
          <CdrFulfillmentTileHeader type-scale="-1">
            <template #icon-left>
              <IconCheckFill v-if="otherValue2.includes(1)" inherit-color />
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="example__icon">
                <g>
                  <path fill-rule="evenodd"
                    d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z"
                    clip-rule="evenodd"></path>
                </g>
              </svg>
            </template>
            <template #label>Store Pickup (32)</template>
          </CdrFulfillmentTileHeader>
          <CdrUtilitySans class="example__search-other-header-content" scale="-1" tag="div">
            In stock at
            <strong>Encinitas</strong>
          </CdrUtilitySans>
        </CdrSurfaceSelection>
        <hr class="example__search-other-header-hr" />
        <CdrButton class="example__change-store-other" :full-width="true" modifier="link">
          Change store
        </CdrButton>
      </CdrSurface>
    </div>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<style lang="scss">
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';
@import '../styles/vars/CdrFulfillmentTile.vars.scss';

.example {
  &__h3 {
    margin: $cdr-space-two-x 0 $cdr-space-one-x 0;
  }

  &__tile-row {
    display: flex;
    gap: var(--cdr-space-scale-three-quarter-x);

    &--vertical {
      flex-direction: column;
    }
  }

  &__tile {
    &--checkout {
      width: 100%;
      max-width: 230px;
    }

    &--search {
      width: 100%;
      max-width: 230px;
    }

    &--recommended {

      &[aria-pressed='true'],
      &[aria-checked='true'] {
        --cdr-fulfillment-tile-icon-fill: var(--cdr-color-icon-message-success);
      }

      &:disabled,
      &:disabled:hover,
      &:disabled:focus {
        --cdr-fulfillment-tile-icon-fill: var(--cdr-color-icon-default);
      }
    }

    &--checkout-other-disabled {
      --cdr-fulfillment-tile-icon-fill: var(--cdr-color-icon-default);
      --cdr-palette-background-rest: var(--cdr-color-background-button-default-disabled);
      --cdr-palette-border-color: var(--cdr-color-border-primary);

      &[aria-pressed='true'],
      &[aria-checked='true'] {
        --cdr-fulfillment-tile-icon-fill: var(--cdr-color-icon-default);
        --cdr-palette-background-checked: var(--cdr-color-background-button-default-disabled);
        --cdr-palette-border-color: var(--cdr-palette-border-color-checked);
      }
    }

    &--search-other {
      @include cdr-fulfillment-tile-base-mixin;
      gap: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  &__icon {
    display: inline-block;
    vertical-align: middle;
    flex: 0 0 auto;
    width: 2.4rem;
    height: 2.4rem;
    fill: inherit;
  }

  &__change-store {
    padding-left: 0;
    padding-right: 0;
  }

  &__search-other-header-button {
    --cdr-action-border-width-checked: 0;
    padding: var(--cdr-space-scale-one-x) 0;
    width: 100%;

    &[aria-pressed='true'],
    &[aria-checked='true'] {
      --cdr-fulfillment-tile-icon-fill: var(--cdr-color-icon-message-success);
    }

    &:disabled,
    &:disabled:hover,
    &:disabled:focus {
      --cdr-fulfillment-tile-icon-fill: var(--cdr-color-icon-default);
    }
  }

  &__search-other-header-content {
    @include cdr-fulfillment-tile-content-mixin;
    margin-top: var(--cdr-space-scale-half-x);
  }

  &__search-other-header-hr {
    margin: 0;
    border-top: var(--cdr-space-scale-sixteenth-x) solid initial;
    width: 100%;
  }

  &__change-store-other {
    padding: var(--cdr-space-scale-three-quarter-x) var(--cdr-space-scale-one-x) var(--cdr-space-scale-one-x) var(--cdr-space-scale-one-x);
    justify-content: flex-start;
  }
}
</style>
