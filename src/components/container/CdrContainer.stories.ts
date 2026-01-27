import type { Meta, StoryObj } from '@storybook/vue3';
import CdrContainer from './CdrContainer.vue';

const meta: Meta<typeof CdrContainer> = {
  title: 'Components/Container',
  component: CdrContainer,
  tags: ['autodocs'],
  args: {
    tag: 'div',
    modifier: 'static',
  },
};

export default meta;
type Story = StoryObj<typeof CdrContainer>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrContainer },
    setup() {
      return { args };
    },
    template: `
      <CdrContainer v-bind="args">
        <div style="width: 100%; border: 2px dashed #999; padding: 24px; text-align: center; background: #f5f5f5;">
          Container Content
        </div>
      </CdrContainer>
    `,
  }),
};

export const Static: Story = {
  render: () => ({
    components: { CdrContainer },
    template: `
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          Static container has a maximum width and centers content.
          Resize the viewport to see how it behaves.
        </p>
        <CdrContainer modifier="static">
          <div style="width: 100%; border: 2px dashed #2c6ecb; padding: 24px; text-align: center; background: #e8f1fc;">
            Static Container
          </div>
        </CdrContainer>
      </div>
    `,
  }),
};

export const Fluid: Story = {
  render: () => ({
    components: { CdrContainer },
    template: `
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          Fluid container spans the full width with responsive padding.
          Resize the viewport to see how it behaves.
        </p>
        <CdrContainer modifier="fluid">
          <div style="width: 100%; border: 2px dashed #0a845f; padding: 24px; text-align: center; background: #e5f5f0;">
            Fluid Container
          </div>
        </CdrContainer>
      </div>
    `,
  }),
};

export const Comparison: Story = {
  render: () => ({
    components: { CdrContainer },
    template: `
      <div class="story-spacing story-spacing--vertical">
        <div>
          <h3 style="margin-bottom: 12px;">Static Container</h3>
          <CdrContainer modifier="static">
            <div style="width: 100%; border: 2px dashed #2c6ecb; padding: 24px; text-align: center; background: #e8f1fc;">
              Max width, centered
            </div>
          </CdrContainer>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px;">Fluid Container</h3>
          <CdrContainer modifier="fluid">
            <div style="width: 100%; border: 2px dashed #0a845f; padding: 24px; text-align: center; background: #e5f5f0;">
              Full width, responsive padding
            </div>
          </CdrContainer>
        </div>
      </div>
    `,
  }),
};

export const WithRealContent: Story = {
  render: () => ({
    components: { CdrContainer },
    template: `
      <CdrContainer modifier="static">
        <article style="padding: 24px 0;">
          <h1 style="margin-bottom: 16px;">Article Title</h1>
          <p style="margin-bottom: 12px;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris.
          </p>
          <p style="margin-bottom: 12px;">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </article>
      </CdrContainer>
    `,
  }),
};

export const DifferentTags: Story = {
  render: () => ({
    components: { CdrContainer },
    template: `
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As div (default)</p>
          <CdrContainer tag="div" modifier="static">
            <div style="border: 1px solid #999; padding: 16px;">Container as div</div>
          </CdrContainer>
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As section</p>
          <CdrContainer tag="section" modifier="static">
            <div style="border: 1px solid #999; padding: 16px;">Container as section</div>
          </CdrContainer>
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As main</p>
          <CdrContainer tag="main" modifier="static">
            <div style="border: 1px solid #999; padding: 16px;">Container as main</div>
          </CdrContainer>
        </div>
      </div>
    `,
  }),
};

export const NestedContainers: Story = {
  render: () => ({
    components: { CdrContainer },
    template: `
      <CdrContainer modifier="fluid">
        <div style="border: 2px dashed #999; padding: 24px; background: #f9f9f9;">
          <p style="margin-bottom: 16px;">Outer Fluid Container</p>
          <CdrContainer modifier="static">
            <div style="border: 2px dashed #2c6ecb; padding: 24px; background: #fff;">
              Inner Static Container
            </div>
          </CdrContainer>
        </div>
      </CdrContainer>
    `,
  }),
};
