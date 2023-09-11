import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrLead from '../CdrLead.vue';

describe('CdrLead', () => {
  it('renders correctly when presented with correct data', () => {
    const wrapper = mount(CdrLead);
    wrapper.setProps({
      imgSrc: 'lead.jpg',
      imgAlt: 'alt',
      heading: 'Heading',
      subheading: 'Subheading',
    })
    expect(wrapper.element).toMatchSnapshot();
  });
});
