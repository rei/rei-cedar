<script setup lang="ts">
import { ref } from 'vue';
import CdrFulfillmentTile from '../CdrFulfillmentTile.vue';
import CdrFulfillmentTileHeader from '../CdrFulfillmentTileHeader.vue';
import CdrFulfillmentTileContent from '../CdrFulfillmentTileContent.vue';
import { IconCheckFill, IconErrorFill, IconXFill } from '../../icon';
import CdrButton from '../../button/CdrButton.vue';
import CdrSurface from '../../surface/CdrSurface.vue';
import CdrSurfaceSelection from '../../surfaceSelection/CdrSurfaceSelection.vue';

defineOptions({ name: 'FulfillmentTile' });

const radio1 = ref(2);
const checkbox1 = ref([1]);
const radio2 = ref(1);
const checkbox2 = ref([1]);

const toggleCheckbox1 = (value: number) => {
  if (checkbox1.value.includes(value)) {
    checkbox1.value = checkbox1.value.filter((v) => v !== value);
  } else {
    checkbox1.value.push(value);
  }
};

const toggleCheckbox2 = (value: number) => {
  if (checkbox2.value.includes(value)) {
    checkbox2.value = checkbox2.value.filter((v) => v !== value);
  } else {
    checkbox2.value.push(value);
  }
};
</script>

<template>
  <div class="example">
    <h2>FulfillmentTile</h2>
    <h3 class="example__h3">Recommended patterns</h3>
    <div
      id="radio1"
      class="example__sr-only"
    >
      How would you like to receieve your order?
    </div>
    <div
      class="example__row"
      role="radiogroup"
      aria-labelledby="radio1"
    >
      <CdrFulfillmentTile
        class="example__checkout-tile"
        :disabled="true"
        tabindex="0"
        role="radio"
        :checked="false"
      >
        <template #icon-right>
          <IconErrorFill inherit-color />
        </template>
        <template #label>Pick up</template>
        <template #body>Not offered</template>
      </CdrFulfillmentTile>
      <CdrFulfillmentTile
        class="example__checkout-tile"
        :checked="radio1 === 1"
        tabindex="0"
        role="radio"
        @click="radio1 = 1"
      >
        <template
          v-if="radio1 === 1"
          #icon-right
        >
          <IconCheckFill inherit-color />
        </template>
        <template #label>Ship to address</template>
        <template #body>Today after 2pm</template>
        <template #footer>
          <strong>FREE</strong>
          - $60 minimum
        </template>
      </CdrFulfillmentTile>
      <CdrFulfillmentTile
        class="example__checkout-tile"
        :checked="radio1 === 2"
        tabindex="0"
        role="radio"
        @click="radio1 = 2"
      >
        <template
          v-if="radio1 === 2"
          #icon-right
        >
          <IconCheckFill inherit-color />
        </template>
        <template #label>Another option</template>
        <template #footer>
          Footer
          <strong>content</strong>
        </template>
      </CdrFulfillmentTile>
      <CdrFulfillmentTile
        class="example__checkout-tile"
        :checked="radio1 === 3"
        tabindex="0"
        role="radio"
        :loading="true"
        @click="radio1 = 3"
      >
        <template
          v-if="radio1 === 3"
          #icon-right
        >
          <IconCheckFill inherit-color />
        </template>
        <template #label>Loading option</template>
        <template #body>
          Body
          <strong>content</strong>
        </template>
        <template #footer>
          Footer
          <strong>content</strong>
        </template>
      </CdrFulfillmentTile>
    </div>
    <br />
    <div
      id="checkbox1"
      class="example__sr-only"
    >
      Would you like to filter the fulfillment method?
    </div>
    <div
      class="example__column"
      role="group"
      aria-labelledby="checkbox1"
    >
      <div>
        <CdrFulfillmentTile
          class="example__search-tile"
          :checked="checkbox1.includes(1)"
          role="checkbox"
          tabindex="0"
          @click="toggleCheckbox1(1)"
        >
          <template #icon-left>
            <IconCheckFill
              v-if="checkbox1.includes(1)"
              inherit-color
            />
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="example__icon"
            >
              <g>
                <path
                  fill-rule="evenodd"
                  d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z"
                  clip-rule="evenodd"
                ></path>
              </g>
            </svg>
          </template>
          <template #label>Store Pickup (32)</template>
          <template #footer>
            In stock at
            <strong>Encinitas</strong>
          </template>
        </CdrFulfillmentTile>
        <CdrButton
          class="example__change-store"
          modifier="link"
        >
          Change store
        </CdrButton>
      </div>
      <CdrFulfillmentTile
        class="example__search-tile"
        :checked="checkbox1.includes(2)"
        role="checkbox"
        tabindex="0"
        @click="toggleCheckbox1(2)"
      >
        <template #icon-left>
          <IconCheckFill
            v-if="checkbox1.includes(2)"
            inherit-color
          />
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="example__icon"
          >
            <g>
              <path
                fill-rule="evenodd"
                d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z"
                clip-rule="evenodd"
              ></path>
            </g>
          </svg>
        </template>
        <template #label>Ship to address (32)</template>
      </CdrFulfillmentTile>
    </div>
    <h3 class="action-tile-demo__h3">Other patterns</h3>
    <div
      id="radio2"
      class="example__sr-only"
    >
      How would you like to receieve your order?
    </div>
    <div
      class="example__row"
      role="radiogroup"
      aria-labelledby="radio2"
    >
      <CdrFulfillmentTile
        class="example__checkout-tile-other-disabled"
        :checked="radio2 === 0"
        role="radio"
        @click="radio2 = 0"
      >
        <template
          v-if="radio2 === 0"
          #icon-right
        >
          <IconXFill inherit-color />
        </template>
        <template #label>Pick up</template>
        <template #body>Not offered</template>
      </CdrFulfillmentTile>
      <CdrFulfillmentTile
        class="example__checkout-tile"
        :checked="radio2 === 1"
        role="radio"
        @click="radio2 = 1"
      >
        <template
          v-if="radio2 === 1"
          #icon-right
        >
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
    <div
      id="checkbox2"
      class="example__sr-only"
    >
      Would you like to filter the fulfillment method?
    </div>
    <div
      class="example__column"
      role="group"
      aria-labelledby="checkbox2"
    >
      <CdrSurface
        class="example__search-tile-other"
        :border-width="checkbox2.includes(1) ? 'eighth-x' : 'sixteenth-x'"
        :with-border="true"
        :border-color="checkbox2.includes(1) ? 'secondary' : 'primary'"
        radius="softer"
      >
        <CdrSurfaceSelection
          class="example__search-tile-other-header-button"
          :checked="checkbox2.includes(1)"
          role="checkbox"
          @click="toggleCheckbox2(1)"
        >
          <CdrFulfillmentTileHeader>
            <template #icon-left>
              <IconCheckFill
                v-if="checkbox2.includes(1)"
                inherit-color
              />
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="example__icon"
              >
                <g>
                  <path
                    fill-rule="evenodd"
                    d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z"
                    clip-rule="evenodd"
                  ></path>
                </g>
              </svg>
            </template>
            <template #label>Store Pickup (32)</template>
          </CdrFulfillmentTileHeader>
          <CdrFulfillmentTileContent class="example__search-tile-other-header-content">
            In stock at
            <strong>Encinitas</strong>
          </CdrFulfillmentTileContent>
        </CdrSurfaceSelection>
        <hr class="example__search-tile-other-header-hr" />
        <CdrButton
          class="example__change-store-other"
          :full-width="true"
          modifier="link"
          size="small"
        >
          Change store
        </CdrButton>
      </CdrSurface>
    </div>
  </div>
