import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrObjectOverlay from '../CdrObjectOverlay.vue';

describe('CdrObjectOverlay.vue', () => {
    describe('default rendering', () => {
      let wrapper;
      let elem;
  
      beforeEach(() => {
        elem = document.createElement('div');
        document.body.appendChild(elem);
        wrapper = mount(CdrObjectOverlay, {
          props: {},
          slots: {
            container: '<div class="container-slot">Container Content</div>',
            content: '<div class="content-slot">Overlay Content</div>',
          },
          attachTo: elem,
        });
      });
  
      afterEach(() => {
        wrapper.unmount();
        elem.remove();
      });
  
      it('renders correctly with default props', () => {
        // Default tag is "div"
        expect(wrapper.element.tagName).toBe('DIV');
        // Check default classes: base class and position "center"
        expect(wrapper.classes()).toContain('cdr-object-overlay');
        expect(wrapper.classes()).toContain('cdr-object-overlay--center');
        // Verify that the inline style includes the default margin (0)
        expect(wrapper.attributes('style')).toMatch(/--cdr-object-overlay-margin:\s*0/);
        // Verify that the "container" and "content" slots are rendered properly
        const containerSlot = wrapper.find('.cdr-object-overlay__container');
        expect(containerSlot.exists()).toBe(true);
        expect(containerSlot.text()).toContain('Container Content');
  
        const contentSlot = wrapper.find('.cdr-object-overlay__content');
        expect(contentSlot.exists()).toBe(true);
        expect(contentSlot.text()).toContain('Overlay Content');
      });
  
      it('matches the snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  
    describe('prop handling', () => {
      it('applies the correct class for each custom position', () => {
        const positions = [
          'top-left',
          'top-center',
          'top-right',
          'left',
          'center',
          'right',
          'bottom-left',
          'bottom-center',
          'bottom-right',
        ];
        positions.forEach((position) => {
          const wrapper = mount(CdrObjectOverlay, {
            props: { position },
            slots: {
              container: '<div>Container</div>',
              content: '<div>Content</div>',
            },
          });
          expect(wrapper.classes()).toContain(`cdr-object-overlay--${position}`);
          wrapper.unmount();
        });
      });
  
      it('applies a custom margin through inline style', () => {
        const marginValue = '20px';
        const wrapper = mount(CdrObjectOverlay, {
          props: { margin: marginValue },
          slots: {
            container: '<div>Container</div>',
            content: '<div>Content</div>',
          },
        });
        expect(wrapper.attributes('style')).toMatch(new RegExp(`--cdr-object-overlay-margin:\\s*${marginValue}`));
        wrapper.unmount();
      });
  
      it('uses a custom HTML tag when the "tag" prop is specified', () => {
        const wrapper = mount(CdrObjectOverlay, {
          props: { tag: 'section' },
          slots: {
            container: '<div>Container</div>',
            content: '<div>Content</div>',
          },
        });
        expect(wrapper.element.tagName).toBe('SECTION');
        wrapper.unmount();
      });
    });
  });