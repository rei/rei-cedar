import CdrIcon from '../CdrIcon';
export default {
  name: 'IconLocationPinFill',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...{props: this.$props, attrs: this.$attrs} }>
      {this.$slots.default}
      <path role="presentation" d="M12 2a8 8 0 018 8c0 2.81-2.428 6.713-7.284 11.698a1.006 1.006 0 01-1.432 0C6.428 16.713 4 12.811 4 10a8 8 0 018-8zm0 6.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"></path>
    </cdr-icon>)
  },
};
