<template>
  <!-- eslint-disable max-len -->
  <div
    class="link-examples"
    data-backstop="all-links"
  >
    <h2>
      Links
    </h2>

    <h3>
      Default Link, No props
    </h3>
    <div class="anchor-example">
      <cdr-link
        href="#baz"
        data-backstop="cdr-link"
      >
        REI.com
      </cdr-link>
    </div>
    <div class="anchor-example">
      <cdr-link
        href="#foo"
        aria-label="baz"
      />
    </div>

    <h3>Link, href set, spacing class applied</h3>
    <cdr-link
      href="https://www.rei.com/"
    >
      REI.com
    </cdr-link>

    <h3>Link, href set</h3>
    <cdr-link
      href="https://www.example.com/"
    >
      example.com
    </cdr-link>
    <h3>Standalone Link (No underline)</h3>
    <cdr-link
      modifier="standalone"
      href="#bar"
      data-backstop="cdr-link--standalone"
    >
      REI.com
    </cdr-link>

    <h3>Standalone + Neutral (Combined props)</h3>
    <cdr-link
      modifier="standalone neutral"
      href="#bar"
      data-backstop="cdr-link--standalone-neutral"
    >
      Standalone + Neutral
    </cdr-link>

    <h3>Standalone + Inherit Color (Combined props)</h3>
    <div style="color: blue;">
      <cdr-link
        modifier="standalone"
        href="#bar"
        inherit-color
        data-backstop="cdr-link--standalone-inherit"
      >
        Standalone + Inherit Color (should be blue)
      </cdr-link>
    </div>

    <h3>Neutral Only (Prop usage)</h3>
    <cdr-link
      modifier="neutral"
      href="#bar"
      data-backstop="cdr-link--neutral"
    >
      Neutral Only
    </cdr-link>

    <h3>Inherit Color Only (Prop usage)</h3>
    <div style="color: orange;">
      <cdr-link
        href="#bar"
        inherit-color
        data-backstop="cdr-link--inherit"
      >
        Inherit Color Only (should be orange)
      </cdr-link>
    </div>

    <h3>Links, with icon</h3>

    <cdr-list>
      <li>
        <cdr-link href="#baz">
          <cdr-icon
            inherit-color
            use="#arrow-up"
            modifier="inherit-color"
          />
          Icon on the left
        </cdr-link>
      </li>
      <li>
        <cdr-link href="#baz">
          Icon on the right
          <cdr-icon
            inherit-color
            use="#arrow-up"
            modifier="inherit-color"
          />
        </cdr-link>
      </li>
      <li>
        <cdr-link href="#baz">
          <cdr-icon
            inherit-color
            use="#arrow-up"
            modifier="inherit-color"
          />
          Icons on both sides
          <cdr-icon
            inherit-color
            use="#arrow-up"
            modifier="inherit-color"
          />
        </cdr-link>
      </li>
    </cdr-list>

    <h3>Links, with inherited color</h3>
    <div style="color: darkgreen; fill: darkgreen;">
      <cdr-link
        inherit-color
        href="rei.com"
      >
        inherit-color plain example
      </cdr-link>
      <br><br>
      <cdr-link
        inherit-color
        href="#qux"
      >
        <cdr-icon
          inherit-color
          use="#arrow-up"
          modifier="inherit-color"
        />
        cdr-link icon inherit
      </cdr-link>
    </div>
    <br><br>
    <h3>Button Links</h3>

    <h4>Link using a &lt;button&gt; element inline</h4>
    <div class="anchor-example stack">
      hey there <cdr-link
        tag="button"
        data-backstop="cdr-link--button"
        @click="clicked"
      >I'm a button!</cdr-link> wow!
    </div>

  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'StandardLinks',
  components: {
    ...Components,
  },
  methods: {
    clicked() {
      // eslint-disable-next-line no-console
      console.log('link clicked!');
    },
  },
};
</script>

<style>
/** normalize line-height for consistent testing because links inherit it */

.link-examples {
  line-height: 1;
}

.button-padding-override {
  padding-left: 0;
  padding-right: 0;
}

/* Remove .cdr-link-demo-neutral and .cdr-link--neutral, as variants should be set via props */

/* Example: Inherit color using custom property override for legacy/demo only */
.cdr-link-demo-inherit {
  --cdr-link-text-color: inherit;
  --cdr-link-fill-color: inherit;
}
</style>
