<template>
  <div>
    <h2>
      Selects
    </h2>
    <hr class="icon-hr">

    <div data-backstop="select-target">
      <!-- Default Example -->
      <cdr-select
        label="Default"
        v-model="selectedA"
        :background="backgroundColor"
        prompt="Choose one"

        @select-change="doExternal"
      >
        <option value="1">
          1
        </option>
        <option value="2">
          2
        </option>
        <option value="3">
          3
        </option>
        <option value="4">
          4
        </option>
      </cdr-select>
      <cdr-text>Selected Value: {{ selectedA }}</cdr-text>

      <hr class="icon-hr">

      <!-- Required with Prompt Example -->
      <cdr-select
        label="Required with Prompt"
        v-model="selectedB"
        :background="backgroundColor"
        prompt="Choose one"
        required
      >
        <option value="1">
          1
        </option>
        <option value="2">
          2
        </option>
        <option value="3">
          3
        </option>
        <option value="4">
          4
        </option>
      </cdr-select>
      <cdr-text>Selected Value: {{ selectedB }}</cdr-text>
    </div>
    <hr class="icon-hr">

    <!-- Disabled Select -->
    <cdr-select
      label="Disabled select"
      v-model="selectedDisabled"
      :background="backgroundColor"
      disabled
    >
      <option value="1">
        1
      </option>
    </cdr-select>
    <cdr-text>Selected: {{ selectedDisabled }}</cdr-text>
    <hr class="icon-hr">

    <!-- Hidden Label Example -->
    <cdr-select
      label="Hidden label text"
      hide-label
      v-model="selectedC"
      :background="backgroundColor"
      prompt="Hidden label"
    >
      <option value="1">
        1
      </option>
      <option value="2">
        2
      </option>
      <option value="3">
        3
      </option>
      <option value="4">
        4
      </option>
    </cdr-select>
    <cdr-text>Selected Value: {{ selectedC }}</cdr-text>
    <hr class="icon-hr">

    <!-- No Prompt Example -->
    <cdr-select
      label="No Prompt"

      v-model="selectedD"
      :background="backgroundColor"
    >
      <option value="1">
        1
      </option>
      <option value="2">
        2
      </option>
      <option value="3">
        3
      </option>
      <option value="REALLY REALLY LONG VALUE REALLY REALLY LONG VALUE">
        REALLY REALLY LONG VALUE REALLY REALLY LONG VALUE
      </option>
    </cdr-select>
    <cdr-text>Selected Value: {{ selectedD }}</cdr-text>
    <hr class="icon-hr">

    <!-- Dynamic Data Example -->
    <cdr-select
      label="Dynamic"
      v-model="dynamic"
      :background="backgroundColor"
      :options="dynamicData"

      prompt="Choose One"
    />
    <cdr-text>Selected: {{ dynamic }}</cdr-text>
    <hr class="icon-hr">

    <!-- Helper Text Example -->
    <cdr-select
      label="Example with Helper Text"
      v-model="helperTextModel"
      :background="backgroundColor"
      :options="dynamicData"

      prompt="Choose One"
    >
      <template #helper-text>
        This is helper text.
      </template>

      <template #info>
        <cdr-link
          href="#/selects"
          modifier="standalone"
        >
          Info Link/Icon
        </cdr-link>
      </template>
    </cdr-select>
    <cdr-text>Selected Value: {{ helperTextModel }}</cdr-text>
    <hr class="icon-hr">

    <cdr-select
      label="Example with Helper Text and error"
      v-model="helperTextWithErrorModel"
      :background="backgroundColor"
      :options="dynamicData"
      prompt="Choose One"
      :error="helperTextError"
      @change="validateHelperTextWithErrorModel"
    >
      <template #helper-text>
        Choosing 'b' will result in an error
      </template>

      <template #info>
        <cdr-link
          href="#/selects"
          modifier="standalone"
        >
          Info Link/Icon
        </cdr-link>
      </template>
      <template #error>
        <span id="headerErrorTest">Oh no! You chose B!</span>
      </template>
    </cdr-select>
    <cdr-text>Selected Value: {{ helperTextWithErrorModel }}</cdr-text>
    <hr class="icon-hr">
    <!-- Info Link Example -->
    <cdr-select
      label="Example with Info Link"
      v-model="infoLinkModel"
      :background="backgroundColor"
      :options="dynamicData"

      prompt="Choose One"
    >
      <template #info>
        <cdr-link
          href="#/selects"
          modifier="standalone"
        >
          Info Link/Icon
        </cdr-link>
      </template>
    </cdr-select>
    <cdr-text>Selected: {{ infoLinkModel }}</cdr-text>
    <hr class="icon-hr">

    <!-- Info Icon Example -->
    <cdr-select
      label="Example with Info Icon"
      v-model="infoIconModel"
      :background="backgroundColor"
      :options="dynamicData"

      prompt="Choose One"
    >
      <template #info-action>
        <cdr-link
          tag="button"
          type="button"
        >
          <icon-information-stroke inherit-color />
          <span class="sr-only">Information!</span>
        </cdr-link>
      </template>
    </cdr-select>
    <cdr-text>Selected Value: {{ infoIconModel }}</cdr-text>
    <hr class="icon-hr">

    <!-- Pre Icon Example -->
    <cdr-select
      label="Example with Pre Icon"
      v-model="preIconModel"
      :background="backgroundColor"
      :options="dynamicData"

      prompt="Choose One"
    >
      <template #pre-icon>
        <icon-lock-locked-stroke />
      </template>
    </cdr-select>
    <cdr-text>Selected Value: {{ preIconModel }}</cdr-text>
    <hr class="icon-hr">

    <!-- Error Example default -->
    <cdr-select
      label="Example with status error"
      v-model="preIconModel"
      :background="backgroundColor"
      :options="dynamicData"
      aria-describedby="statusTest"

      prompt="Choose One"
      :error="preIconModelError"
      @change="validatePreIconModel"
    >
      <template #error>
        <span id="statusTest">error message goes here</span>
      </template>
    </cdr-select>
    <hr class="icon-hr">

    <!-- Error Example alert -->
    <cdr-select
      label="Example with Alert error"
      v-model="preIconModel2"
      :background="backgroundColor"
      :options="dynamicData"
      error-role="alert"
      aria-describedby="alertTest"

      prompt="Choose One"
      :error="preIconModel2Error"
      @change="validatePreIconModel2"
    >
      <template #error>
        <span id="alertTest">Alert error message goes here</span>
      </template>
    </cdr-select>
    <hr class="icon-hr">

    <!-- Nested Options -->
    <cdr-select
      v-model="nested"
      :background="backgroundColor"
      label="Nested Options"
    >
      <optgroup label="bread">
        <option value="rye">
          rye
        </option>
        <option value="sourdough">
          sourdough
        </option>
        <option value="wheat">
          wheat
        </option>
      </optgroup>
      <optgroup label="toppings">
        <option value="provolone">
          provolone
        </option>
        <option value="peppers">
          peppers
        </option>
        <option value="gabagool">
          gabagool
        </option>
      </optgroup>
    </cdr-select>
    <cdr-text>Selected Value: {{ nested }}</cdr-text>
    <hr class="icon-hr">

    <!-- Large Select Example -->
    <cdr-select
      label="Size = Large"
      v-model="dynamic"
      :background="backgroundColor"
      size="large"
      :options="dynamicData"

      prompt="Choose One"
    />
    <cdr-text>Selected Value: {{ dynamic }}</cdr-text>
    <hr class="icon-hr">

    <h3 class="stack">
      Multiple Select with size
    </h3>

    <cdr-select
      label="Multiple Prompt"
      v-model="multiple"
      :background="backgroundColor"
      :multiple-size="6"
      multiple
    >
      <option
        value="1"
      >
        1
      </option>
      <option value="2">
        2
      </option>
      <option
        value="3"
      >
        3
      </option>
      <option value="4">
        4
      </option>
      <option value="5">
        5
      </option>
      <option value="6">
        6
      </option>
    </cdr-select>
    <cdr-text>Selected Values: {{ multiple }}</cdr-text>
    <hr class="icon-hr">

    <h3 class="stack">
      Multiple Select
    </h3>

    <cdr-select
      label="Multiple Prompt"
      v-model="multiple2"
      :background="backgroundColor"
      multiple
      :options="multiple2Data"
    />
    <cdr-text>Selected Values: {{ multiple2 }}</cdr-text>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Selects',
  components: Components,
  data() {
    return {
      selectedDisabled: '',
      selectedA: '',
      selectedB: '2',
      selectedC: '',
      selectedD: '',
      dynamic: '',
      dynamicData: [{ value: 'a', text: 'a' }, { value: 'b', text: 'b' }],
      helperTextModel: '',
      helperTextError: false,
      helperTextWithErrorModel: '',
      infoLinkModel: '',
      infoIconModel: '',
      preIconModel: '',
      preIconModel2: '',
      preIconModelError: true,
      preIconModel2Error: true,
      nested: '',
      multiple: ['1', '2'],
      multiple2: ['-1'],
      multiple2Data: ['a', 'b', 'c', 'd'],
      backgroundColor: 'primary',
    };
  },
  watch: {
    $route(to) {
      this.setBackground(to.query.background);
    },
  },
  mounted() {
    this.setBackground(this.$route.query.background);
  },
  methods: {
    inputEventHandler(selectedValue, event) {
      console.log('input Event event = ', event, ' selectedValue = ', selectedValue); // eslint-disable-line
    },
    validateHelperTextWithErrorModel() {
      this.helperTextError = this.helperTextWithErrorModel == 'b';
    },
    validatePreIconModel() {
      console.log(this.helperTextWithErrorModel);
      this.preIconModelError = !this.preIconModel.length;
    },
    validatePreIconModel2() {
      this.preIconModel2Error = !this.preIconModel2.length;
    },
    inputChange(selectedValue, event) {
      console.log('change Event event = ', event, ' selectedValue = ', selectedValue); // eslint-disable-line
    },
    doExternal(v, e) {
      console.log('EXTERNAL', v, e); // eslint-disable-line
    },
    setBackground(background) {
      switch (background) {
        case 'primary':
          this.backgroundColor = 'primary';
          break;
        case 'secondary':
          this.backgroundColor = 'secondary';
          break;
        default:
          this.backgroundColor = 'primary';
      }
    },
  },
};
</script>

<style>
  .standard-select {
    width: 25%;
  }
</style>
