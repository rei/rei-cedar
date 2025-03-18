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
      // Check default data attribute for position
      expect(wrapper.attributes('data-position')).toBe('center-center');
      // Verify that the "container" and "content" slots are rendered properly
      const containerSlot = wrapper.find('.cdr-object-overlay__container');
      expect(containerSlot.exists()).toBe(true);
      expect(containerSlot.text()).toContain('Container Content');

      const contentSlot = wrapper.find('.cdr-object-overlay__content');
      expect(contentSlot.exists()).toBe(true);
      expect(contentSlot.text()).toContain('Overlay Content');
      // Check that content has default margin style
      expect(contentSlot.attributes('style')).toContain('--margin: var(--cdr-space-zero)');
    });

    it('matches the snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('prop handling', () => {
    it('applies the correct data attribute for each position', () => {
      const positions = [
        'top-left',
        'top-center',
        'top-right',
        'center-left',
        'center-center',
        'center-right',
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
        expect(wrapper.attributes('data-position')).toBe(position);
        wrapper.unmount();
      });
    });

    it('applies margin through CSS variables', () => {
      const wrapper = mount(CdrObjectOverlay, {
        props: { margin: 'half-x' },
        slots: {
          container: '<div>Container</div>',
          content: '<div>Content</div>',
        },
      });
      const contentEl = wrapper.find('.cdr-object-overlay__content');
      expect(contentEl.attributes('style')).toContain('--margin: var(--cdr-space-half-x)');
      wrapper.unmount();
    });

    it('applies padding through CSS variables', () => {
      const wrapper = mount(CdrObjectOverlay, {
        props: { padding: 'half-x' },
        slots: {
          container: '<div>Container</div>',
          content: '<div>Content</div>',
        },
      });
      const contentEl = wrapper.find('.cdr-object-overlay__content');
      expect(contentEl.attributes('style')).toContain('--padding: var(--cdr-space-half-x)');
      wrapper.unmount();
    });

    it('handles responsive position values', () => {
      const wrapper = mount(CdrObjectOverlay, {
        props: { 
          position: { 
            xs: 'center-center', 
            lg: 'bottom-right' 
          } 
        },
        slots: {
          container: '<div>Container</div>',
          content: '<div>Content</div>',
        },
      });
      expect(wrapper.attributes('data-position')).toBe('center-center');
      expect(wrapper.attributes('data-position-lg')).toBe('bottom-right');
      wrapper.unmount();
    });

    it('handles responsive margin values', () => {
      const wrapper = mount(CdrObjectOverlay, {
        props: { 
          margin: { 
            xs: 'zero', 
            lg: 'half-x' 
          } 
        },
        slots: {
          container: '<div>Container</div>',
          content: '<div>Content</div>',
        },
      });
      const contentEl = wrapper.find('.cdr-object-overlay__content');
      expect(contentEl.attributes('style')).toContain('--margin-xs: var(--cdr-space-zero)');
      expect(contentEl.attributes('style')).toContain('--margin-lg: var(--cdr-space-half-x)');
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

    // New tests for gradientTheme
    it('applies dark gradient theme by default when withGradient is true', () => {
      const wrapper = mount(CdrObjectOverlay, {
        props: { 
          withGradient: true,
          position: 'left-top'
        },
        slots: {
          container: '<div>Container</div>',
          content: '<div>Content</div>',
        },
      });
      expect(wrapper.attributes('data-gradient')).toBe('to-bottom');
      expect(wrapper.attributes('data-gradient-theme')).toBe('dark');
      wrapper.unmount();
    });

    it('applies light gradient theme when specified', () => {
      const wrapper = mount(CdrObjectOverlay, {
        props: { 
          withGradient: true,
          gradientTheme: 'light',
          position: 'left-top'
        },
        slots: {
          container: '<div>Container</div>',
          content: '<div>Content</div>',
        },
      });
      expect(wrapper.attributes('data-gradient')).toBe('to-bottom');
      expect(wrapper.attributes('data-gradient-theme')).toBe('light');
      wrapper.unmount();
    });

    it('applies correct gradient direction based on position with light theme', () => {
      const positionsAndDirections = [
        { position: 'left-top', direction: 'to-bottom' },
        { position: 'center-top', direction: 'to-bottom' },
        { position: 'right-top', direction: 'to-bottom' },
        { position: 'left-center', direction: 'to-right' },
        { position: 'right-center', direction: 'to-left' },
        { position: 'left-bottom', direction: 'to-top' },
        { position: 'center-bottom', direction: 'to-top' },
        { position: 'right-bottom', direction: 'to-top' },
      ];

      positionsAndDirections.forEach(({ position, direction }) => {
        const wrapper = mount(CdrObjectOverlay, {
          props: { 
            withGradient: true,
            gradientTheme: 'light',
            position
          },
          slots: {
            container: '<div>Container</div>',
            content: '<div>Content</div>',
          },
        });
        expect(wrapper.attributes('data-gradient')).toBe(direction);
        expect(wrapper.attributes('data-gradient-theme')).toBe('light');
        wrapper.unmount();
      });
    });

    it('does not apply gradient when position is center-center', () => {
      const wrapper = mount(CdrObjectOverlay, {
        props: { 
          withGradient: true,
          position: 'center-center'
        },
        slots: {
          container: '<div>Container</div>',
          content: '<div>Content</div>',
        },
      });
      expect(wrapper.attributes('data-gradient')).toBeUndefined();
      wrapper.unmount();
    });
  });
});