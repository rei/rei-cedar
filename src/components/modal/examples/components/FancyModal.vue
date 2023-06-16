<template>
  <div>
    <cdr-button @click="modalOpened = true" aria-haspopup="dialog">Open fancy modal</cdr-button>
    <cdr-modal
      label="Become a member of REI Co-op."
      :opened="modalOpened"
      aria-describedby="description"
      overlay-class="membership-acquisition-modal--overlay-lighter"
      wrapper-class="membership-acquisition-imodal__wrapper"
      @closed="modalOpened = false"
    >
      <template #modal>
        <div class="close-button-wrapper">
          <cdr-button
            :icon-only="true"
            aria-label="Close"
            class="modal-close-button"
            @click="modalOpened = false"
          >
            <icon-x-lg />
          </cdr-button>
        </div>
        <div
          id="description"
          class="content-wrapper"
        >
          <div class="image">
            <cdr-text class="eyebrow">
              <span class="sr-only">REI Co-op Membership</span>
            </cdr-text>
          </div>
          <div
            class="content green"
            role="document"
          >
            <div class="icon">
              <cdr-tooltip id="fancy-tooltip" position="left">
                <template #trigger>
                  <membership-icon />
                </template>
                Hey look at me, I'm an absolutely positoned and transformed icon!
              </cdr-tooltip> 
            </div>
            <cdr-text
              tag="h3"
              class="cdr-text-dev--heading-serif-600"
              data-ui="signup-modal-title"
            >
              <p class="nomargin">
                You belong here.
              </p>
              <p class="nomargin">
                And out there.
              </p>
            </cdr-text>
            <p class="subheading">
              Be a part of REI Co-op, a community of 20 million people making a different type of outdoor company. Together we're sharing, exploring and protecting the place we love. For today and every day.
            </p>
            <cdr-button
              :full-width="true"
              modifier="secondary"
            >
              Explore membership benefits
            </cdr-button>
          </div>
        </div>
      </template>
    </cdr-modal>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';
import MembershipIcon from '../../../icon/comps/membership.vue';

export default {
  name: 'FancyModal',
  components: {
    ...Components,
    MembershipIcon,
},
  data() {
    return {
      modalOpened: false,
    };
  },
};
</script>
<style lang="scss">
@import "node_modules/@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss";
.membership-acquisition-imodal {
  // class to override cedar default class to allow background content more visible to user
  &--overlay-lighter {
    backdrop-filter: initial;
    background-color: rgba(26, 26, 26, 0.6);
  }
  &__wrapper {
    padding: $cdr-space-one-x;
    .close-button-wrapper {
      position: absolute;
      right: 0;
      z-index: 1;
    }
    .modal-close-button {
      fill: $cdr-color-background-label-secondary-active;
      @include cdr-sm-mq-down {
        padding-top: $cdr-space-one-x;
      }
    }
    padding: $cdr-space-one-x;

    // Target modal container and avoid full screen behaviour on smaller resolutions.
    div[role="dialog"] {
      @include cdr-sm-mq-down {
        border-radius: $cdr-radius-softer;
        max-width: 315px;
        min-height: auto;
        position: relative;
      }
    }

    .content-wrapper {
      display: flex;
      flex-direction: column;
      @include cdr-sm-mq-up {
        flex-direction: row;
      }
      .image {
        background-image: url("https://www.rei.com/assets/membership/benefits/modal/parenting/live.jpg");
        background-size: 100% auto;
        background-position: 0% 55%;
        background-repeat: no-repeat;
        border-radius: $cdr-radius-softer $cdr-radius-softer 0 0;
        height: 180px;
        @include cdr-sm-mq-up {
          flex: 0 50%;
          height: 370px;
          border-radius: $cdr-radius-softer 0 0 $cdr-radius-softer;
        }
      }
      .eyebrow {
        width: 250px;
        height: 8px;
        background: url("https://www.rei.com/assets/membership/benefits/modal/co-op-membership-logo/live.svg");
        background-repeat: no-repeat;
        background-size: 250px 8px;
        margin: $cdr-space-one-and-a-half-x;
        display: block;
        text-align: center;
        @include cdr-sm-mq-up {
          margin-top: $cdr-space-two-x;
        }
      }
      .content {
        padding: 8px;
        @include cdr-sm-mq-up {
          flex: 0 50%;
        }
      }
      .content.green {
        background-color: $cdr-color-background-brand-spruce;
        color: $cdr-color-background-label-secondary-active;
        padding: $cdr-space-one-x;
        border-radius: 0 0 $cdr-radius-softer $cdr-radius-softer;
        button {
          text-align: center;
        }
        @include cdr-sm-mq-up {
          border-radius: 0 $cdr-radius-softer $cdr-radius-softer 0;
          padding: $cdr-space-two-x $cdr-space-one-and-a-half-x;
          position: relative;
        }
        .subheading {
          @include cdr-text-body-300;
          margin-top: $cdr-space-one-x;
          margin-bottom: $cdr-space-one-x;
        }
      }
      .nomargin {
        margin: 0;
      }
    }
  }
}
.sr-only{
  @include cdr-display-sr-only;
}
.icon {
  position: absolute;
  left: 75%;
  top: 12%;
  svg {
    transform: rotate(-18deg) scale(2);
  }
}
</style>