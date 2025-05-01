<template>
  <div>

    <h3>
      Resilience Tests
    </h3>

    <h3>Content Resilience, too much content</h3>
    <div class="anchor-example">
      <cdr-link href="#foo">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Officia inventore, quis ducimus itaque rerum id animi accusantium porro ex numquam.
        Dolorum ducimus illo doloremque ullam quas. Vel similique laudantium error!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia inventore,
        quis ducimus itaque rerum id animi accusantium porro ex numquam. Dolorum ducimus
        illo doloremque ullam quas. Vel similique laudantium error!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia inventore,
        quis ducimus itaque rerum id animi accusantium porro ex numquam. Dolorum ducimus
        illo doloremque ullam quas. Vel similique laudantium error!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia inventore, quis
        ducimus itaque rerum id animi accusantium porro ex numquam. Dolorum ducimus illo
        doloremque ullam quas. Vel similique laudantium error!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia inventore, quis
        ducimus itaque rerum id animi accusantium porro ex numquam. Dolorum ducimus illo
        doloremque ullam quas. Vel similique laudantium error!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia inventore, quis ducimus
        itaque rerum id animi accusantium porro ex numquam. Dolorum ducimus illo doloremque ullam
        quas. Vel similique laudantium error!
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Officia inventore, quis ducimus itaque rerum id animi accusantium porro ex numquam.
        Dolorum ducimus illo doloremque ullam quas. Vel similique laudantium error!
      </cdr-link>
    </div>

    <h3>Content Resilience, too little content</h3>
    <div class="anchor-example">
      <cdr-link href="#foo">
        K
      </cdr-link>
    </div>

    <h4>
      Typography validation -
    </h4>

    <cdr-text
      v-for="p1 in paragraphs"
      :key="`link-p1-${p1}`"
      :class="`cdr-text-dev--body-${p1}`"
    >
      <cdr-link href="#foo">
        item text
        <cdr-text
          tag="span"
          :class="`cdr-text-dev--body-strong-${p1}`"
        >
          sit amet,
        </cdr-text>
      </cdr-link>
    </cdr-text>

    <cdr-text
      v-for="u1 in utilities"
      :key="`link-u1-${u1}`"
      :class="`cdr-text-dev--utility-sans-${u1}`"
    >
      <cdr-link href="#foo">
        item text
        <cdr-text
          tag="span"
          :class="`cdr-text-dev--utility-sans-strong-${u1}`"
        >
          sit amet,
        </cdr-text>
      </cdr-link>
    </cdr-text>

    <cdr-text
      v-for="u2 in utilities"
      :key="`link-u2-${u2}`"
      :class="`cdr-text-dev--utility-sans-strong-${u2}`"
    >
      <cdr-link href="#foo">
        <cdr-icon
          inherit-color
          use="#arrow-up"
          modifier="inherit-color"
        />
        text element wrapping link with nested icon
      </cdr-link>
    </cdr-text>

    <cdr-list>
      <li

        v-for="u1 in utilities"
        :key="`list-link-left-icon-${u1}`"
      >
        <cdr-link href="#foo">
          <cdr-icon
            inherit-color
            use="#arrow-up"
            modifier="inherit-color"
          />
          <cdr-text
            tag="span"
            :class="`cdr-text-dev--utility-sans-strong-${u1}`"
          >
            Icon on the left
          </cdr-text>
        </cdr-link>
      </li>
      <li

        v-for="u1 in utilities"
        :key="`list-link-right-icon-${u1}`"
      >
        <cdr-link href="#foo">
          <cdr-text
            tag="span"
            :class="`cdr-text-dev--utility-sans-strong-${u1}`"
          >
            Icon on the right
          </cdr-text>
          <cdr-icon
            inherit-color
            use="#arrow-up"
            modifier="inherit-color"
          />
        </cdr-link>
      </li>
      <li

        v-for="u1 in utilities"
        :key="`list-link-both-icon-${u1}`"
      >
        <cdr-link href="#foo">
          <cdr-icon
            inherit-color
            use="#arrow-up"
            modifier="inherit-color"
          />
          <cdr-text
            tag="span"
            :class="`cdr-text-dev--utility-sans-strong-${u1}`"
          >
            Icons on both sides
          </cdr-text>
          <cdr-icon
            inherit-color
            use="#arrow-up"
            modifier="inherit-color"
          />
        </cdr-link>
      </li>
    </cdr-list>

    <h3>Variant: Standalone</h3>
    <cdr-link href="#foo" modifier="standalone">
      Standalone variant link
    </cdr-link>

    <h3>Variant: Inherit Color</h3>
    <div style="color: red;">
      <cdr-link href="#foo" :inherit-color="true">
        Inherit color (should be red)
      </cdr-link>
    </div>

    <h3>Variant: Inherit Color (custom color context)</h3>
    <p class="cdr-link-demo-red">
      This is a paragraph with a
      <cdr-link href="#foo" modifier="inherit-color">
        red inherit-color link
      </cdr-link>
      inside.
    </p>

    <h3>Variant: Neutral</h3>
    <cdr-link href="#foo" modifier="neutral">
      Neutral variant link (should use primary text color)
    </cdr-link>

    <h3>Combined: Standalone + Inherit Color</h3>
    <div style="color: green;">
      <cdr-link href="#foo" modifier="standalone" inherit-color>
        Standalone + inherit color (should be green, no underline by default)
      </cdr-link>
    </div>

    <h3>Combined: Standalone + Inherit Color (custom color context)</h3>
    <p class="cdr-link-demo-green">
      This is a paragraph with a
      <cdr-link href="#foo" modifier="standalone inherit-color">
        green standalone + inherit-color link
      </cdr-link>
      inside.
    </p>

    <h3>Combined: Standalone + Neutral</h3>
    <cdr-link href="#foo" modifier="standalone neutral">
      Standalone + neutral (should use primary text color, no underline by default)
    </cdr-link>

    <h3>Edge: Button Tag</h3>
    <cdr-link tag="button">
      Rendered as button
    </cdr-link>

    <h3>Edge: Disabled Button</h3>
    <cdr-link tag="button" :disabled="true">
      Disabled button link
    </cdr-link>

    <h3>Edge: Custom rel and target</h3>
    <cdr-link href="https://rei.com" target="_blank" rel="noopener">
      External link with custom rel/target
    </cdr-link>

  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'ResilienceTest',
  components: Components,
  data() {
    return {
      paragraphs: ['300', '400', '500'],
      utilities: ['100', '200', '300', '400', '500', '600', '700', '800'],
    };
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
p {
  margin: 1rem 0!important;
}

.cdr-link-demo-red {
  color: red;
}

.cdr-link-demo-green {
  color: green;
}
</style>
