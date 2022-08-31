import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrModal from '../CdrModal.vue';

describe('CdrModal.vue', () => {
  describe('default open', ()=>{
    let wrapper;
    let elem;
    beforeEach(()=>{
      elem = document.createElement('div')
      if (document.body) {
        document.body.appendChild(elem)
      }
      wrapper = mount(CdrModal, {
        propsData: {
          opened: true,
          label: "Label is the modal title"
        },
        slots: {
          default: 'Sticky content',
        },
        attachTo: elem,
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('contains the "cdr-modal__noscroll" class', () => {
      expect(document.documentElement.classList.contains('cdr-modal__noscroll')).toBe(true);
    });

    it('handleKeyDown', async () => {
      wrapper.trigger('keydown', {
        key: 'a'
      });
      await wrapper.vm.$nextTick();
  
      wrapper.trigger('keydown', {
        key: 'Esc',
      });
      await wrapper.vm.$nextTick();
  
      wrapper.trigger('keydown', {
        key: 'Escape',
      });
      await wrapper.vm.$nextTick();
  
      expect(wrapper.emitted().closed.length).toBe(2);
    });

    // describe('after removeNoScroll has been called', ()=>{
    //   beforeEach(()=>{
    //     wrapper.vm.removeNoScroll();
    //   });

    //   it('renders correctly', () => {
    //     expect(wrapper.element).toMatchSnapshot();
    //   });

    //   it('does NOT contain the "cdr-modal__noscroll" class', () => {
    //     expect(document.documentElement.classList.contains('cdr-modal__noscroll')).toBeFalsy();
    //     expect(document.body.classList.contains('cdr-modal__noscroll')).toBeFalsy();
    //   });
    // });
  });


  describe('default closed', ()=>{
    let wrapper;
    let elem;
    beforeEach(()=>{
      elem = document.createElement('div')
      if (document.body) {
        document.body.appendChild(elem)
      }
      wrapper = mount(CdrModal, {
        propsData: {
          opened: false,
          label: "Label is the modal title"
        },
        slots: {
          default: 'Sticky content',
        },
        attachTo: elem,
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('fullscreen snapshot', ()=>{
    let wrapper;
    let elem;
    beforeEach(()=>{
      elem = document.createElement('div')
      if (document.body) {
        document.body.appendChild(elem)
      }
      wrapper = mount(CdrModal, {
        propsData: {
          opened: true,
          label: "Label is the modal title"
        },
        data() {
          return {
            fullscreen: true,
          };
        },
        slots: {
          scrollingContentSlot: 'Main content',
        },
        attachTo: elem,
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
