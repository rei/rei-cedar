<template>
  <div
    class="icon-examples"
    data-backstop="icons"
  >
    <h2>
      Icons
    </h2>

    <cdr-text>SVG markup in slot</cdr-text>
    <cdr-icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        data-test="testing"
        class="my-custom-class"
        role="testing"
      >
        <!-- eslint-disable-next-line -->
        <path d="M10 13v1h3.996v2H10v1a4 4 0 11-7.853-1.085l1.795-8.93.093-.442A3 3 0 0110 7v4h3.997V7a3 3 0 015.965-.456l.093.442 1.795 8.93A4.003 4.003 0 0117.998 21a4 4 0 01-4-4v-4H10zm9.296.214l-1.308-6.38a1.01 1.01 0 00-.99-.835 1 1 0 00-1 1v6.536a4.016 4.016 0 013.299-.321zm-14.6 0c.408-.14.844-.215 1.298-.215.73 0 1.413.195 2.002.536V7a1 1 0 00-1-1 1.01 1.01 0 00-.99.836l-1.31 6.38zM18 19a2 2 0 100-4 2 2 0 000 4zM6.011 19a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    </cdr-icon>
    <cdr-icon>
      <!-- eslint-disable-next-line -->
      <path d="M10 13v1h3.996v2H10v1a4 4 0 11-7.853-1.085l1.795-8.93.093-.442A3 3 0 0110 7v4h3.997V7a3 3 0 015.965-.456l.093.442 1.795 8.93A4.003 4.003 0 0117.998 21a4 4 0 01-4-4v-4H10zm9.296.214l-1.308-6.38a1.01 1.01 0 00-.99-.835 1 1 0 00-1 1v6.536a4.016 4.016 0 013.299-.321zm-14.6 0c.408-.14.844-.215 1.298-.215.73 0 1.413.195 2.002.536V7a1 1 0 00-1-1 1.01 1.01 0 00-.99.836l-1.31 6.38zM18 19a2 2 0 100-4 2 2 0 000 4zM6.011 19a2 2 0 100-4 2 2 0 000 4z" />
    </cdr-icon>

    <h3>
      Default icon size
    </h3>
    <cdr-icon
      use="#account-profile"
      data-backstop="cdr-icon-hover"
      class="icon-hover"
    />
    <cdr-icon
      use="#account-profile"
      class="icon-hover"
    />

    <hr class="icon-hr">
    <cdr-text>Using Sprite</cdr-text>
    <!-- TODO: eradicate rows -->

    <cdr-grid
      class="icon-grid"
    >
      <div v-for="(val, key) in filteredIcons" :key="key">
        <div class="center">
          <cdr-icon :use="`#${getSpriteId(key)}`" />
          <cdr-text>{{ getSpriteId(key) }}</cdr-text>
        </div>
      </div>
    </cdr-grid>

    <hr class="icon-hr" />

    <cdr-text>Using Inline Components</cdr-text>

    <cdr-grid
      class="icon-grid"
    >
      <div v-for="(val, key) in filteredIcons" :key="key">
        <div class="center">
          <component :is="key" />
          <cdr-text>{{ getSpriteId(key) }}</cdr-text>
        </div>
      </div>
    </cdr-grid>

    <hr class="icon-hr">
    <h4>
      Container with pink fill color
    </h4>
    <div class="inherit-container">
      <cdr-grid style="grid-template-columns: 1fr 1fr">
          <div>
            <span>Icon with inherit-color</span>
            <cdr-icon
              use="#account-profile"
              inherit-color
            />
          </div>
          <div>
            <span>Icon WITHOUT inherit-color</span>
            <cdr-icon
              use="#account-profile"
            />
          </div>
      </cdr-grid>
    </div>
    <hr class="icon-hr">
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';
import * as Icons from 'componentsdir/icon/index';

export default {
  name: 'Icons',
  components: {
    ...Components,
  },
  data() {
    return {
      Icons,
    };
  },
  computed: {
    filteredIcons() {
      const notAllowed = ['CdrIcon'];
      return Object.keys(this.Icons)
        .filter((key) => !notAllowed.includes(key))
        .reduce((obj, key) => ({
          ...obj,
          [key]: this.Icons[key],
        }), {});
    },
  },
  methods: {
    getSpriteId(name) {
      return name.replace('Icon', '').replace(/([a-zA-Z])([A-Z0-9])/g, '$1-$2').toLowerCase();
    },
  },
};
</script>

<style lang="scss">
  .icon-grid {
    margin: 5rem 0;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 7.2rem 3.2rem;
  }
  .icon-examples {
    line-height: 1;

    .icon-hover:hover {
      fill: red;
    }
  }

  .inherit-container {
    fill: pink;
    border: 2px solid pink;
  }

  .icon-hr {
    margin: 0.5em 0;
    border-style: inset;
    border-width: 1px;
    border-color: black;
  }
</style>
