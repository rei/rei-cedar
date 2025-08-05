<script>

import SinkWrapper from './SinkWrapper.vue'; // eslint-disable-line
import { CdrLink } from '../lib';
import routes from './router';

export default {
  components: {
    SinkWrapper,
    CdrLink,
  },
  data() {
    return {
      routes,
      // eslint-disable-next-line max-len
      fullSprite: '<svg xmlns="http://www.w3.org/2000/svg"><defs/><symbol id="arrow-up" viewBox="0 0 24 24"><path role="presentation" d="M13 7.415l3.295 3.295a1 1 0 001.412-1.417l-4.98-4.98a.997.997 0 00-1.429-.025L6.293 9.293a1 1 0 001.414 1.414L11 7.414V19a1 1 0 002 0V7.415z"/></symbol><symbol id="arrow-down" viewBox="0 0 24 24"><path role="presentation" d="M11 16.585L7.705 13.29a1 1 0 00-1.412 1.417l4.98 4.98a.997.997 0 001.429.025l5.005-5.005a1 1 0 00-1.414-1.414L13 16.586V5a1 1 0 00-2 0v11.585z"/></symbol></svg>',


    };
  },
  computed: {
    isBackstop() {
      return false; // this.$router.currentRoute.query.backstop;
    },
  },
  watch: {
    // Adapted from https://marcus.io/blog/accessible-routing-vuejs
    $route(to, from) {
      // updating query (for background radios) so don't alter focus
      if (to.hash === '' && to.path === from.path) return;
      // Get focus target after nav
      // If not existent, use container so skip link is first again
      const focusTarget = (to.hash)
        ? this.$refs.focusTarget
        : this.$refs.focusWrapper;
      // Make focustarget programmatically focusable
      focusTarget.setAttribute('tabindex', '-1');
      // Focus element
      focusTarget.focus();
      // Remove tabindex from focustarget.
      // Reason: https://axesslab.com/skip-links/#update-3-a-comment-from-gov-uk
      focusTarget.removeAttribute('tabindex');
    },
  },
};
console.log(routes)
</script>

<template>
  <div
    class="container"
    ref="focusWrapper"
  >

    <!-- NOTE: For dev environment only, do not load icon sprites in JS in production -->
    <!-- eslint-disable vue/no-v-html -->
    <div
      style="display:none"
      v-html="fullSprite"
    />
    <ul
      style="padding:0"
      v-if="!isBackstop"
    >
      <li
        class="nav"
        v-for="r in routes"
        :key="r.name"
      >
        <router-link
          v-if="r.name"
          :key="r.path"
          :to="r.path"
          v-slot="{ href, route, navigate, isActive }"
        >
          <cdr-link
            :href="href"
            @click="navigate"
            :aria-current="isActive ? 'page' : false"
          >
            {{ (isActive && route.name !== ' ') ? `${route.name}` : route.name }}
          </cdr-link>
        </router-link>
      </li>
    </ul>
    <hr>
    <h1
      id="content"
      ref="focusTarget"
    >
      REI Cedar
    </h1>

    <sink-wrapper>
      <div class="stack">
        <router-view />
      </div>
    </sink-wrapper>
  </div>
</template>

<style lang="scss">
@use "@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens" as tokens;

@use "../styles/main.scss" as main;
@use "@rei/cdr-tokens/dist/rei-dot-com/css/cdr-tokens.css";

.stack {
  margin-top: tokens.$cdr-space-one-x;
}

.mega-stack {
  margin-top: tokens.$cdr-space-four-x;
}

.inset {
  padding: tokens.$cdr-space-one-x;
}

.center {
  text-align: center;
}

.sr-only {
  @include tokens.cdr-display-sr-only;
}

// root page container
.container {
  @include tokens.cdr-container-fluid;
}

// router links at top of page
.nav {
  padding: tokens.$cdr-space-quarter-x;
  display:inline-flex;
}

