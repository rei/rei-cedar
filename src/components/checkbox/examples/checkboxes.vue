<template>
  <div id="examples">
    <h2>
      Checkboxes
    </h2>
    <cdr-checkbox
      v-model="sizeEx"
      size="small"
    >small</cdr-checkbox>
    <cdr-checkbox
      v-model="sizeEx"
      size="medium"
    >medium</cdr-checkbox>
    <cdr-checkbox
      v-model="sizeEx"
      size="large"
    >large</cdr-checkbox>
    <div data-backstop="checkbox-responsive">
      <cdr-checkbox
        v-model="sizeEx"
        size="small@lg medium@sm large@xs"
      >responsive</cdr-checkbox>
    </div>
    <cdr-checkbox
      v-model="sizeEx2"
      size="small"
    >small</cdr-checkbox>
    <cdr-checkbox
      v-model="sizeEx2"
      size="medium"
    >medium</cdr-checkbox>
    <cdr-checkbox
      v-model="sizeEx2"
      size="large"
    >large</cdr-checkbox>
    <cdr-checkbox
      v-model="sizeEx2"
      size="small@lg medium@sm large@xs"
    >responsive</cdr-checkbox>
    <cdr-checkbox
      v-model="ex1"
      @change="logChange"
    >single</cdr-checkbox>
    <cdr-text>single: {{ ex1 }}</cdr-text>

    <div data-backstop="checkbox-checked">
      <cdr-checkbox
        v-model="ex2"
        true-value="checked"
        false-value="unchecked"
      >checked</cdr-checkbox>
    </div>
    <cdr-text>checked: {{ ex2 }}</cdr-text>

    <cdr-checkbox
      v-model="ex3"
      true-value="checked"
    >custom true</cdr-checkbox>
    <cdr-text>custom true: {{ ex3 }}</cdr-text>

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
    <cdr-checkbox
      :custom-value="{value:'D'}"
      v-model="exGroup"
    >D</cdr-checkbox>
    <cdr-checkbox
      :custom-value="testVal"
      v-model="exGroup"
    >E</cdr-checkbox>
    <cdr-checkbox
      :custom-value="testVal2"
      v-model="exGroup"
    >F</cdr-checkbox>

    <cdr-text>group: {{ exGroup }}</cdr-text>
    <cdr-text>Note: Arrays currently can't be nested in an array of values. The value becomes stringified. This appears to be a bug in Vue. Try toggling the "F" checkbox to see the current effect of nesting an array value</cdr-text>

    <cdr-checkbox disabled>
      disabled checkbox
    </cdr-checkbox>
    <cdr-checkbox
      v-model="checked"
      disabled
    >disabled and checked checkbox</cdr-checkbox>

    <div class="wrap">
      <cdr-checkbox
        name="complex1"
        v-model="complex1"
      >A longer label text to make things wrap for testing
      </cdr-checkbox>
    </div>

    <cdr-checkbox
      indeterminate
    >indeterminate (not functional)</cdr-checkbox>
    <cdr-checkbox
      indeterminate
      disabled
    >indeterminate (not functional)</cdr-checkbox>

    <cdr-checkbox modifier="hide-figure">
      Hidden box
    </cdr-checkbox>
    <cdr-checkbox
      modifier="hide-figure"
      v-model="complex2"
      input-class="no-box"
      content-class="no-box__content"
    >Hidden box + custom checked state
    </cdr-checkbox>

    <h3>
      Checkbox group with indeterminate state:
    </h3>

    <cdr-form-group id="toppings-form" label="Choose your toppings">
      <cdr-checkbox
        v-model="allSelected"
        :indeterminate="isIndeterminate"
        @change="selectAll"
        aria-controls="toppings"
      >
        Select All
      </cdr-checkbox>
      <cdr-list
        id="toppings"
        aria-label="Individual toppings"
      >
        <li
          v-for="c in toppings"
          :key="`checkbox-${c}`"
        >
          <cdr-checkbox
            v-model="selected"
            :custom-value="c"
            name="toppings"
            aria-labelledby="toppings"
          >{{ c }}</cdr-checkbox>
        </li>
      </cdr-list>
    </cdr-form-group>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Checkboxes',
  components: Components,
  data() {
    return {
      checked: true,
      sizeEx: false,
      sizeEx2: true,
      ex1: true,
      ex2: 'checked',
      ex3: 'checked',
      exGroup: ['A', { value: 'D' }, [9, 8]],
      testVal: {
        value: 'X',
        more: {
          things: [1, 2, 3],
        },
      },
      testVal2: [9, 8],
      complex1: false,
      complex2: true,
      toppings: ['Cheese', 'Pepperoni', 'Mushroom', 'Peppers'],
      selected: ['Cheese'],
      allSelected: false,
    };
  },
  computed: {
    isIndeterminate() {
      this.allSelected = false; // eslint-disable-line vue/no-side-effects-in-computed-properties
      if (this.selected.length === 0) {
        return false;
      } if (this.selected.length === this.toppings.length) {
        this.allSelected = true; // eslint-disable-line vue/no-side-effects-in-computed-properties
        return false;
      }
      return true;
    },
  },
  methods: {
    selectAll(isChecked) {
      this.selected = isChecked ? this.toppings.slice() : [];
    },
    logChange(val, e) {
      console.log('log', val, e); // eslint-disable-line
    },
  },
};
</script>

<style lang="scss">
  .wrap {
    width: 180px;
  }

  .no-box:checked ~ .no-box__content {
    color: green;

    &::after {
      content: '(checked)';
    }
  }
</style>
