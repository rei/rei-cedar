<template>
  <div>
    <h2>Radios</h2>
    <div data-backstop="radio-focus">
      <fieldset>
        <legend id="legend-size">
          Radio Button Size Group
        </legend>        
        <div aria-labelledby="legend-size" role="radiogroup">
            <cdr-radio
              name="size"
              custom-value="small"
              v-model="size"
              size="small"
            >small</cdr-radio>
            <cdr-radio
              name="size"
              custom-value="medium"
              v-model="size"
              size="medium"
            >medium</cdr-radio>
            <cdr-radio
              name="size"
              custom-value="large"
              v-model="size"
              size="large"
            >large</cdr-radio>
        <div data-backstop="radio-responsive">
          <cdr-radio
            name="size"
            custom-value="responsive"
            v-model="size"
            size="small@lg medium@sm large@xs"
          >responsive</cdr-radio>
        </div>
        </div>
      </fieldset>
      <cdr-text>Size Group Picked: {{ size }}</cdr-text>
    </div>
    <div data-backstop="radio-focus">
      <fieldset>
        <legend id="legend-a">Group A</legend>
        <div aria-labelledby="legend-a" role="radiogroup">
            <cdr-radio
              id="test1"
              name="example"
              custom-value="a1"
              v-model="ex1"
            >A1</cdr-radio>
            <cdr-radio
              name="example"
              custom-value="a2"
              v-model="ex1"
            >A2</cdr-radio>
            <cdr-radio
              name="example"
              :custom-value="{val:'a3'}"
              v-model="ex1"
            >A3</cdr-radio>
            <cdr-radio
              name="example"
              custom-value="a4"
              v-model="ex1"
              disabled
            >A4 (disabled)</cdr-radio>
        </div>
      </fieldset>
      <cdr-text>Group A Picked: {{ ex1 }}</cdr-text>
    </div>
    <div style="max-width: 200px;" data-backstop="radio-focus">
      <fieldset>
        <legend id="legend-b">Group B (limited width) </legend>
        <div aria-labelledby="legend-b" role="radiogroup">
            <cdr-radio
              name="example2"
              custom-value="a1"
              v-model="ex2"
            >A1</cdr-radio>
            <cdr-radio
              name="example2"
              custom-value="a2"
              v-model="ex2"
            >A2</cdr-radio>
            <cdr-radio
              name="example2"
              :custom-value="{val:'a3'}"
              v-model="ex2"
            >A3</cdr-radio>
            <cdr-radio
              name="example2"
              custom-value="a4"
              v-model="ex2"
              disabled
            >A4 (disabled)</cdr-radio>
        </div>
      </fieldset>
      <cdr-text>Group B: {{ ex2 }}</cdr-text>
    </div>
    <div data-backstop="radio-focus">
      <fieldset>
        <legend id="custom-legend">Custom Checkbox Formatting</legend>
        <cdr-radio
          name="custom"
          custom-value="Selected and disabled"
          v-model="custom"
          disabled
        >C1 (selected + disabled)</cdr-radio>

        <cdr-radio
          name="custom"
          custom-value="customA"
          v-model="custom"
          modifier="hide-figure"
          input-class="no-box"
          content-class="no-box__content"
        >Custom A (hide-figure) </cdr-radio>

        <cdr-radio
          name="custom"
          custom-value="customB"
          v-model="custom"
          modifier="hide-figure"
          input-class="no-box"
          content-class="no-box__content"
        >Custom B (hide figure) </cdr-radio>
        
        <cdr-radio
          name="custom"
          custom-value="customC"
          v-model="custom"
          modifier="hide-figure"
          input-class="no-box"
          content-class="no-box__content"
        >Custom C (hide figure) </cdr-radio>

        <cdr-radio
          name="custom"
          custom-value="customD"
          v-model="custom"
          modifier="hide-figure"
        >Custom D (hide figure no but with no custom formatting) </cdr-radio>
      </fieldset>
      <cdr-text>Custom value picked: {{ custom }}</cdr-text>
    </div>
 <div data-backstop="radio-focus">

    </div>
    <div class="wrap">
      <cdr-radio
        name="custom4"
        custom-value="c1"
        v-model="ex3"
      >A longer label text to make things wrap for testing</cdr-radio>
    </div>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Radios',
  components: Components,
  data() {
    return {
      size: '',
      ex1: '',
      ex2: '',
      ex3: '',
      custom: 'Selected and disabled',
    };
  }
};
</script>

<style lang="scss">
.wrap {
  width: 180px;
}

.no-box:checked ~ .no-box__content {
  color: green;
}

.no-box:checked ~ .no-box__content::after {
  content: "(checked)";
}
</style>
