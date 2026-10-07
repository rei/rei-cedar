import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CdrAccordion from '../../src/components/accordion/CdrAccordion.vue';
import CdrBanner from '../../src/components/banner/CdrBanner.vue';
import CdrButton from '../../src/components/button/CdrButton.vue';
import { docsShell } from './semanticColorData';

// Video chapters: button, accordion, dynamic, workflow, outro.
// Sources: video/src/film/ComponentScenes.tsx + NarrativeScenes.DynamicScene + WorkflowScene.

const meta: Meta = {
  title: 'Semantic Color/In Practice',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        component:
          'Video method applied to real Cedar components: intent → map → contract → generated styling → states.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ButtonAction: Story = {
  name: '10 Action in a Button',
  parameters: {
    docs: {
      description: {
        story:
          'Video `button`: Add to cart is Action. Contract interaction `action`, primary scope brand. Hover/focus/active keep the same purpose. Source: src/components/button/CdrButton.tokens.ts.',
      },
    },
  },
  render: () => ({
    components: { CdrButton },
    template: `
      <div style="${docsShell}">
        <p style="font: 12px monospace; letter-spacing: 2px; color: #143528;">10 / EXAMPLE 1 · ACTION</p>
        <h2 style="font-family: Stuart, Georgia, serif; font-size: 32px; color: #143528;">An Action, built into a Button.</h2>
        <p style="color: #4c473e;">“Add to cart” moves the user forward. Its primary purpose is Action.</p>
        <div style="display: flex; gap: 12px; font: 12px monospace; margin: 12px 0;">
          <span style="background: #143528; color: #e5fd9c; padding: 6px 10px; border-radius: 6px;">01 Understand &amp; map</span>
          <span style="background: #eae7e4; padding: 6px 10px; border-radius: 6px;">02 Contract</span>
          <span style="background: #eae7e4; padding: 6px 10px; border-radius: 6px;">03 Styling</span>
          <span style="background: #eae7e4; padding: 6px 10px; border-radius: 6px;">04 States</span>
        </div>
        <div style="border: 1px solid #d7d4ce; border-radius: 12px; padding: 24px; background: #fff; display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <CdrButton modifier="primary">Add to cart</CdrButton>
          <CdrButton modifier="secondary">Save for later</CdrButton>
          <CdrButton modifier="sale">Shop sale</CdrButton>
        </div>
        <pre style="background: #143528; color: #f8f7f2; padding: 16px; border-radius: 12px; font-size: 13px; overflow: auto;">interaction: 'action'
primary.rest:    surface brand / text neutral-trace
primary.hover:   surface brand-faint / text brand
// --cdr-color-action-surface-brand</pre>
      </div>
    `,
  }),
};

export const AccordionControl: Story = {
  name: '11 Control in an Accordion',
  parameters: {
    docs: {
      description: {
        story:
          'Video `accordion`: opening content configures the interface in place, so it is Control. Frame, header, and content map separately. Source: src/components/accordion/CdrAccordion.tokens.ts.',
      },
    },
  },
  render: () => ({
    components: { CdrAccordion },
    setup() {
      const opened = ref(false);
      return { opened };
    },
    template: `
      <div style="${docsShell}">
        <p style="font: 12px monospace; letter-spacing: 2px; color: #143528;">11 / EXAMPLE 2 · CONTROL</p>
        <h2 style="font-family: Stuart, Georgia, serif; font-size: 32px; color: #143528;">A Control, built into an Accordion.</h2>
        <p style="color: #4c473e;">Reveal information in place. Frame → border · Trigger → text + icon · Content → text.</p>
        <div style="border: 1px solid #d7d4ce; border-radius: 12px; padding: 16px; background: #fff;">
          <CdrAccordion id="semantic-color-demo" label="Trail details" :opened="opened" @accordion-toggle="opened = !opened">
            <p>A little room to explore.<br />Distance: 4.8 miles · Elevation: 860 ft</p>
          </CdrAccordion>
        </div>
        <pre style="background: #143528; color: #f8f7f2; padding: 16px; border-radius: 12px; font-size: 13px; overflow: auto;">interaction: 'control'
frame.rest:   border neutral-faint
header.hover: surface neutral-faint
content.rest: text neutral-prominent</pre>
      </div>
    `,
  }),
};

