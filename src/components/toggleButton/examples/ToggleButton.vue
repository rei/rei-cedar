<template>
  <div style="width: 550px">
    <h3>With max-width inline styles added</h3>

    <cdr-toggle-group v-model="units" style="max-width: 13.5rem">
      <cdr-toggle-button toggleValue="centimeters">cm</cdr-toggle-button>
      <cdr-toggle-button toggleValue="inches">in</cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group v-model="dimensions" style="max-width: 29rem">
      <cdr-toggle-button toggleValue="Width">Width</cdr-toggle-button>
      <cdr-toggle-button toggleValue="Height">Height</cdr-toggle-button>
      <cdr-toggle-button toggleValue="Length">Length</cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group v-model="showhide" style="max-width: 23rem">
      <cdr-toggle-button toggleValue="show">
        <icon-eye-show />show
      </cdr-toggle-button>
      <cdr-toggle-button toggleValue="hide">
        <icon-eye-hide />hide
      </cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group v-model="showhide" style="max-width: 13rem">
      <cdr-toggle-button toggleValue="show">
        <icon-eye-show />
      </cdr-toggle-button>
      <cdr-toggle-button toggleValue="hide">
        <icon-eye-hide />
      </cdr-toggle-button>
    </cdr-toggle-group>
  </div>

  <div style="width: 550px">
    <h3>No max-width styling (expands to size of container)</h3>

    <cdr-toggle-group v-model="units">
      <cdr-toggle-button toggleValue="centimeters"></cdr-toggle-button>
      <cdr-toggle-button toggleValue="inches"></cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group v-model="dimensions">
      <cdr-toggle-button toggleValue="Width">Width</cdr-toggle-button>
      <cdr-toggle-button toggleValue="Height">Height</cdr-toggle-button>
      <cdr-toggle-button toggleValue="Length">Length</cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group v-model="showhide">
      <cdr-toggle-button toggleValue="show">
        <icon-eye-show />show
      </cdr-toggle-button>
      <cdr-toggle-button toggleValue="hide">
        <icon-eye-hide />hide
      </cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group v-model="showhide">
      <cdr-toggle-button toggleValue="show">
        <icon-eye-show />
      </cdr-toggle-button>
      <cdr-toggle-button toggleValue="hide">
        <icon-eye-hide />
      </cdr-toggle-button>
    </cdr-toggle-group>
  </div>
  <div style="width: 550px">
    <h3>Large Size and no max-width styling</h3>

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