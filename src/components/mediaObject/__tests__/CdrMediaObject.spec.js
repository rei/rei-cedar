import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrMediaObject from '../CdrMediaObject.vue';

describe('CdrMediaObject', () => {
  describe('snapshot test', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrMediaObject, { props: { checked: false } });
    });
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
