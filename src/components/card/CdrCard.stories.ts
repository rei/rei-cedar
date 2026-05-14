import type { Meta, StoryObj } from '@storybook/vue3';
import CdrCard from './CdrCard.vue';
import CdrButton from '../button/CdrButton.vue';
import CdrLink from '../link/CdrLink.vue';
import CdrText from '../text/CdrText.vue';

const meta: Meta<typeof CdrCard> = {
  title: 'Components/Card',
  component: CdrCard,
  tags: ['autodocs'],
  args: {
    tag: 'article',
  },
};

export default meta;
type Story = StoryObj<typeof CdrCard>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrCard, CdrText },
    setup() {
      return { args };
    },
    template: `
      <CdrCard v-bind="args" style="max-width: 300px; padding: 16px;">
        <CdrText>
          <h3>Card Title</h3>
          <p>This is some card content that describes the item or provides additional context.</p>
        </CdrText>
      </CdrCard>
    `,
  }),
};

export const ProductCard: Story = {
  render: () => ({
    components: { CdrCard, CdrButton, CdrLink, CdrText },
    template: `
      <CdrCard style="max-width: 280px;">
        <div style="aspect-ratio: 1; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
          <span style="color: #666;">Product Image</span>
        </div>
        <div style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone">
              <h3 style="margin: 0 0 8px 0;">Trail Running Shoes</h3>
            </CdrLink>
            <p style="color: #666; margin: 0 0 8px 0;">Lightweight and durable for all terrains</p>
            <p style="font-weight: bold; margin: 0 0 16px 0;">$129.99</p>
          </CdrText>
          <CdrButton full-width>Add to Cart</CdrButton>
        </div>
      </CdrCard>
    `,
  }),
};

export const ArticleCard: Story = {
  render: () => ({
    components: { CdrCard, CdrLink, CdrText },
    template: `
      <CdrCard style="max-width: 350px;">
        <div style="aspect-ratio: 16/9; background: linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%); display: flex; align-items: center; justify-content: center;">
          <span style="color: white;">Featured Image</span>
        </div>
        <div style="padding: 16px;">
          <CdrText>
            <span style="text-transform: uppercase; font-size: 12px; color: #666; letter-spacing: 1px;">Expert Advice</span>
            <h3 style="margin: 8px 0;">
              <CdrLink href="#">10 Tips for Your First Backpacking Trip</CdrLink>
            </h3>
            <p style="color: #666; margin: 0;">Learn essential skills and gear recommendations from our outdoor experts.</p>
          </CdrText>
        </div>
      </CdrCard>
    `,
  }),
};

export const CardGrid: Story = {
  render: () => ({
    components: { CdrCard, CdrLink, CdrText },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
        <CdrCard style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone"><h4>Camping</h4></CdrLink>
            <p style="font-size: 14px; color: #666;">Tents, sleeping bags, and more</p>
          </CdrText>
        </CdrCard>
        <CdrCard style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone"><h4>Hiking</h4></CdrLink>
            <p style="font-size: 14px; color: #666;">Boots, packs, and trail gear</p>
          </CdrText>
        </CdrCard>
        <CdrCard style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone"><h4>Climbing</h4></CdrLink>
            <p style="font-size: 14px; color: #666;">Ropes, harnesses, and hardware</p>
          </CdrText>
        </CdrCard>
        <CdrCard style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone"><h4>Cycling</h4></CdrLink>
            <p style="font-size: 14px; color: #666;">Bikes, helmets, and accessories</p>
          </CdrText>
        </CdrCard>
      </div>
    `,
  }),
};

export const InfoCard: Story = {
  render: () => ({
    components: { CdrCard, CdrText, CdrButton },
    template: `
      <CdrCard style="max-width: 400px; padding: 24px; text-align: center;">
        <CdrText>
          <div style="width: 64px; height: 64px; background: #2d5a27; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 24px;">✓</span>
          </div>
          <h3 style="margin: 0 0 8px 0;">Thank You!</h3>
          <p style="color: #666; margin: 0 0 16px 0;">Your membership has been renewed. You'll receive a confirmation email shortly.</p>
        </CdrText>
        <CdrButton modifier="secondary">View Account</CdrButton>
      </CdrCard>
    `,
  }),
};

export const AsSection: Story = {
  args: {
    tag: 'section',
  },
  render: (args) => ({
    components: { CdrCard, CdrText },
    setup() {
      return { args };
    },
    template: `
      <CdrCard v-bind="args" style="padding: 24px;">
        <CdrText>
          <h2>Section Card</h2>
          <p>This card uses a section tag instead of article, suitable for grouping related content.</p>
        </CdrText>
      </CdrCard>
    `,
  }),
};
