<template>
  <div data-backstop="buttons">
    <div
      class="button-example inset"
      data-backstop="cdr-button--icon"
    >
      <h3>
        CdrButton + CdrIcon Comps
      </h3>
      <cdr-button
        size="large"
      >
        <icon-check-lg
          inherit-color
          v-slot:icon-left
        />
        Large and Icon
      </cdr-button>
      <cdr-button
        tag="a"
        href="https://rei.com"
        size="large"
      >
        <icon-check-lg
          inherit-color
          v-slot:icon-left
        />
        Anchor and Icon
      </cdr-button>

      <cdr-button
        size="medium"
      >
        <icon-check-lg
          inherit-color
          v-slot:icon-left
        />
        Medium and Icon
      </cdr-button>
      <cdr-button
        size="small"
      >
        <icon-check-lg
          inherit-color
          v-slot:icon-left
          size="small"
        />
        Small and Icon
      </cdr-button>
      <cdr-button
        size="small"
      >
        <icon-check-sm
          inherit-color
          v-slot:icon-left
        />
        Small (different) Icon
      </cdr-button>

      <br>

      <cdr-button
        size="large"
      >
        <icon-check-lg
          inherit-color
          v-slot:icon-right
        />
        Large and Icon
      </cdr-button>
      <cdr-button
        tag="a"
        href="https://rei.com"
        size="large"
      >
        <icon-check-lg
          inherit-color
          v-slot:icon-right
        />
        Anchor and Icon
      </cdr-button>

      <cdr-button
        size="medium"
      >
        <icon-check-lg
          inherit-color
          v-slot:icon-right
        />
        Medium and Icon
      </cdr-button>
      <cdr-button
        size="small"
      >
        <icon-check-lg
          inherit-color
          v-slot:icon-right
          size="small"
        />
        Small and Icon
      </cdr-button>
      <cdr-button
        size="small"
      >
        <icon-check-sm
          inherit-color
          v-slot:icon-right
        />
        Small (different) Icon
      </cdr-button>

      <br>

      <cdr-button
        size="large"
      >
        <icon-check-lg
          inherit-color
          v-slot:icon-left
        />
        Large and left Icon
      </cdr-button>

      <cdr-button
        size="large"
      >
        <icon-check-lg
          inherit-color
          v-slot:icon-right
        />
        Large and right Icon
      </cdr-button>
    </div>
    <div class="button-example inset">
      <h3>
        Using a sprite
      </h3>
      <cdr-button
        size="large"

        modifier="secondary"
      >
        <cdr-icon
          inherit-color
          v-slot:icon-left
          use="#download"
        />
        Button and Icon
      </cdr-button>
      <cdr-button
        size="large"

        modifier="secondary"
        disabled
      >
        <cdr-icon
          inherit-color
          v-slot:icon-left
          use="#download"
        />
        Button and Icon
      </cdr-button>
      <cdr-button
        size="medium"

        modifier="secondary"
      >
        <cdr-icon
          inherit-color
          v-slot:icon-left
          use="#twitter"
        />
        Twitter
      </cdr-button>
      <cdr-button
        size="small"
        modifier="secondary"
      >
        <cdr-icon
          inherit-color
          v-slot:icon-left
          use="#instagram"
        />
        Instagram
      </cdr-button>
    </div>
    <div class="button-example inset">
      <cdr-button
        size="large large@xs medium@sm small@lg"
      >
        <cdr-icon
          use="#clock"
          inherit-color
          v-slot:icon-left
        />
        Responsive Left
      </cdr-button>

      <cdr-button
        size="large large@xs medium@sm small@lg"
      >
        Responsive Right
        <cdr-icon
          use="#clock"
          inherit-color
          v-slot:icon-right
        />
      </cdr-button>
    </div>
    <div class="button-example inset">
      <cdr-button
        size="large"
        :full-width="true"
      >
        <cdr-icon
          use="#clock"
          inherit-color
          v-slot:icon-left
        />
        Full Width Icon Left
      </cdr-button>
      <cdr-button
        class="stack"
        size="large"
        :full-width="true"
      >
        <cdr-icon
          use="#clock"
          inherit-color
          v-slot:icon-right
        />
        Full Width Icon Right
      </cdr-button>
    </div>
    <div class="button-example inset">
      <div
        class="button-text-wrap"
        style="max-width: 300px;"
      >
        <cdr-button
          size="medium"
          modifier="secondary"
        >
          <cdr-icon
            inherit-color
            v-slot:icon-left
            use="#twitter"
          />
          <!-- eslint-disable-next-line -->
          The text of this button will wrap onto multiple lines (with icon on the left)!
        </cdr-button>

        <cdr-button
          size="medium"
          modifier="secondary"
          class="stack"
        >
          <cdr-icon
            inherit-color
            v-slot:icon-right
            use="#twitter"
          />
          <!-- eslint-disable-next-line -->
          The text of this button will wrap onto multiple lines (with icon on the right)!
        </cdr-button>
      </div>
    </div>
    <div class="button-example inset">
      <h3>
        Icon only button
      </h3>
      <cdr-button
        :icon-only="true"
        :full-width="true"
        size="small"
        aria-label="Check our Twitter feed"
        data-backstop="cdr-button--icon-only"
      >
        <cdr-icon
          use="#twitter"
          inherit-color
          v-slot:icon-left
        />
      </cdr-button>
      <cdr-button
        icon-only
        aria-label="Close"
      >
        <cdr-icon
          use="#x-lg"
          inherit-color
          v-slot:icon-left
        />
      </cdr-button>
      <cdr-button
        tag="a"
        href="https://rei.com"
        :icon-only="true"
        aria-label="This link goes elsewhere"
      >
        <cdr-icon
          use="#external-link"
          inherit-color
          v-slot:icon-left
        />
      </cdr-button>
      <cdr-button
        :icon-only="true"
        aria-label="Play"
      >
        <cdr-icon
          use="#play"
          inherit-color
          v-slot:icon-left
        />
      </cdr-button>
      <cdr-button
        :icon-only="true"
        aria-label="Play"
        disabled
      >
        <cdr-icon
          use="#play"
          inherit-color
          v-slot:icon-left
        />
      </cdr-button>
    </div>
    <div class="button-example inset dark">
      <cdr-button
        :icon-only="true"
        :with-background="true"
        aria-label="A Twitter button"
        data-backstop="cdr-button--icon-only-with-background"
      >
        <cdr-icon
          use="#twitter"
          inherit-color
          v-slot:icon-left
        />
      </cdr-button>
      <cdr-button
        icon-only
        :with-background="true"
        aria-label="Close"
      >
        <cdr-icon
          use="#x-lg"
          inherit-color
          v-slot:icon-left
        />
      </cdr-button>
      <cdr-button
        tag="a"
        href="https://rei.com"
        :icon-only="true"
        :with-background="true"
        aria-label="An external link"
      >
        <cdr-icon
          use="#external-link"
          inherit-color
          v-slot:icon-left
        />
      </cdr-button>
      <cdr-button
        icon-only
        :with-background="true"
        aria-label="Play"
      >
        <cdr-icon
          use="#play"
          inherit-color
          v-slot:icon-left
        />
      </cdr-button>
      <cdr-button
        icon-only
        aria-label="Play"
        :with-background="true"
        disabled
      >
        <cdr-icon
          use="#play"
          inherit-color
          v-slot:icon-left
        />
      </cdr-button>
    </div>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'ButtonIconComps',
  components: {
    ...Components,
  },
};
</script>
