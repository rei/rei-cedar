import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrPagination from '../CdrPagination.vue';

function makePages(total, startingAt = 0) {
  const arg = 'page';
  const adjuster = startingAt > 0 ? startingAt : 0;
  const result = [];
  const arr = Array(total).fill().map((_, i) => i + adjuster + 1);
  arr.forEach((n) => {
    const obj = {};
    obj.page = n;
    obj.url = `?${arg}=${n}`;
    result.push(obj);
  });
  return result;
}

function getPageNumArray(input) {
  return input.map((x) => {
    return x === '&hellip;' ? '...' : x.page;
  });
}

function getPrevNextPages(p) {
  if (p === 1 || p === 10) {
    return 2;
  }
  return 3;
}

describe('CdrPagination', () => {
  it('renders correctly', async () => {
    const wrapper = mount(CdrPagination, {
      propsData: {
        id: 'test',
        pages: makePages(20),
        modelValue: 1,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders button pagination correctly', async () => {
    const wrapper = mount(CdrPagination, {
      propsData: {
        id: 'test',
        pages: makePages(20),
        modelValue: 1,
        linkTag: 'button',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a wrapping nav element for a11y', () => {
    const wrapper = mount(CdrPagination, {
      propsData: {
        id: 'test',
        pages: makePages(20),
        modelValue: 1,
      },
    });
    expect(wrapper.element.tagName).toBe('NAV');
  });

  it('sets default pagination aria-label', () => {
    const wrapper = mount(CdrPagination, {
      propsData: {
        id: 'test',
        pages: makePages(20),
        modelValue: 1,
      },
    });
    expect(wrapper.attributes('aria-label')).toBe('Pagination');
  });

  it('allows for aria-label override', () => {
    const wrapper = mount(CdrPagination, {
      propsData: {
        id: 'test',
        pages: makePages(20),
        modelValue: 1,
        forLabel: 'Pagination for reviews'
      },
    });
    expect(wrapper.attributes('aria-label')).toBe('Pagination for reviews');
  });

  it('can render buttons instead of links', () => {
    const wrapper = mount(CdrPagination, {
      propsData: {
        id: 'test',
        pages: makePages(20),
        modelValue: 1,
        linkTag: 'button',
      },
    });
    expect(wrapper.findAll('li a').length).toBe(0);
    expect(wrapper.findAll('li button').length).toBe(7);
  });

  it('sorts 20 pages correctly', async () => {
    const wrapper = mount(CdrPagination, {
      propsData: {
        id: 'test',
        pages: makePages(20),
        modelValue: 1,
      },
    });
    let prev = wrapper.find('a .cdr-pagination_caret--prev');
    let next = wrapper.find('a .cdr-pagination_caret--next');

    expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1,2,3,4,5,'...',20]);
    expect(prev.exists()).toBeFalsy();
    expect(next.exists()).toBeTruthy();

    wrapper.setProps({ modelValue: 4 });
    await wrapper.vm.$nextTick();
    expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1,2,3,4,5,'...',20]);
    prev = wrapper.find('a .cdr-pagination_caret--prev');
    next = wrapper.find('a .cdr-pagination_caret--next');
    expect(prev.exists()).toBeTruthy();
    expect(next.exists()).toBeTruthy();

    wrapper.setProps({ modelValue: 20 });
    await wrapper.vm.$nextTick();
    expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1,'...',16,17,18,19,20]);
    prev = wrapper.find('a .cdr-pagination_caret--prev');
    next = wrapper.find('a .cdr-pagination_caret--next');
    expect(prev.exists()).toBeTruthy();
    expect(next.exists()).toBeFalsy();

    wrapper.setProps({ modelValue: 17 });
    await wrapper.vm.$nextTick();
    expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1,'...',16,17,18,19,20]);
    prev = wrapper.find('a .cdr-pagination_caret--prev');
    next = wrapper.find('a .cdr-pagination_caret--next');
    expect(prev.exists()).toBeTruthy();
    expect(next.exists()).toBeTruthy();
  });

  it('sorts 5 pages correctly', async () => {
    const wrapper = mount(CdrPagination, {
      propsData: {
        id: 'test',
        pages: makePages(5),
        modelValue: 1,
      },
    });
    let prev = wrapper.find('a .cdr-pagination_caret--prev');
    let next = wrapper.find('a .cdr-pagination_caret--next');
    expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1,2,3,4,5]);
    expect(prev.exists()).toBeFalsy();
    expect(next.exists()).toBeTruthy();

    wrapper.setProps({ modelValue: 4 });
    await wrapper.vm.$nextTick();
    expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1,2,3,4,5]);
    prev = wrapper.find('a .cdr-pagination_caret--prev');
    next = wrapper.find('a .cdr-pagination_caret--next');
    expect(prev.exists()).toBeTruthy();
    expect(next.exists()).toBeTruthy();

    wrapper.setProps({ modelValue: 5 });
    await wrapper.vm.$nextTick();
    expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1,2,3,4,5]);
    prev = wrapper.find('a .cdr-pagination_caret--prev');
    next = wrapper.find('a .cdr-pagination_caret--next');
    expect(prev.exists()).toBeTruthy();
    expect(next.exists()).toBeFalsy();
  });

  it('sorts prev/next only pages correctly', () => {
    const wrapper = mount(CdrPagination, {
      propsData: {
        id: 'test',
        pages: makePages(getPrevNextPages(5), 3),
        modelValue: 5,
      },
    });

    expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([4, 5, 6]);
    let prev = wrapper.find('a .cdr-pagination_caret--prev');
    let next = wrapper.find('a .cdr-pagination_caret--next');
    expect(prev.exists()).toBeTruthy();
    expect(next.exists()).toBeTruthy();
  });

  it('shows next and disabled prev when at first page', () => {
    const wrapper = mount(CdrPagination, {
      propsData: {
        id: 'test',
        pages: makePages(getPrevNextPages(1), -1),
        modelValue: 1,
      },
    });

    expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1, 2]);
    const prev = wrapper.find('a .cdr-pagination_caret--prev');
    const next = wrapper.find('a .cdr-pagination_caret--next');
    const disabledPrev = wrapper.find('li');
    expect(disabledPrev.attributes('aria-hidden')).toBe('true');
    expect(prev.exists()).toBeFalsy();
    expect(next.exists()).toBeTruthy();
  });

  it('shows prev and disabled next link when at last page', () => {
    const wrapper = mount(CdrPagination, {
      propsData: {
        id: 'test',
        pages: makePages(getPrevNextPages(10), 8),
        modelValue: 10,
      },
    });

    expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([9, 10]);
    const prev = wrapper.find('a .cdr-pagination_caret--prev');
    const next = wrapper.find('a .cdr-pagination_caret--next');
    const allLinks = wrapper.findAll('li');
    const disabledNext = allLinks[allLinks.length-1];
    expect(disabledNext.attributes('aria-hidden')).toBe('true');
    expect(prev.exists()).toBeTruthy();
    expect(next.exists()).toBeFalsy();
  });

  it('pagination emits events with correct values', async () => {
    const wrapper = mount(CdrPagination, {
      propsData: {
        id: 'test',
        pages: makePages(20),
        modelValue: 5,
      },
      // TODO: uhhh what?
      attrs: {
        'onUpdate:modelValue': async (newVal) => { // simulate v-model update
          wrapper.setProps({ modelValue: newVal });
          await wrapper.vm.$nextTick();
        }
      }
    });
    let next = wrapper.find('a .cdr-pagination_caret--next');
    let prev = wrapper.find('a .cdr-pagination_caret--prev');

    // next clicks
    next.trigger('click'); // 5 -> 6
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().navigate[0][0]).toBe(6);
    expect(wrapper.emitted().navigate[0][1]).toBe('?page=6');
    expect(wrapper.emitted().navigate[0][2] instanceof Event).toBeTruthy();
    next.trigger('click'); // 6 -> 7
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().navigate[1][0]).toBe(7);
    expect(wrapper.emitted().navigate[1][1]).toBe('?page=7');
    expect(wrapper.emitted().navigate[1][2] instanceof Event).toBeTruthy();

    // previous clicks
    prev.trigger('click'); // 7 -> 6
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().navigate[2][0]).toBe(6);
    expect(wrapper.emitted().navigate[2][1]).toBe('?page=6');
    expect(wrapper.emitted().navigate[2][2] instanceof Event).toBeTruthy();
    prev.trigger('click'); // 6 -> 5
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().navigate[3][0]).toBe(5);
    expect(wrapper.emitted().navigate[3][1]).toBe('?page=5');
    expect(wrapper.emitted().navigate[3][2] instanceof Event).toBeTruthy();

    // individual links
    let link = wrapper.findAll('ol > li > a')[1];
    link.trigger('click'); // 5 -> 1
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().navigate[4][0]).toBe(1);
    expect(wrapper.emitted().navigate[4][1]).toBe('?page=1');
    expect(wrapper.emitted().navigate[4][2] instanceof Event).toBeTruthy();

    let link2 = wrapper.findAll('ol > li > a')[1];
    link2.trigger('click'); // 1 -> 2
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().navigate[5][0]).toBe(2);
    expect(wrapper.emitted().navigate[5][1]).toBe('?page=2');
    expect(wrapper.emitted().navigate[5][2] instanceof Event).toBeTruthy();
    
    // Do nothing when clicking current page link
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype,'offsetHeight');
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
    
    //Ensure link is visible
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 10,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { 
      configurable: true, value: 10 
    });
    link2.trigger('click'); // 2 -> 2
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().navigate[6]).toBeUndefined();
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
    await wrapper.vm.$nextTick();

    //The event should be emitted when the link is not visible (simulated click after making a selection)
    link2.trigger('click'); // 2 -> 2
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().navigate[6][0]).toBe(2);
    expect(wrapper.emitted().navigate[6][1]).toBe('?page=2');
    expect(wrapper.emitted().navigate[6][2] instanceof Event).toBeTruthy();

    //Options select
    const options = wrapper.findAll('option')
    await options[2].setSelected();  // 2 -> 3
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().navigate[7][0]).toBe(3);
    expect(wrapper.emitted().navigate[7][1]).toBe('?page=3');
    expect(wrapper.emitted().navigate[7][2] instanceof Event).toBeTruthy();
  });

  it('adds "of x" when a total is provided', async () => {
    const wrapper = mount(CdrPagination, {
      propsData: {
        id: 'test',
        pages: makePages(20),
        modelValue: 1,
      },
    });
    let option = wrapper.find('option');
    expect(option.text()).toBe('Page 1');

    wrapper.setProps({ totalPages: 20 });
    await wrapper.vm.$nextTick();
    option = wrapper.find('option');
    expect(option.text()).toBe('Page 1 of 20');
  });
});
