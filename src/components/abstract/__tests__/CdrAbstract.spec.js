import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrAbstract from '../CdrAbstract.vue';

describe('CdrAbstract', () => {
  it('renders a paragraph with its default class and slot content', () => {
    const wrapper = shallowMount(CdrAbstract, {
      slots: {
        default: 'Intro copy',
      },
    });

    expect(wrapper.element.tagName).toBe('P');
    expect(wrapper.classes()).toContain('cdr-abstract');
    expect(wrapper.text()).toBe('Intro copy');
  });

  it('uses a requested heading tag without changing class or content', () => {
    const wrapper = shallowMount(CdrAbstract, {
      props: { tag: 'h2' },
      slots: {
        default: 'Section intro',
      },
    });

    expect(wrapper.element.tagName).toBe('H2');
    expect(wrapper.classes()).toContain('cdr-abstract');
    expect(wrapper.text()).toBe('Section intro');
  });
});
