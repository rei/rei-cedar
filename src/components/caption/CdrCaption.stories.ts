import type { Meta, StoryObj } from '@storybook/vue3';
import CdrCaption from './CdrCaption.vue';

const meta: Meta<typeof CdrCaption> = {
  title: 'Components/Caption',
  component: CdrCaption,
  tags: ['autodocs'],
  args: {
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. At perferendis reiciendis sapiente delectus commodi eaque sunt aperiam ex aliquam.',
    credit: 'Photo by John Doe',
  },
};

export default meta;
type Story = StoryObj<typeof CdrCaption>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrCaption },
    setup() {
      return { args };
    },
    template: '<CdrCaption v-bind="args" />',
  }),
};

export const SummaryOnly: Story = {
  render: () => ({
    components: { CdrCaption },
    template: `
      <CdrCaption 
        summary="Lorem ipsum dolor sit amet consectetur adipisicing elit. At perferendis reiciendis sapiente delectus commodi eaque sunt aperiam ex aliquam. Temporibus, veritatis laudantium molestiae accusamus asperiores odio fuga reiciendis blanditiis magni?"
      />
    `,
  }),
};

export const CreditOnly: Story = {
  render: () => ({
    components: { CdrCaption },
    template: `
      <CdrCaption credit="Photo by Jane Smith" />
    `,
  }),
};

export const InFigure: Story = {
  render: () => ({
    components: { CdrCaption },
    template: `
      <figure style="margin: 0;">
        <img 
          src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
          alt="Outdoor scene" 
          style="width: 100%; max-width: 600px; height: auto;"
        />
        <figcaption>
          <CdrCaption
            summary="A beautiful outdoor landscape showcasing the natural environment."
            credit="Photo by REI Photography Team"
          />
        </figcaption>
      </figure>
    `,
  }),
};

export const LongContent: Story = {
  render: () => ({
    components: { CdrCaption },
    template: `
      <div style="max-width: 600px;">
        <CdrCaption
          summary="Lorem ipsum dolor sit amet consectetur adipisicing elit. At perferendis reiciendis sapiente delectus commodi eaque sunt aperiam ex aliquam. Temporibus, veritatis laudantium molestiae accusamus asperiores odio fuga reiciendis blanditiis magni? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
          credit="Photo credit: Lorem ipsum dolor sit amet consectetur adipisicing"
        />
      </div>
    `,
  }),
};
