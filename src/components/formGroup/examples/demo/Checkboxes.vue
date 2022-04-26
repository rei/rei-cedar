<template>
  <div data-backstop="form-group-checkboxes">
    <cdr-form-group
      label="What's your favorite letter?"
      id="favorite-letter"
    >
      <cdr-checkbox
        custom-value="A"
        v-model="exGroup"
      >A</cdr-checkbox>
      <cdr-checkbox
        custom-value="B"
        v-model="exGroup"
      >B</cdr-checkbox>
      <cdr-checkbox
        custom-value="C"
        v-model="exGroup"
      >C</cdr-checkbox>
    </cdr-form-group>

    <cdr-form-group id="favorite-letter-label-override">

      <template #label>
        <cdr-text class="cdr-text-dev--heading-sans-600">
          Optional Label Override Example
        </cdr-text>
      </template>
      <cdr-checkbox
        custom-value="A"
        v-model="exGroup"
      >A</cdr-checkbox>
      <cdr-checkbox
        custom-value="B"
        v-model="exGroup"
      >B</cdr-checkbox>
      <cdr-checkbox
        custom-value="C"
        v-model="exGroup"
      >C</cdr-checkbox>
    </cdr-form-group>

    <cdr-form-group
      label="What's your favorite optional letter?"
      id="favorite-optional-letter"
      :optional="true"
    >
      <cdr-checkbox
        custom-value="A"
        v-model="exGroup"
      >A</cdr-checkbox>
      <cdr-checkbox
        custom-value="B"
        v-model="exGroup"
      >B</cdr-checkbox>
      <cdr-checkbox
        custom-value="C"
        v-model="exGroup"
      >C</cdr-checkbox>
    </cdr-form-group>

    <cdr-form-group
      label="What's your favorite required letter?"
      :error="hasError"
      :required="true"
      aria-describedby="errorStatus"
      id="favorite-required-letter"
    >
      <cdr-checkbox
        custom-value="A"
        v-model="errorA"
        @change="validate"
      >A</cdr-checkbox>
      <cdr-checkbox
        custom-value="B"
        v-model="errorA"
        @change="validate"
      >B</cdr-checkbox>
      <cdr-checkbox
        custom-value="C"
        v-model="errorA"
        @change="validate"
      >C</cdr-checkbox>
      <template #error>
        <span id="errorStatus">You must make a selection!</span>
      </template>
    </cdr-form-group>

    <cdr-form-group
      label="Are you sure you don't have a different favorite required letter?"
      :error="hasAlert"
      error-role="alert"
      :required="true"
      aria-describedby="errorAlert"
      id="different-favorite-required-letter"
    >
      <cdr-checkbox
        custom-value="Q"
        v-model="errorB"
        @change="validateAlert"
      >A</cdr-checkbox>
      <cdr-checkbox
        custom-value="Z"
        v-model="errorB"
        @change="validateAlert"
      >B</cdr-checkbox>
      <cdr-checkbox
        custom-value="X"
        v-model="errorB"
        @change="validateAlert"
      >C</cdr-checkbox>
      <template #error>
        <span id="errorAlert">You must make a selection within two minutes!</span>
      </template>
    </cdr-form-group>

    <cdr-form-group
      label="Disabled example"
      :disabled="true"
      :required="true"
      id="disabled-example"
    >
      <cdr-checkbox
        custom-value="A"
        v-model="exGroup"
        :disabled="true"
      >A</cdr-checkbox>
      <cdr-checkbox
        custom-value="B"
        v-model="exGroup"
        :disabled="true"
      >B</cdr-checkbox>
      <cdr-checkbox
        custom-value="C"
        v-model="exGroup"
        :disabled="true"
      >C</cdr-checkbox>
    </cdr-form-group>
  </div>
</template>

<script>
import { CdrFormGroup, CdrCheckbox, CdrText } from 'srcdir/lib';

export default {
  name: 'ParagraphsDemo',
  components: {
    CdrFormGroup,
    CdrCheckbox,
    CdrText,
  },
  data() {
    return {
      exGroup: [],
      hasError: true,
      hasAlert: true,
      errorA: [],
      errorB: [],
    };
  },
  methods: {
    validate() {
      this.hasError = !this.errorA.length;
    },
    validateAlert() {
      this.hasAlert = !this.errorB.length;
    },
  },
};
</script>

<style>

</style>
