<template>
  <div class="tooltip-example">
    <h2>tooltip</h2>
    <cdr-form-group label="tooltip position">
      <cdr-radio
        name="position"
        custom-value="top"
        v-model="position"
      >top</cdr-radio>
      <cdr-radio
        name="position"
        custom-value="bottom"
        v-model="position"
      >bottom</cdr-radio>
      <cdr-radio
        name="position"
        custom-value="left"
        v-model="position"
      >left</cdr-radio>
      <cdr-radio
        name="position"
        custom-value="right"
        v-model="position"
      >right</cdr-radio>
    </cdr-form-group>

    <cdr-form-group label="auto position">
      <cdr-radio
        name="autoPos"
        :custom-value="true"
        v-model="autoPos"
      >true</cdr-radio>
      <cdr-radio
        name="autoPos"
        :custom-value="false"
        v-model="autoPos"
      >false</cdr-radio>
    </cdr-form-group>

    <cdr-form-group label="trigger position">
      <cdr-radio
        name="trigger"
        custom-value="left"
        v-model="trigger"
      >left</cdr-radio>
      <cdr-radio
        name="trigger"
        custom-value="center"
        v-model="trigger"
      >center</cdr-radio>
      <cdr-radio
        name="trigger"
        custom-value="right"
        v-model="trigger"
      >right</cdr-radio>
    </cdr-form-group>

    <div style="clear: both" />

    <cdr-tooltip
      :position="position"
      :auto-position="autoPos"
      :class="containerClass"
      content-class="tooltip-override"
      id="tooltip-test"
      @opened="tooltipHandler"
      @closed="tooltipHandler"
    >
      <template #trigger>
        <cdr-button>
          tooltip
        </cdr-button>
      </template>

      <div>
        Hello! This tooltip contains important information about the web site you are visiting!
        We're using the internet right now!
      </div>
    </cdr-tooltip>

    <hr>

    <div
      style="position: relative; width: max-content"
      :class="containerClass"
    >
      <cdr-button
        @mouseover="open = true"
        @mouseleave="open = false"
        @focus="open = true"
        @blur="open = false"
        aria-describedby="tooltip-custom-test"
      >
        tooltip with custom trigger
      </cdr-button>
      <cdr-tooltip
        :position="position"
        :auto-position="autoPos"
        content-class="tooltip-override"
        :open="open"
        id="tooltip-custom-test"
        @opened="tooltipHandler"
        @closed="tooltipHandler"
      >
        <div>
          Hello! This tooltip contains important information about the web site you are visiting!
          We're using the internet right now!
        </div>
      </cdr-tooltip>

    </div>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Tooltip',
  components: {
    ...Components,
  },
  data() {
    return {
      position: 'top',
      autoPos: true,
      trigger: 'center',
      open: false,
    };
  },
  computed: {
    containerClass() {
      return `tooltip-container--${this.trigger}`;
    },
  },
  methods: {
    tooltipHandler(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped>

.tooltip-override {
}

.tooltip-container--center {
  margin: 0 auto;
}
.tooltip-container--right {
  margin-left: 95%;
}

.tooltip-example {
  /* lots of bottom space to allow scrolling*/
  margin-bottom: 1000px;
}

fieldset {
  width: 20%;
  float: left;
}
</style>
