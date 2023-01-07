<script>

/**
 * CdrRenderlessCard
 *
 * A headless base component intended to display a card with data.
 *
 * @props {Object} cdrCardData - Optional. An object containing data to be displayed in the card.
 * @props {Array} cdrCardslots - Optional. An array of slots to be rendered in the card.
 *
 * @emits {String} card-clicked - Emitted when the card is clicked.
 *
 * @method registerCustomEvent - Registers a custom event.
 */

import { ref } from 'vue';

export default {
  name: 'CdrRenderlessCard',
  props: {
    cdrCardData: {
      type: Object,
      required: false,
    },
    cdrCardIsLinked: {
      type: Boolean,
      required: false,
    },
    cdrCardSlots: {
      type: Array,
      required: false,
    },
  },
  emits: ['cdr-card-clicked'],
  /**
   * setup()
   *
   * Sets up the component by creating reactive props from passed in cdrCardData and setting isLinked and customEvents.
   */
  setup(props) {
    const reactiveProps = {};

    // Create reactive props from the passed in cdrCardData
    Object.keys(props.cdrCardData).forEach((key) => {
      reactiveProps[key] = ref(props.cdrCardData[key]);
    });
    // Set isLinked based on the passed in cdrCardIsLinked prop
    const isLinked = ref(props.cdrCardIsLinked);

    // Create an empty object to store custom events
    const customEvents = ref({});

    return {
      ...reactiveProps,
      isLinked,
      customEvents,
    };
  },
  methods: {
    /**
     * registerEvent()
     *
     * Registers a custom event.
     */
    registerEvent: (name, callback) => {
      this.customEvents.value[name] = callback;
    },
    /**
     * handleFocus()
     *
     * Handles focus event.
     */
    handleFocus: () => {
      // Focus event code
    },
    /**
     * handleHover()
     *
     * Handles hover event.
     */
    handleHover: () => {
      // Hover event code
    },
    /**
     * handleActive()
     *
     * Handles active event.
     */
    handleActive: () => {
      // Active event code
    },
    /**
     * handleClick()
     *
     * Handles click event.
     */
    handleClick: () => {
      this.$emit('cdr-card-clicked');
    },
    /**
     * handleCustomEvent()
     *
     * Handles custom event.
     */
    handleCustomEvent: (name) => {
      if (this.customEvents.value[name]) {
        this.customEvents.value[name]();
      }
    },
  },
};
</script>
