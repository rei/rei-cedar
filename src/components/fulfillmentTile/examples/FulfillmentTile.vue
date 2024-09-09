<script setup lang="ts">
import { ref } from 'vue';
import CdrFulfillmentTile from '../CdrFulfillmentTile.vue';
import CdrFulfillmentTileHeader from '../CdrFulfillmentTileHeader.vue';
import CdrFulfillmentTileContent from '../CdrFulfillmentTileContent.vue';
import { IconCheckFill, IconErrorFill, IconXFill } from '../../icon';
import CdrButton from '../../button/CdrButton.vue';
import CdrSurface from '../../surface/CdrSurface.vue';
import CdrSelectableSurface from '../../selectableSurface/CdrSelectableSurface.vue';
import CdrFulfillmentTileIcon from '../CdrFulfillmentTileIcon.vue';

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
        :disabled="true"
        tabindex="0"
        role="radio"
        :checked="false"
      >
        <template #icon-right>
          <CdrFulfillmentTileIcon type="default">
            <IconErrorFill inherit-color />
          </CdrFulfillmentTileIcon>
        </template>
        <template #header>Pick up</template>
        <template #body>Not offered</template>
      </CdrFulfillmentTile>
      <CdrFulfillmentTile
        :checked="radio1 === 1"
        tabindex="0"
        role="radio"
        @click="radio1 = 1"
      >
        <template
          v-if="radio1 === 1"
          #icon-right
        >
          <CdrFulfillmentTileIcon type="success">
            <IconCheckFill inherit-color />
          </CdrFulfillmentTileIcon>
        </template>
        <template #header>Ship to address</template>
        <template #body>Today after 2pm</template>
        <template #footer>
          <strong>FREE</strong>
          - $60 minimum
        </template>
      </CdrFulfillmentTile>
      <CdrFulfillmentTile
        :checked="radio1 === 2"
        tabindex="0"
        role="radio"
        @click="radio1 = 2"
      >
        <template
          v-if="radio1 === 2"
          #icon-right
        >
          <CdrFulfillmentTileIcon type="success">
            <IconCheckFill inherit-color />
          </CdrFulfillmentTileIcon>
        </template>
        <template #header>Another option</template>
        <template #footer>
          Footer
          <strong>content</strong>
        </template>
      </CdrFulfillmentTile>
      <CdrFulfillmentTile
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
          <CdrFulfillmentTileIcon type="success">
            <IconCheckFill inherit-color />
          </CdrFulfillmentTileIcon>
        </template>
        <template #header>Loading option</template>
        <template #body>
          Body
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
            <div
              :class="{ example__icon: true, 'example__icon--checked': checkbox1.includes(1) }"
            />
          </template>
          <template #header>Store Pickup (32)</template>
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
          <div :class="{ example__icon: true, 'example__icon--checked': checkbox1.includes(2) }" />
        </template>
        <template #header>Ship to address (32)</template>
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
          <CdrFulfillmentTileIcon type="default">
            <IconXFill inherit-color />
          </CdrFulfillmentTileIcon>
        </template>
        <template #header>Pick up</template>
        <template #body>Not offered</template>
      </CdrFulfillmentTile>
      <CdrFulfillmentTile
        :checked="radio2 === 1"
        role="radio"
        @click="radio2 = 1"
      >
        <template
          v-if="radio2 === 1"
          #icon-right
        >
          <CdrFulfillmentTileIcon type="success">
            <IconCheckFill inherit-color />
          </CdrFulfillmentTileIcon>
        </template>
        <template #header>Ship to address</template>
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
        :data-store-checked="checkbox2.includes(1)"
        radius="softer"
      >
        <CdrSelectableSurface
          class="example__search-tile-other-header-button"
          :checked="checkbox2.includes(1)"
          role="checkbox"
          @click="toggleCheckbox2(1)"
        >
          <CdrFulfillmentTileHeader>
            <template #icon-left>
              <div
                :class="{ example__icon: true, 'example__icon--checked': checkbox2.includes(1) }"
              />
            </template>
            <template #header>Store Pickup (32)</template>
          </CdrFulfillmentTileHeader>
          <CdrFulfillmentTileContent>
            In stock at
            <strong>Encinitas</strong>
          </CdrFulfillmentTileContent>
        </CdrSelectableSurface>
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

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';
@import '../styles/vars/CdrFulfillmentTile.vars.scss';
@import '../../selectableSurface/styles/vars/CdrSelectableSurface.vars.scss';

$component: 'fulfillment-tile';

.example {
  &__h3 {
    margin: $cdr-space-two-x 0 $cdr-space-one-x 0;
  }

  &__sr-only {
    @include cdr-display-sr-only;
  }

  &__row {
    display: flex;
    gap: var(--cdr-space-three-quarter-x);
    flex-wrap: wrap;

    > * {
      width: 230px;
      flex: 0 0 auto;
    }
  }

  &__column {
    width: 100%;
    max-width: 230px;
  }

  &__search-tile {
    width: 100%;
  }

  &__icon {
    display: inline-block;
    vertical-align: middle;
    flex: 0 0 auto;
    width: 1.8rem;
    height: 1.8rem;
    margin: $cdr-space-eighth-x;
    fill: inherit;
    border-radius: $cdr-radius-round;
    border: $cdr-space-sixteenth-x solid #2e2e2b;

    &--checked {
      border-width: 0.7rem;
    }
  }

  &__change-store {
    padding-left: 0;
    padding-right: 0;
    margin-bottom: var(--cdr-space-half-x);
  }

  &__checkout-tile-other-disabled {
    --cdr-fulfillment-tile-icon-fill: var(--cdr-color-icon-default);
    #{--cdr-color-background-fulfillment-tile}: $cdr-color-background-selectable-surface-default-disabled;
    #{--cdr-color-background-fulfillment-tile-checked}: $cdr-color-background-selectable-surface-default-disabled;
    @include cdr-border-style-mixin($component, 'dashed');
  }

  &__search-tile-other {
    $modifier: 'default';
    @include cdr-border-mixin($component);
    @include cdr-border-style-mixin($component, 'solid');
    @include cdr-border-width-mixin($component, 'sixteenth-x');
    @include cdr-border-color-mixin($fulfillment-tile-border-colors, $component, $modifier);
    @include cdr-radius-mixin($component, 'softest');

    &[data-store-checked='true'] {
      $state: 'checked';
      @include cdr-border-width-mixin($component, 'three-sixteenth-x');
      @include cdr-border-color-mixin(
        $fulfillment-tile-border-colors,
        $component,
        $modifier,
        $state
      );
    }
  }

  &__search-tile-other-header-button {
    --cdr-selectable-surface-border-width-default: 0;
    --cdr-color-background-selectable-surface-checked: var(--cdr-color-background-primary);
    width: 100%;

    @include cdr-selectable-surface-checked-mixin() {
      --cdr-selectable-surface-border-width-default: 0;
    }
  }

  &__search-tile-other-header-hr {
    margin: 0;
    border-top: var(--cdr-space-sixteenth-x) solid initial;
    width: 100%;
  }

  &__change-store-other {
    padding: var(--cdr-space-three-quarter-x) var(--cdr-space-one-x) var(--cdr-space-one-x)
      var(--cdr-space-one-x);
    justify-content: flex-start;
  }
}
</style>
