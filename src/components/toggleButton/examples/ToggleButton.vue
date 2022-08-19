<template>
  <div style="width: 550px">
    <h3>With a maxWidth Property</h3>

    <cdr-toggle-group v-model="units" maxWidth="13.5rem">
      <cdr-toggle-button toggleValue="centimeters">cm</cdr-toggle-button>
      <cdr-toggle-button toggleValue="inches">in</cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group v-model="dimensions" maxWidth="29rem">
      <cdr-toggle-button toggleValue="Width">Width</cdr-toggle-button>
      <cdr-toggle-button toggleValue="Height">Height</cdr-toggle-button>
      <cdr-toggle-button toggleValue="Length">Length</cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group v-model="showhide" maxWidth="23rem">
      <cdr-toggle-button toggleValue="show">
        <icon-eye-show />show
      </cdr-toggle-button>
      <cdr-toggle-button toggleValue="hide">
        <icon-eye-hide />hide
      </cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group v-model="showhide" maxWidth="13rem">
      <cdr-toggle-button toggleValue="show">
        <icon-eye-show />
      </cdr-toggle-button>
      <cdr-toggle-button toggleValue="hide">
        <icon-eye-hide />
      </cdr-toggle-button>
    </cdr-toggle-group>
  </div>

  <div style="width: 550px">
    <h3>No maxWidth (expands to size of container)</h3>

    <cdr-toggle-group v-model="units">
      <cdr-toggle-button toggleValue="centimeters"></cdr-toggle-button>
      <cdr-toggle-button toggleValue="inches"></cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group :full-width="true" v-model="dimensions">
      <cdr-toggle-button toggleValue="Width">Width</cdr-toggle-button>
      <cdr-toggle-button toggleValue="Height">Height</cdr-toggle-button>
      <cdr-toggle-button toggleValue="Length">Length</cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group :full-width="true" v-model="showhide">
      <cdr-toggle-button toggleValue="show">
        <icon-eye-show />show
      </cdr-toggle-button>
      <cdr-toggle-button toggleValue="hide">
        <icon-eye-hide />hide
      </cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group :full-width="true" v-model="showhide">
      <cdr-toggle-button toggleValue="show">
        <icon-eye-show />
      </cdr-toggle-button>
      <cdr-toggle-button toggleValue="hide">
        <icon-eye-hide />
      </cdr-toggle-button>
    </cdr-toggle-group>
  </div>
  <div style="width: 550px">
    <h3>Large Size and no maxWidth</h3>

    <cdr-toggle-group size="large" v-model="units">
      <cdr-toggle-button toggleValue="centimeters">cm</cdr-toggle-button>
      <cdr-toggle-button toggleValue="inches">in</cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group size="large" v-model="dimensions">
      <cdr-toggle-button toggleValue="Width">Width</cdr-toggle-button>
      <cdr-toggle-button toggleValue="Height">Height</cdr-toggle-button>
      <cdr-toggle-button toggleValue="Length">Length</cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group size="large" v-model="showhide">
      <cdr-toggle-button toggleValue="show">
        <icon-eye-show />show
      </cdr-toggle-button>
      <cdr-toggle-button toggleValue="hide">
        <icon-eye-hide />hide
      </cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group size="large" v-model="showhide">
      <cdr-toggle-button toggleValue="show">
        <icon-eye-show />
      </cdr-toggle-button>
      <cdr-toggle-button toggleValue="hide">
        <icon-eye-hide />
      </cdr-toggle-button>
    </cdr-toggle-group>
  </div>

  <cdr-text>Selected Units: <strong>{{ units }}</strong></cdr-text>
  <cdr-text>Selected Dimensions: <strong>{{ dimensions }}</strong></cdr-text>
  <cdr-text>Show or Hide: <strong>{{ showhide }}</strong></cdr-text>

</template>

<script>

import * as Components from 'srcdir/lib';

export default {
  name: 'ToggleButton',
  components: {
    ...Components,
  },
  data() {
    return {
      units: 'centimeters',
      dimensions: 'Width',
      showhide: 'show',
    }
  }
};
</script>

<style>
</style>