// NOTE: type examples in this file are for testing and development purposes only
.cdr-text-dev {
  &--italic {
    @include tokens.cdr-text-italic;
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    color: inherit;
    font-family: inherit;
  }

  &--strong {
    @include tokens.cdr-text-strong;
    font-size: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    color: inherit;
    font-family: inherit;
  }

  &--body {
    &-300 { @include tokens.cdr-text-body-300; }
    &-400 { @include tokens.cdr-text-body-400; }
    &-500 { @include tokens.cdr-text-body-500; }
    &-strong {
      &-300 { @include tokens.cdr-text-body-strong-300; }
      &-400 { @include tokens.cdr-text-body-strong-400; }
      &-500 { @include tokens.cdr-text-body-strong-500; }
    }
  }
  &--utility {
    &-sans {
      &-100 { @include tokens.cdr-text-utility-sans-100; }
      &-200 { @include tokens.cdr-text-utility-sans-200; }
      &-300 { @include tokens.cdr-text-utility-sans-300; }
      &-400 { @include tokens.cdr-text-utility-sans-400; }
      &-500 { @include tokens.cdr-text-utility-sans-500; }
      &-600 { @include tokens.cdr-text-utility-sans-600; }
      &-700 { @include tokens.cdr-text-utility-sans-700; }
      &-800 { @include tokens.cdr-text-utility-sans-800; }

      &-strong {
        &-100 { @include tokens.cdr-text-utility-sans-strong-100; }
        &-200 { @include tokens.cdr-text-utility-sans-strong-200; }
        &-300 { @include tokens.cdr-text-utility-sans-strong-300; }
        &-400 { @include tokens.cdr-text-utility-sans-strong-400; }
        &-500 { @include tokens.cdr-text-utility-sans-strong-500; }
        &-600 { @include tokens.cdr-text-utility-sans-strong-600; }
        &-700 { @include tokens.cdr-text-utility-sans-strong-700; }
        &-800 { @include tokens.cdr-text-utility-sans-strong-800; }
      }
    }
    &-serif {
      &-200 { @include tokens.cdr-text-utility-serif-200; }
      &-300 { @include tokens.cdr-text-utility-serif-300; }
      &-400 { @include tokens.cdr-text-utility-serif-400; }
      &-500 { @include tokens.cdr-text-utility-serif-500; }
      &-600 { @include tokens.cdr-text-utility-serif-600; }
      &-700 { @include tokens.cdr-text-utility-serif-700; }
      &-800 { @include tokens.cdr-text-utility-serif-800; }

      &-strong {
        &-200 { @include tokens.cdr-text-utility-serif-strong-200; }
        &-300 { @include tokens.cdr-text-utility-serif-strong-300; }
        &-400 { @include tokens.cdr-text-utility-serif-strong-400; }
        &-500 { @include tokens.cdr-text-utility-serif-strong-500; }
        &-600 { @include tokens.cdr-text-utility-serif-strong-600; }
        &-700 { @include tokens.cdr-text-utility-serif-strong-700; }
        &-800 { @include tokens.cdr-text-utility-serif-strong-800; }
      }
    }
  }

  &--citation {
    @include tokens.cdr-text-utility-sans-strong-100;
  }

  &--eyebrow-100 {
    @include tokens.cdr-text-eyebrow-100;
  }

  &--heading {
    &-display {
      &-800 { @include tokens.cdr-text-heading-display-800; }
      &-900 { @include tokens.cdr-text-heading-display-900; }
      &-1000 { @include tokens.cdr-text-heading-display-1000; }
      &-1100 { @include tokens.cdr-text-heading-display-1100; }
      &-1200 { @include tokens.cdr-text-heading-display-1200; }
      &-1300 { @include tokens.cdr-text-heading-display-1300; }
      &-1400 { @include tokens.cdr-text-heading-display-1400; }
      &-1500 { @include tokens.cdr-text-heading-display-1500; }
      &-1600 { @include tokens.cdr-text-heading-display-1600; }
    }
    &-sans {
      &-200 { @include tokens.cdr-text-heading-sans-200; }
      &-300 { @include tokens.cdr-text-heading-sans-300; }
      &-400 { @include tokens.cdr-text-heading-sans-400; }
      &-500 { @include tokens.cdr-text-heading-sans-500; }
      &-600 { @include tokens.cdr-text-heading-sans-600; }
    }
    &-serif {
      &-200 { @include tokens.cdr-text-heading-serif-200; }
      &-300 { @include tokens.cdr-text-heading-serif-300; }
      &-400 { @include tokens.cdr-text-heading-serif-400; }
      &-500 { @include tokens.cdr-text-heading-serif-500; }
      &-600 { @include tokens.cdr-text-heading-serif-600; }
      &-700 { @include tokens.cdr-text-heading-serif-700; }
      &-800 { @include tokens.cdr-text-heading-serif-800; }
      &-900 { @include tokens.cdr-text-heading-serif-900; }
      &-1000 { @include tokens.cdr-text-heading-serif-1000; }
      &-1100 { @include tokens.cdr-text-heading-serif-1100; }
      &-1200 { @include tokens.cdr-text-heading-serif-1200; }
      &-strong {
        &-600 { @include tokens.cdr-text-heading-serif-strong-600; }
        &-700 { @include tokens.cdr-text-heading-serif-strong-700; }
        &-800 { @include tokens.cdr-text-heading-serif-strong-800; }
        &-900 { @include tokens.cdr-text-heading-serif-strong-900; }
        &-1000 { @include tokens.cdr-text-heading-serif-strong-1000; }
        &-1100 { @include tokens.cdr-text-heading-serif-strong-1100; }
        &-1200 { @include tokens.cdr-text-heading-serif-strong-1200; }
      }
    }
  }

  &--subheading {
    &-sans {
      &-300 { @include tokens.cdr-text-subheading-sans-300; }
      &-400 { @include tokens.cdr-text-subheading-sans-400; }
      &-500 { @include tokens.cdr-text-subheading-sans-500; }
      &-600 { @include tokens.cdr-text-subheading-sans-600; }
    }
  }

  @include tokens.cdr-xs-mq-only {
    &--heading {
      &-sans {
        &-200\@xs { @include tokens.cdr-text-heading-sans-200; }
        &-300\@xs { @include tokens.cdr-text-heading-sans-300; }
        &-400\@xs { @include tokens.cdr-text-heading-sans-400; }
        &-500\@xs { @include tokens.cdr-text-heading-sans-500; }
        &-600\@xs { @include tokens.cdr-text-heading-sans-600; }
      }
      &-serif {
        &-200\@xs { @include tokens.cdr-text-heading-serif-200; }
        &-300\@xs { @include tokens.cdr-text-heading-serif-300; }
        &-400\@xs { @include tokens.cdr-text-heading-serif-400; }
        &-500\@xs { @include tokens.cdr-text-heading-serif-500; }
        &-600\@xs { @include tokens.cdr-text-heading-serif-600; }
        &-700\@xs { @include tokens.cdr-text-heading-serif-700; }
        &-800\@xs { @include tokens.cdr-text-heading-serif-800; }
        &-900\@xs { @include tokens.cdr-text-heading-serif-900; }
        &-1000\@xs { @include tokens.cdr-text-heading-serif-1000; }
        &-1100\@xs { @include tokens.cdr-text-heading-serif-1100; }
        &-1200\@xs { @include tokens.cdr-text-heading-serif-1200; }
        &-strong {
          &-600\@xs { @include tokens.cdr-text-heading-serif-strong-600; }
          &-700\@xs { @include tokens.cdr-text-heading-serif-strong-700; }
          &-800\@xs { @include tokens.cdr-text-heading-serif-strong-800; }
          &-900\@xs { @include tokens.cdr-text-heading-serif-strong-900; }
          &-1000\@xs { @include tokens.cdr-text-heading-serif-strong-1000; }
          &-1100\@xs { @include tokens.cdr-text-heading-serif-strong-1100; }
          &-1200\@xs { @include tokens.cdr-text-heading-serif-strong-1200; }
        }
      }
    }

    &--subheading {
      &-sans {
        &-300\@xs { @include tokens.cdr-text-subheading-sans-300; }
        &-400\@xs { @include tokens.cdr-text-subheading-sans-400; }
        &-500\@xs { @include tokens.cdr-text-subheading-sans-500; }
        &-600\@xs { @include tokens.cdr-text-subheading-sans-600; }
      }
    }
  }

  @include tokens.cdr-sm-mq-only {
    &--heading {
      &-sans {
        &-200\@sm { @include tokens.cdr-text-heading-sans-200; }
        &-300\@sm { @include tokens.cdr-text-heading-sans-300; }
        &-400\@sm { @include tokens.cdr-text-heading-sans-400; }
        &-500\@sm { @include tokens.cdr-text-heading-sans-500; }
        &-600\@sm { @include tokens.cdr-text-heading-sans-600; }
      }
      &-serif {
        &-200\@sm { @include tokens.cdr-text-heading-serif-200; }
        &-300\@sm { @include tokens.cdr-text-heading-serif-300; }
        &-400\@sm { @include tokens.cdr-text-heading-serif-400; }
        &-500\@sm { @include tokens.cdr-text-heading-serif-500; }
        &-600\@sm { @include tokens.cdr-text-heading-serif-600; }
        &-700\@sm { @include tokens.cdr-text-heading-serif-700; }
        &-800\@sm { @include tokens.cdr-text-heading-serif-800; }
        &-900\@sm { @include tokens.cdr-text-heading-serif-900; }
        &-1000\@sm { @include tokens.cdr-text-heading-serif-1000; }
        &-1100\@sm { @include tokens.cdr-text-heading-serif-1100; }
        &-1200\@sm { @include tokens.cdr-text-heading-serif-1200; }
        &-strong {
          &-600\@sm { @include tokens.cdr-text-heading-serif-strong-600; }
          &-700\@sm { @include tokens.cdr-text-heading-serif-strong-700; }
          &-800\@sm { @include tokens.cdr-text-heading-serif-strong-800; }
          &-900\@sm { @include tokens.cdr-text-heading-serif-strong-900; }
          &-1000\@sm { @include tokens.cdr-text-heading-serif-strong-1000; }
          &-1100\@sm { @include tokens.cdr-text-heading-serif-strong-1100; }
          &-1200\@sm { @include tokens.cdr-text-heading-serif-strong-1200; }
        }
      }
    }

    &--subheading {
      &-sans {
        &-300\@sm { @include tokens.cdr-text-subheading-sans-300; }
        &-400\@sm { @include tokens.cdr-text-subheading-sans-400; }
        &-500\@sm { @include tokens.cdr-text-subheading-sans-500; }
        &-600\@sm { @include tokens.cdr-text-subheading-sans-600; }
      }
    }
  }

  @include tokens.cdr-md-mq-only {
    &--heading {
      &-sans {
        &-200\@md { @include tokens.cdr-text-heading-sans-200; }
        &-300\@md { @include tokens.cdr-text-heading-sans-300; }
        &-400\@md { @include tokens.cdr-text-heading-sans-400; }
        &-500\@md { @include tokens.cdr-text-heading-sans-500; }
        &-600\@md { @include tokens.cdr-text-heading-sans-600; }
      }
      &-serif {
        &-200\@md { @include tokens.cdr-text-heading-serif-200; }
        &-300\@md { @include tokens.cdr-text-heading-serif-300; }
        &-400\@md { @include tokens.cdr-text-heading-serif-400; }
        &-500\@md { @include tokens.cdr-text-heading-serif-500; }
        &-600\@md { @include tokens.cdr-text-heading-serif-600; }
        &-700\@md { @include tokens.cdr-text-heading-serif-700; }
        &-800\@md { @include tokens.cdr-text-heading-serif-800; }
        &-900\@md { @include tokens.cdr-text-heading-serif-900; }
        &-1000\@md { @include tokens.cdr-text-heading-serif-1000; }
        &-1100\@md { @include tokens.cdr-text-heading-serif-1100; }
        &-1200\@md { @include tokens.cdr-text-heading-serif-1200; }
        &-strong {
          &-600\@md { @include tokens.cdr-text-heading-serif-strong-600; }
          &-700\@md { @include tokens.cdr-text-heading-serif-strong-700; }
          &-800\@md { @include tokens.cdr-text-heading-serif-strong-800; }
          &-900\@md { @include tokens.cdr-text-heading-serif-strong-900; }
          &-1000\@md { @include tokens.cdr-text-heading-serif-strong-1000; }
          &-1100\@md { @include tokens.cdr-text-heading-serif-strong-1100; }
          &-1200\@md { @include tokens.cdr-text-heading-serif-strong-1200; }
        }
      }
    }

    &--subheading {
      &-sans {
        &-300\@md { @include tokens.cdr-text-subheading-sans-300; }
        &-400\@md { @include tokens.cdr-text-subheading-sans-400; }
        &-500\@md { @include tokens.cdr-text-subheading-sans-500; }
        &-600\@md { @include tokens.cdr-text-subheading-sans-600; }
      }
    }
  }

  @include tokens.cdr-lg-mq-only {
    &--heading {
      &-sans {
        &-200\@lg { @include tokens.cdr-text-heading-sans-200; }
        &-300\@lg { @include tokens.cdr-text-heading-sans-300; }
        &-400\@lg { @include tokens.cdr-text-heading-sans-400; }
        &-500\@lg { @include tokens.cdr-text-heading-sans-500; }
        &-600\@lg { @include tokens.cdr-text-heading-sans-600; }
      }
      &-serif {
        &-200\@lg { @include tokens.cdr-text-heading-serif-200; }
        &-300\@lg { @include tokens.cdr-text-heading-serif-300; }
        &-400\@lg { @include tokens.cdr-text-heading-serif-400; }
        &-500\@lg { @include tokens.cdr-text-heading-serif-500; }
        &-600\@lg { @include tokens.cdr-text-heading-serif-600; }
        &-700\@lg { @include tokens.cdr-text-heading-serif-700; }
        &-800\@lg { @include tokens.cdr-text-heading-serif-800; }
        &-900\@lg { @include tokens.cdr-text-heading-serif-900; }
        &-1000\@lg { @include tokens.cdr-text-heading-serif-1000; }
        &-1100\@lg { @include tokens.cdr-text-heading-serif-1100; }
        &-1200\@lg { @include tokens.cdr-text-heading-serif-1200; }
        &-strong {
          &-600\@lg { @include tokens.cdr-text-heading-serif-strong-600; }
          &-700\@lg { @include tokens.cdr-text-heading-serif-strong-700; }
          &-800\@lg { @include tokens.cdr-text-heading-serif-strong-800; }
          &-900\@lg { @include tokens.cdr-text-heading-serif-strong-900; }
          &-1000\@lg { @include tokens.cdr-text-heading-serif-strong-1000; }
          &-1100\@lg { @include tokens.cdr-text-heading-serif-strong-1100; }
          &-1200\@lg { @include tokens.cdr-text-heading-serif-strong-1200; }
        }
      }
    }

    &--subheading {
      &-sans {
        &-300\@lg { @include tokens.cdr-text-subheading-sans-300; }
        &-400\@lg { @include tokens.cdr-text-subheading-sans-400; }
        &-500\@lg { @include tokens.cdr-text-subheading-sans-500; }
        &-600\@lg { @include tokens.cdr-text-subheading-sans-600; }
      }
    }
  }
}

</style>
