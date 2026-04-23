import type { Meta, StoryObj } from '@storybook/vue3';
import CdrBanner from './CdrBanner.vue';
import CdrButton from '../button/CdrButton.vue';
import { statusTypeOptions } from '../../types/other';

const meta: Meta<typeof CdrBanner> = {
  title: 'Components/Banner',
  component: CdrBanner,
  tags: ['autodocs'],
  args: {
    type: 'default',
  },
  argTypes: {
    type: {
      control: 'select',
      options: statusTypeOptions,
      description: 'Sets the banner type',
      table: {
        type: { summary: statusTypeOptions.join(' | ') },
        defaultValue: { summary: 'default' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CdrBanner>;

export const Default: Story = {
  args: {
    type: 'default',
  },
  render: (args) => ({
    components: { CdrBanner },
    setup() {
      return { args };
    },
    template: '<CdrBanner v-bind="args">This is a default banner message.</CdrBanner>',
  }),
};

export const Info: Story = {
  args: {
    type: 'info',
  },
  render: (args) => ({
    components: { CdrBanner },
    setup() {
      return { args };
    },
    template: '<CdrBanner v-bind="args">Free shipping on orders over $50.</CdrBanner>',
  }),
};

export const Warning: Story = {
  args: {
    type: 'warning',
  },
  render: (args) => ({
    components: { CdrBanner },
    setup() {
      return { args };
    },
    template: '<CdrBanner v-bind="args">Limited stock available. Order soon!</CdrBanner>',
  }),
};

export const Success: Story = {
  args: {
    type: 'success',
  },
  render: (args) => ({
    components: { CdrBanner },
    setup() {
      return { args };
    },
    template: '<CdrBanner v-bind="args">Your order has been placed successfully!</CdrBanner>',
  }),
};

export const Error: Story = {
  args: {
    type: 'error',
  },
  render: (args) => ({
    components: { CdrBanner },
    setup() {
      return { args };
    },
    template: '<CdrBanner v-bind="args">There was an error processing your request.</CdrBanner>',
  }),
};

export const AllTypes: Story = {
  render: () => ({
    components: { CdrBanner },
    template: `
      <div class="story-spacing story-spacing--vertical">
        <CdrBanner type="default">Default banner message</CdrBanner>
        <CdrBanner type="info">Informational banner message</CdrBanner>
        <CdrBanner type="warning">Warning banner message</CdrBanner>
        <CdrBanner type="success">Success banner message</CdrBanner>
        <CdrBanner type="error">Error banner message</CdrBanner>
      </div>
    `,
  }),
};

export const WithMessageBody: Story = {
  args: {
    type: 'info',
  },
  render: (args) => ({
    components: { CdrBanner },
    setup() {
      return { args };
    },
    template: `
      <CdrBanner v-bind="args">
        Important Update
        <template #message-body>
          We've updated our privacy policy. Please review the changes to understand how we handle your data.
        </template>
      </CdrBanner>
    `,
  }),
};

export const WithIconLeft: Story = {
  render: () => ({
    components: { CdrBanner },
    template: `
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Info banner with icon</p>
          <CdrBanner type="info">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </template>
            Free shipping on orders over $50
          </CdrBanner>
        </div>

        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Warning banner with icon</p>
          <CdrBanner type="warning">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </template>
            Limited stock available. Order soon!
          </CdrBanner>
        </div>

        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Success banner with icon</p>
          <CdrBanner type="success">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </template>
            Your order has been placed successfully!
          </CdrBanner>
        </div>

        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Error banner with icon</p>
          <CdrBanner type="error">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </template>
            There was an error processing your request.
          </CdrBanner>
        </div>
      </div>
    `,
  }),
};

export const WithIconRight: Story = {
  render: () => ({
    components: { CdrBanner, CdrButton },
    template: `
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Banner with close button</p>
          <CdrBanner type="success">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </template>
            This is a banner with a close button
            <template #icon-right>
              <CdrButton
                :icon-only="true"
                aria-label="Close banner"
              >
                <template #icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </template>
              </CdrButton>
            </template>
            <template #message-body>
              Your parent template should handle the close action.
            </template>
          </CdrBanner>
        </div>
      </div>
    `,
  }),
};

export const WithInfoAction: Story = {
  render: () => ({
    components: { CdrBanner },
    template: `
      <CdrBanner type="info">
        <template #icon-left>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </template>
        Banner with info-action slot
        <template #info-action>
          <button 
            aria-label="More information"
            style="background: none; border: none; cursor: pointer; padding: 4px;"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </button>
        </template>
      </CdrBanner>
    `,
  }),
};

export const MultipleSlots: Story = {
  render: () => ({
    components: { CdrBanner },
    template: `
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Banner with icon-left and message-body</p>
          <CdrBanner type="warning">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </template>
            Banner with a message body
            <template #message-body>
              This is some extra information about the message. It provides additional context 
              and details to help users understand the situation better.
            </template>
          </CdrBanner>
        </div>

        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Banner with all slots</p>
          <CdrBanner type="info">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </template>
            Complete banner with all available slots
            <template #icon-right>
              <button 
                aria-label="Close"
                style="background: none; border: none; cursor: pointer; padding: 4px;"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </template>
            <template #message-body>
              This banner demonstrates all available slots working together. 
              It has an icon on the left, a close button on the right, and this 
              additional message body for extended content.
            </template>
            <template #info-action>
              <button 
                aria-label="More information"
                style="background: none; border: none; cursor: pointer; padding: 4px;"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </button>
            </template>
          </CdrBanner>
        </div>
      </div>
    `,
  }),
};

export const UseCases: Story = {
  render: () => ({
    components: { CdrBanner },
    template: `
      <div class="story-spacing story-spacing--vertical">
        <div>
          <h3 style="margin-bottom: 8px;">Promotional Message</h3>
          <CdrBanner type="info">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM11 12H9V7h2v5zm4-3h-2v3h2V9z"/>
              </svg>
            </template>
            Get 20% off your first order with code WELCOME20
          </CdrBanner>
        </div>

        <div>
          <h3 style="margin-bottom: 8px;">System Maintenance Notice</h3>
          <CdrBanner type="warning">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </template>
            Scheduled maintenance on Sunday, 2am-4am EST
            <template #message-body>
              Our website will be unavailable during this time. We apologize for any inconvenience.
            </template>
          </CdrBanner>
        </div>

        <div>
          <h3 style="margin-bottom: 8px;">Order Confirmation</h3>
          <CdrBanner type="success">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </template>
            Your order #12345 has been confirmed!
            <template #message-body>
              You will receive a shipping confirmation email when your items are on the way.
            </template>
          </CdrBanner>
        </div>

        <div>
          <h3 style="margin-bottom: 8px;">Payment Failed</h3>
          <CdrBanner type="error">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </template>
            Unable to process payment
            <template #message-body>
              Please check your payment information and try again, or contact customer support.
            </template>
          </CdrBanner>
        </div>

        <div>
          <h3 style="margin-bottom: 8px;">Cookie Consent</h3>
          <CdrBanner type="default">
            We use cookies to improve your experience on our site
            <template #message-body>
              By continuing to browse, you agree to our use of cookies. 
              Learn more in our Privacy Policy.
            </template>
          </CdrBanner>
        </div>
      </div>
    `,
  }),
};
