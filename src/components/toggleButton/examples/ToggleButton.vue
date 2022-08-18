<template>
  <div style="width: 550px">
    <h3>Default Size and Width</h3>

    <cdr-toggle-group v-model="units">
      <cdr-toggle-button toggleValue="cm">cm</cdr-toggle-button>
      <cdr-toggle-button toggleValue="in">in</cdr-toggle-button>
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
    <h3>Large Size and  Default Width</h3>

    <cdr-toggle-group size="large" v-model="units">
      <cdr-toggle-button toggleValue="cm">cm</cdr-toggle-button>
      <cdr-toggle-button toggleValue="in">in</cdr-toggle-button>
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
  <div style="width: 550px">
    <h3>Full Width Variant</h3>

    <cdr-toggle-group :full-width="true" v-model="units">
      <cdr-toggle-button toggleValue="cm"></cdr-toggle-button>
      <cdr-toggle-button toggleValue="in"></cdr-toggle-button>
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
    <h3>Large Size & Full Width Variant</h3>

    <cdr-toggle-group size="large" :full-width="true" v-model="units">
      <cdr-toggle-button toggleValue="cm"></cdr-toggle-button>
      <cdr-toggle-button toggleValue="in"></cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group size="large" :full-width="true" v-model="dimensions">
      <cdr-toggle-button toggleValue="Width">Width</cdr-toggle-button>
      <cdr-toggle-button toggleValue="Height">Height</cdr-toggle-button>
      <cdr-toggle-button toggleValue="Length">Length</cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group size="large" :full-width="true" v-model="showhide">
      <cdr-toggle-button toggleValue="show">
        <icon-eye-show />show
      </cdr-toggle-button>
      <cdr-toggle-button toggleValue="hide">
        <icon-eye-hide />hide
      </cdr-toggle-button>
    </cdr-toggle-group>

    <cdr-toggle-group size="large" :full-width="true" v-model="showhide">
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
      units: 'cm',
      dimensions: 'Width',
      showhide: 'show',
    }
  }
};
</script>

<style>
</style>