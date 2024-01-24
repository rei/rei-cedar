import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrLandingLead from '../CdrLandingLead.vue';

describe('CdrLandingLead', () => {
  it('renders correctly when presented with correct data', () => {
    const wrapper = mount(CdrLandingLead);
    wrapper.setProps({
      imgSrc: 'lead.jpg',
      imgAlt: 'alt',
      heading: 'Heading',
      subheading: 'Subheading',
    })
    expect(wrapper.element).toMatchSnapshot();
  });
});