</template>

<style lang="scss">
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';
@import '../styles/vars/CdrFulfillmentTile.vars.scss';
@import '../../surfaceSelection/styles/vars/CdrSurfaceSelection.vars.scss';

@mixin tile-colors() {
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

.example {
  &__h3 {
    margin: $cdr-space-two-x 0 $cdr-space-one-x 0;
  }

  &__sr-only {
    @include cdr-display-sr-only;
  }

  &__row {
    display: grid;
    gap: var(--cdr-space-scale-three-quarter-x);
    grid-template-columns: 230px 230px 230px 230px;
  }

  &__checkout-tile {
    @include tile-colors;
  }

  &__column {
    width: 100%;
    max-width: 230px;
  }

  &__search-tile {
    @include tile-colors;
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
    margin-bottom: var(--cdr-space-scale-half-x);
  }

  &__checkout-tile-other-disabled {
    --cdr-fulfillment-tile-icon-fill: var(--cdr-color-icon-default);
    --cdr-color-background-fulfillment-tile: var(--cdr-color-background-button-default-disabled);
    --cdr-color-background-fulfillment-tile-checked: var(
      --cdr-color-background-button-default-disabled
    );
  }

  &__search-tile-other {
    gap: 0;
    padding-top: 0;
    padding-bottom: 0;
  }

  &__search-tile-other-header-button {
    --cdr-surface-selection-border-width-default: 0;
    --cdr-color-background-surface-selection-primary-checked: var(--cdr-color-background-primary);
    padding: var(--cdr-space-scale-one-x) 0;
    width: 100%;
    @include tile-colors;

    @include cdr-surface-selection-checked-mixin() {
      --cdr-surface-selection-border-width-default: 0;
    }
  }

  &__search-tile-other-header-content {
    margin-top: var(--cdr-space-scale-half-x);
  }

  &__search-tile-other-header-hr {
    margin: 0;
    border-top: var(--cdr-space-scale-sixteenth-x) solid initial;
    width: 100%;
  }

  &__change-store-other {
    padding: var(--cdr-space-scale-three-quarter-x) var(--cdr-space-scale-one-x)
      var(--cdr-space-scale-one-x) var(--cdr-space-scale-one-x);
    justify-content: flex-start;
  }
}
</style>
