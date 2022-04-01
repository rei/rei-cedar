<template>
  <div data-backstop="form-group-radios">
    <cdr-form-group label="What's your favorite radio?" id="favorite-radio">

      <cdr-radio
        name="example"
        custom-value="casio"
        v-model="ex"
      >Casio</cdr-radio>

      <cdr-radio
        name="example"
        custom-value="panasonic"
        v-model="ex"
      >Panasonic</cdr-radio>

      <cdr-radio
        name="example"
        custom-value="sony"
        v-model="ex"
      >Sony</cdr-radio>

    </cdr-form-group>
    <cdr-text>Selected Radio: {{ex}}</cdr-text>

    <cdr-form-group 
      label="What's your favorite required radio?" 
      id="favorite-required-radio"
      :error="hasError"
      aria-describedby="errorStatus-radio"    
    >

      <cdr-radio
        name="required-radio"
        custom-value="casio"
        v-model="ex2"
        @change="validate"
      >Casio</cdr-radio>

      <cdr-radio
        name="required-radio"
        custom-value="panasonic"
        v-model="ex2"
       @change="validate"
      >Panasonic</cdr-radio>

      <cdr-radio
        name="required-radio"
        custom-value="sony"
        v-model="ex2"
       @change="validate"
      >Sony</cdr-radio>
      <template #error>
        <span id="errorStatus-radio">You must make a selection!</span>
      </template>
    </cdr-form-group>
    <cdr-text>Selected Radio: {{ex2}}</cdr-text>

    <cdr-form-group
      label="Disabled Radio Example"
      :disabled="true"
      id="disabled-radio"
    >

      <cdr-radio
        name="example-disabled"
        custom-value="casio"
        v-model="ex"
        :disabled="true"
      >Casio</cdr-radio>

      <cdr-radio
        name="example-disabled"
        custom-value="panasonic"
        v-model="ex"
        :disabled="true"
      >Panasonic</cdr-radio>

      <cdr-radio
        name="example-disabled"
        custom-value="sony"
        v-model="ex"
        :disabled="true"
      >Sony</cdr-radio>

    </cdr-form-group>
  </div>
</template>

<script>
import { CdrFormGroup, CdrRadio, CdrText } from 'srcdir/lib';

export default {
  name: 'ParagraphsDemo',
  components: {
    CdrFormGroup,
    CdrRadio,
    CdrText
  },
  data() {
    return {
      ex: '',
      ex2: '',
      hasError: true,
    };
  },
  methods: {
    validate() {
      this.hasError = !this.ex2.length;
    },
  },
};
</script>

<style>

</style>