export const FeedbackBanner: Story = {
  name: '12 Feedback in a Banner',
  parameters: {
    docs: {
      description: {
        story:
          'Companion to the video families chapter: Feedback communicates status. Uses the migrated CdrBanner contract scopes.',
      },
    },
  },
  render: () => ({
    components: { CdrBanner },
    template: `
      <div style="${docsShell}">
        <p style="font: 12px monospace; letter-spacing: 2px; color: #143528;">12 / FEEDBACK</p>
        <h2 style="font-family: Stuart, Georgia, serif; font-size: 32px; color: #143528;">Feedback communicates status.</h2>
        <div style="display: grid; gap: 12px; margin-top: 12px;">
          <CdrBanner type="success">Ready for the trail — success scope.</CdrBanner>
          <CdrBanner type="warning">Check sizing — warning scope.</CdrBanner>
          <CdrBanner type="error">Item unavailable — error scope.</CdrBanner>
          <CdrBanner type="info">Shipping update — info scope.</CdrBanner>
        </div>
      </div>
    `,
  }),
};

export const DynamicVariables: Story = {
  name: '13 Same intent, adaptable expression',
  parameters: {
    docs: {
      description: {
        story:
          'Video `dynamic`: variables let the same purpose adapt across modes and platforms. Values change while meaning remains. Conceptual illustration only.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="${docsShell}">
        <p style="font: 12px monospace; letter-spacing: 2px; color: #143528;">13 / DYNAMIC</p>
        <h2 style="font-family: Stuart, Georgia, serif; font-size: 32px; color: #143528;">Shared meaning, adaptable expression.</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
          <div style="border: 1px solid #d7d4ce; border-radius: 12px; padding: 16px; background: #fff;">
            <div style="font: 11px monospace; color: #143528;">SHARED INTENT</div>
            <div style="margin-top: 8px;">Your cart · 1 — Trail essentials — $89.95</div>
          </div>
          <div style="border: 1px solid #48624d; border-radius: 12px; padding: 16px; background: #143528; color: #f8f7f2;">
            <div style="font: 11px monospace; color: #e5fd9c;">ADAPTED EXPRESSION</div>
            <div style="margin-top: 8px;">Your cart · 1 — Trail essentials — $89.95</div>
          </div>
        </div>
        <p style="font: 13px monospace; color: #143528; margin-top: 12px;">color.action.surface.brand → Web · iOS · Android</p>
      </div>
    `,
  }),
};

export const MigrationSkill: Story = {
  name: '14 Migration skill',
  parameters: {
    docs: {
      description: {
        story:
          'Video `workflow`: $semantic-token-migration guides Choose → Clarify intent → Build contract → Compare. See .agents/skills/semantic-token-migration/SKILL.md.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="${docsShell}">
        <p style="font: 12px monospace; letter-spacing: 2px; color: #143528;">14 / MIGRATION SUPPORT</p>
        <h2 style="font-family: Stuart, Georgia, serif; font-size: 32px; color: #143528;">A skill to make migration easier.</h2>
        <div style="background: #143528; color: #f8f7f2; border-radius: 12px; padding: 20px; margin-top: 12px;">
          <div style="font: 12px monospace; color: #e5fd9c;">SEMANTIC TOKEN MIGRATION</div>
          <div style="font-family: Stuart, Georgia, serif; font-size: 28px; margin: 8px 0;">Make the change.<br /><span style="color: #e5fd9c;">Carry the meaning.</span></div>
          <div style="font: 14px monospace; color: #e5fd9c; border-top: 1px solid #385443; border-bottom: 1px solid #385443; padding: 12px 0;">$semantic-token-migration</div>
        </div>
        <ol style="margin-top: 12px; display: grid; gap: 8px; padding-left: 20px;">
          <li><strong>Choose a component</strong> — Begin with the component you want to migrate.</li>
          <li><strong>Clarify its intent</strong> — Choose a category and map roles and supported states.</li>
          <li><strong>Build the contract</strong> — Capture the choices, then generate the component tokens.</li>
          <li><strong>Compare the result</strong> — Inspect before/after views and test the interactions.</li>
        </ol>
        <p style="color: #746e63;">Less translation. More shared understanding.</p>
      </div>
    `,
  }),
};
