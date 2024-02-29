import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrCtaLead from '../CdrCtaLead.vue';

describe('CdrCtaLead', () => {
  it('renders correctly when presented with correct data', () => {
    const wrapper = mount(CdrCtaLead);
    wrapper.setProps({
      imgSrc: 'lead.jpg',
      imgAlt: 'alt',
      heading: 'Heading',
      subheading: 'Subheading',
    })
    expect(wrapper.element).toMatchSnapshot();
  });
});
