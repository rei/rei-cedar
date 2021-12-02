import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrBanner from 'componentdir/banner/CdrBanner';

describe('CdrBanner', () => {
  it('renders correctly', () => {
    const wrapper = mount(CdrBanner, {
      slots: {
        default: 'hey im a banner',
        'icon-left': '<div />'
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('renders a right-icon', () => {
    const wrapper = mount(CdrBanner, {
      slots: {
        default: 'hey im a banner',
        'icon-left': '<div />',
        'icon-right': '<div />',
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('renders the info-action slot', () => {
    const wrapper = mount(CdrBanner, {
      slots: {
        default: 'hey im a banner',
        'icon-left': '<div />',
        'icon-right': '<div />',
        'info-action': '<div />',
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('renders the message-body slot', () => {
    const wrapper = mount(CdrBanner, {
      slots: {
        default: 'hey im a banner',
        'icon-left': '<div />',
        'message-body': 'and I am some extra information'
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
