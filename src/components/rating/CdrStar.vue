<template>
  <svg v-if="!remainder || remainder === 0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :class="cssClasses">
    <path
    d="M12.4389 17.3426L11.9688 17.0431L11.4986 17.3426L7.12363 20.1295L8.29875 14.7917L8.40726 14.2988L8.03494 13.9581L4.02151 10.2852L9.26273 9.80999L9.79622 9.76163L9.99576 9.2645L11.9688 4.34901L13.9417 9.2645L14.1413 9.76163L14.6748 9.80999L19.916 10.2852L15.9026 13.9581L15.5302 14.2988L15.6388 14.7917L16.8139 20.1295L12.4389 17.3426Z"
    fill="#FFD280"
    stroke="#BD7B2D"
    stroke-width="1.75"
    />
  </svg>
  <svg v-if="remainder === 75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.1744 17.7643L11.9729 17.6359L11.7714 17.7643L6.3805 21.1984L7.81459 14.6842L7.86109 14.4729L7.70153 14.3269L2.85265 9.88945L9.22174 9.31203L9.45038 9.29131L9.53589 9.07825L11.9729 3.00672L14.4099 9.07825L14.4954 9.29131L14.7241 9.31203L21.0931 9.88945L16.2443 14.3269L16.0847 14.4729L16.1312 14.6842L17.5653 21.1984L12.1744 17.7643Z" fill="#F9F8F6" stroke="#BD7B2D" stroke-width="0.75"/>
    <path d="M8.23125 14.3532L3.64978 10.1568L9.68773 9.60764L11.9729 3.91833L14.258 9.6103V18.7978L11.9757 17.2303L6.88225 20.5089L8.23125 14.3532Z" fill="#FFD280"/>
    <path d="M14.0201 9.18207L14.0201 19.0141" stroke="#BD7B2D" stroke-width="0.75"/>
    <path d="M14.3948 9.37474H13.9952L11.97 4.3423L9.79589 9.76077L4.01172 10.2823L8.40741 14.292L7.12052 20.1371L11.97 17.0486L13.8259 18.2204" stroke="#BD7B2D" stroke-width="1.75"/>
  </svg>
  <svg v-if="remainder === 50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.1744 17.7643L11.9729 17.6359L11.7714 17.7643L6.3805 21.1984L7.81459 14.6842L7.8611 14.473L7.70153 14.3269L2.85265 9.88945L9.22174 9.31204L9.45038 9.29131L9.53589 9.07825L11.9729 3.00672L14.4099 9.07825L14.4954 9.29131L14.7241 9.31204L21.0931 9.88945L16.2443 14.3269L16.0847 14.473L16.1312 14.6842L17.5653 21.1984L12.1744 17.7643Z" fill="#F9F8F6" stroke="#BD7B2D" stroke-width="0.75"/>
  <path d="M3.64978 10.1548L9.3118 9.65756L11.9821 3.92165V17.2275L6.88225 20.5069L8.23125 14.3512L3.64978 10.1548Z" fill="#FFD280"/>
  <path d="M11.9822 3.92163L11.9831 17.6424" stroke="#BD7B2D" stroke-width="0.75"/>
  <path d="M11.3498 5.89038L9.79225 9.76097L4.01752 10.2828L8.406 14.2935L7.12489 20.1383L12.0741 16.9881" stroke="#BD7B2D" stroke-width="1.75"/>
  <path d="M11.9208 4.59326L11.3589 6.31024" stroke="#BD7B2D"/>
</svg>
<svg v-if="remainder === 25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.1699 17.7643L11.9684 17.6359L11.767 17.7643L6.37604 21.1984L7.81014 14.6842L7.85664 14.473L7.69707 14.3269L2.8482 9.88945L9.21728 9.31204L9.44592 9.29131L9.53144 9.07825L11.9684 3.00672L14.4055 9.07825L14.491 9.29131L14.7196 9.31204L21.0887 9.88945L16.2398 14.3269L16.0803 14.473L16.1268 14.6842L17.5608 21.1984L12.1699 17.7643Z" fill="#F9F8F6" stroke="#BD7B2D" stroke-width="0.75"/>
  <path d="M3.64532 10.1547L9.30735 9.65746V18.9355L6.87779 20.5068L8.2268 14.3511L3.64532 10.1547Z" fill="#FFD280"/>
  <path d="M9.60486 8.97247L9.60551 19.1315" stroke="#BD7B2D" stroke-width="0.75"/>
  <path d="M9.44125 9.79321L4.01843 10.2804L8.40374 14.2981L7.11705 20.1342L9.78234 18.4339" stroke="#BD7B2D" stroke-width="1.75"/>
</svg>
<svg v-if="remainder === 0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.1702 17.7643L11.9688 17.6359L11.7673 17.7643L6.37635 21.1984L7.81044 14.6842L7.85695 14.473L7.69738 14.3269L2.8485 9.88945L9.21759 9.31204L9.44623 9.29131L9.53174 9.07825L11.9688 3.00672L14.4058 9.07825L14.4913 9.29131L14.7199 9.31204L21.089 9.88945L16.2401 14.3269L16.0806 14.473L16.1271 14.6842L17.5612 21.1984L12.1702 17.7643Z" fill="#F9F8F6" stroke="#BD7B2D" stroke-width="0.75"/>
</svg>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'CdrStar',
  props: {
    remainder: {
      type: String,
      default: '00',
    },
    style: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const cssClasses = computed(() => {
      const classes = ['star'];
      if (props.style) {
        classes.push(`star--${props.style}`);
      }
      return classes.join(' ');
    });

    return {
      cssClasses,
    };
  },
});
</script>

<style scoped>
.star-outer {
    fill: var(--star-outer-fill, #F9F8F6);
    stroke: var(--star-outer-stroke, #BD7B2D);
}

.star-fractional {
    fill: var(--star-fractional-fill, #FFD280);
}

/* Define other CSS classes here with CSS variables */
</style>
