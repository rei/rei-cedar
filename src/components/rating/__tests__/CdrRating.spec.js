import { shallowMount, mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrRating from '../CdrRating.vue';

describe('CdrRating', () => {
  let wrapper;
  describe('with an href', () => {
    beforeEach(() => {
      wrapper = mount(CdrRating, {
        propsData: {
          rating: 3.2323,
          count: 100,
          href: 'rei.com'
        }
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders an anchor when given an href', () => {
      expect(wrapper.find('a.cdr-rating').exists()).toBe(true);
    });

    describe('with decimal rating and count 1', () => {
      beforeEach(() => {
        wrapper.setProps({
          rating: 3.4441231,
          count: 1,
        })
      })

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('computes and rounds rating stars correctly', async () => {
        expect(wrapper.vm.whole).toBe(3);
        expect(wrapper.vm.remainder).toBe('50');
        expect(wrapper.vm.rounded).toBe(3.5);
        expect(wrapper.vm.displayRating).toBe('3.4');
        expect(wrapper.vm.empties).toBe(1);
      });

    });

    describe('with a whole number rating', () => {
      beforeEach(() => {
        wrapper.setProps({
          rating: 3,
          count: 1,
        })
      })

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('computes and rounds rating stars correctly', async () => {
        expect(wrapper.vm.whole).toBe(3);
        expect(wrapper.vm.remainder).toBe('00');
        expect(wrapper.vm.rounded).toBe(3);
        expect(wrapper.vm.displayRating).toBe('3.0');
        expect(wrapper.vm.empties).toBe(2);
      });


      it('has correct screen reader text', () => {
        expect(wrapper.vm.srText).toBe('View the 1 reviews with an average rating of 3.0 out of 5 stars');
      })
    })

    describe('with string input', () => {
      beforeEach(() => {
        wrapper.setProps({
          rating: '3.4441231',
          count: '2',
        })
      })

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('computes and rounds rating stars correctly', async () => {
        expect(wrapper.vm.whole).toBe(3);
        expect(wrapper.vm.remainder).toBe('50');
        expect(wrapper.vm.rounded).toBe(3.5);
        expect(wrapper.vm.displayRating).toBe('3.4');
      });

      it('has correct screen reader text', () => {
        expect(wrapper.vm.srText).toBe('View the 2 reviews with an average rating of 3.4 out of 5 stars');
      })
    })

    describe('with a count of 0', ()=>{
      beforeEach(()=>{
        wrapper.setProps({ count: 0 });
      })

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('has correct screen reader text', () => {
        expect(wrapper.vm.srText).toBe('No reviews yet; be the first!');
      })

    })
  })

  describe('without an href', ()=> {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrRating, {
        propsData: {
          rating: 3
        }
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders a div when no href is present', () => {
      expect(wrapper.find('div.cdr-rating').exists()).toBe(true);
    });

    it('has the correct screen reader text', () => {
      expect(wrapper.vm.srText).toBe('Rated 3.0 out of 5 stars');
    });

    describe('with a count of 0', ()=>{
      beforeEach(()=>{
        wrapper.setProps({ count: 0 });
      })

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('has the correct screen reader text', ()=>{
        expect(wrapper.vm.srText).toBe('0 reviews');
      })
    })

    describe('with a count of 100', ()=>{
      beforeEach(()=>{
        wrapper.setProps({ count: 100 });
      })

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('has the correct screen reader text', ()=>{
        expect(wrapper.vm.srText).toBe('100 reviews with an average rating of 3.0 out of 5 stars');
      })
    })
  })
});
