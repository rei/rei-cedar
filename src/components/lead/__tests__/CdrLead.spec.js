import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrLead from '../CdrLead.vue';

describe('CdrLead', () => {
  it('renders correctly when presented with correct data', () => {
    const wrapper = mount(CdrLead, {
      slots: {
        media: '<img src="foo.jpg" alt="foo" />',
        content: '<h1>Title</h1>'
      }
    });
  
    expect(wrapper.element).toMatchSnapshot();
  });
});
