<template>
  <div data-backstop="cta-buttons">
    <div
      style="inset"
      v-for="(section, index) in data"
      :key="index"
      :data-backstop="section.backstop ? section.backstop : null"
    >
      <h3>
        {{ section.title }}
      </h3>
      <cdr-button
        v-for="(button, index2) in section.buttons"
        :key="index2"
        :size="button.size"
        :full-width="button.fullWidth"
        :modifier="button.modifier"
        href="rei.com"
        tag="a"
      >
        {{ button.label }}
      </cdr-button>
    </div>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Default',
  components: {
    ...Components,
  },
  data: function data() {
    return {
      data: [
        {
          title: 'Link modifier',
          backstop: 'cdr-button--link',
          buttons: [
            {
              label: 'Large Link',
              size: 'large',
              fullWidth: false,
              modifier: 'link',
            },
            {
              label: 'Medium Link',
              size: 'medium',
              fullWidth: false,
              modifier: 'link',
            },
            {
              label: 'Small Link',
              size: 'small',
              fullWidth: false,
              modifier: 'link',
            },
            {
              label: 'Full-Width Link',
              size: 'medium',
              fullWidth: true,
              modifier: 'link',
            },
          ],
        },
        {
          title: 'Dark CTA',
          backstop: 'cdr-button--cta-dark',
          buttons: [
            {
              label: 'Large Dark',
              size: 'large',
              fullWidth: false,
              modifier: 'dark',
            },
            {
              label: 'Medium Dark',
              size: 'medium',
              fullWidth: false,
              modifier: 'dark',
            },
            {
              label: 'Small Dark',
              size: 'small',
              fullWidth: false,
              modifier: 'dark',
            },
            {
              label: 'Full-Width Dark',
              size: 'medium',
              fullWidth: true,
              modifier: 'dark',
            },
          ],
        },

        {
          title: 'Sale CTA',
          backstop: 'cdr-button--cta-sale',
          buttons: [
            {
              label: 'Large Sale',
              size: 'large',
              fullWidth: false,
              modifier: 'sale',
            },
            {
              label: 'Medium Sale',
              size: 'medium',
              fullWidth: false,
              modifier: 'sale',
            },
            {
              label: 'Small Sale',
              size: 'small',
              fullWidth: false,
              modifier: 'sale',
            },
            {
              label: 'Full-Width Sale',
              size: 'medium',
              fullWidth: true,
              modifier: 'sale',
            },
          ],
        },

        {
          title: 'Primary CTA',
          backstop: 'cdr-button--cta-primary',
          buttons: [
            {
              label: 'Large Primary',
              size: 'large',
              fullWidth: false,
              modifier: 'primary',
            },
            {
              label: 'Medium Primary',
              size: 'medium',
              fullWidth: false,
              modifier: 'primary',
            },
            {
              label: 'Small Primary',
              size: 'small',
              fullWidth: false,
              modifier: 'primary',
            },
            {
              label: 'Full-Width Primary',
              size: 'medium',
              fullWidth: true,
              modifier: 'primary',
            },
          ],
        },

        {
          title: 'Secondary CTA',
          backstop: 'cdr-button--cta-secondary',
          buttons: [
            {
              label: 'Large Secondary',
              size: 'large',
              fullWidth: false,
              modifier: 'secondary',
            },
            {
              label: 'Medium Secondary',
              size: 'medium',
              fullWidth: false,
              modifier: 'secondary',
            },
            {
              label: 'Small Secondary',
              size: 'small',
              fullWidth: false,
              modifier: 'secondary',
            },
            {
              label: 'Full-Width Secondary',
              size: 'medium',
              fullWidth: true,
              modifier: 'secondary',
            },
          ],
        },
      ],
    };
  },
};
</script>
