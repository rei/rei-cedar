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
    return x.ellip ? '...' : x.page;
  });
}

function getPrevNextPages(p) {
  if (p === 1 || p === 10) {
    return 2;
  }
  return 3;
}

async function setActivePageNumber(wrapper, number) {
  wrapper.setProps({ modelValue: number });
  await wrapper.vm.$nextTick();
}

function bothPrevAndNextLinksExist(wrapper) {
  let prev = wrapper.find('a .cdr-pagination_caret--prev');
  let next = wrapper.find('a .cdr-pagination_caret--next');
  return (prev.exists() && next.exists())
}

function onlyNextLinkExists(wrapper) {
  let prev = wrapper.find('a .cdr-pagination_caret--prev');
  let next = wrapper.find('a .cdr-pagination_caret--next');
  return (!prev.exists() && next.exists())
}

function onlyPrevLinkExists(wrapper) {
  let prev = wrapper.find('a .cdr-pagination_caret--prev');
  let next = wrapper.find('a .cdr-pagination_caret--next');
  return (prev.exists() && !next.exists())
}

describe('CdrPagination', () => {
  describe('pagination component with 20 pages', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrPagination, {
        propsData: {
          id: 'test',
          pages: makePages(20),
          modelValue: 1,
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has a wrapping nav element for a11y', () => {
      expect(wrapper.element.tagName).toBe('NAV');
    });

    it('sets default pagination aria-label', () => {
      expect(wrapper.attributes('aria-label')).toBe('Pagination');
    });

    describe('with button pagination', () => {
      beforeEach(() => {
        wrapper.setProps({ linkTag: 'button' })
      });

      it('renders correctly', async () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('has replaced anchor tags with buttons', () => {
        expect(wrapper.findAll('li a').length).toBe(0);
        expect(wrapper.findAll('li button').length).toBe(7);
      });
    });

    describe('with "forLabel" prop set', () => {
      beforeEach(() => {
        wrapper.setProps({ forLabel: 'Pagination for reviews' })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('allows for aria-label override', () => {
        expect(wrapper.attributes('aria-label')).toBe('Pagination for reviews');
      });
    });

    it('sorts the pages correctly', async () => {
      await setActivePageNumber(wrapper, 1);
      expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1, 2, 3, 4, 5, '...', 20]);
      expect(onlyNextLinkExists(wrapper)).toBe(true);

      await setActivePageNumber(wrapper, 4);
      expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1, 2, 3, 4, 5, '...', 20]);
      expect(bothPrevAndNextLinksExist(wrapper)).toBe(true);

      await setActivePageNumber(wrapper, 20);
      expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1, '...', 16, 17, 18, 19, 20]);
      expect(onlyPrevLinkExists(wrapper)).toBe(true);

      await setActivePageNumber(wrapper, 17);
      expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1, '...', 16, 17, 18, 19, 20]);
      expect(bothPrevAndNextLinksExist(wrapper)).toBe(true);
    });
  });

  describe('with 5 pages', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrPagination, {
        propsData: {
          id: 'test',
          pages: makePages(5),
          modelValue: 1,
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('sorts the pages correctly', async () => {
      await setActivePageNumber(wrapper, 1);
      expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1, 2, 3, 4, 5]);
      expect(onlyNextLinkExists(wrapper)).toBe(true)

      await setActivePageNumber(wrapper, 4);
      expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1, 2, 3, 4, 5]);
      expect(bothPrevAndNextLinksExist(wrapper)).toBe(true)

      await setActivePageNumber(wrapper, 5)
      expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1, 2, 3, 4, 5]);
      expect(onlyPrevLinkExists(wrapper)).toBe(true);
    });
  });


  describe('when the active page is in the middle', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrPagination, {
        propsData: {
          id: 'test',
          pages: makePages(getPrevNextPages(5), 3),
          modelValue: 5,
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has the expected pagination data', () => {
      expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([4, 5, 6]);
    });

    it('both previous and next links exist', () => {
      expect(bothPrevAndNextLinksExist(wrapper)).toBe(true);
    });
  });

  describe('when at first page', () => {
    let wrapper;
    let disabledPrev;
    beforeEach(() => {
      wrapper = mount(CdrPagination, {
        propsData: {
          id: 'test',
          pages: makePages(getPrevNextPages(1), -1),
          modelValue: 1,
        },
      });
      disabledPrev = wrapper.find('li');
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has the expected pagination data', () => {
      expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([1, 2]);
    });

    it('the prev link is disabled', () => {
      expect(disabledPrev.attributes('aria-hidden')).toBe('true');
    });

    it('only the next link exists', () => {
      expect(onlyNextLinkExists(wrapper)).toBe(true);
    });
  });

  describe('when on the last page', () => {
    let wrapper;
    let allLinks;
    let disabledNext;
    beforeEach(() => {
      wrapper = mount(CdrPagination, {
        propsData: {
          id: 'test',
          pages: makePages(getPrevNextPages(10), 8),
          modelValue: 10,
        },
      });
      allLinks = wrapper.findAll('li');
      disabledNext = allLinks[allLinks.length - 1];
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has the expected pagination data', () => {
      expect(getPageNumArray(wrapper.vm.paginationData)).toEqual([9, 10]);
    });

    it('the next link is disabled', () => {
      expect(disabledNext.attributes('aria-hidden')).toBe('true');
    });

    it('only the prev link exists', () => {
      expect(onlyPrevLinkExists(wrapper)).toBe(true);
    });
  });
});
