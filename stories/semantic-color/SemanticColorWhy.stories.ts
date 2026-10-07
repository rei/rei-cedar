import type { Meta, StoryObj } from '@storybook/vue3';
import { docsShell } from './semanticColorData';

// Video chapters: intro, friction, pillars, architecture.
// Source: video/src/film/story.json + video/src/film/NarrativeScenes.tsx

const meta: Meta = {
  title: 'Semantic Color/Why Semantics',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        component:
          'Why Cedar adds a semantic color layer. Mirrors video chapters intro → friction → pillars → architecture.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const page = (inner: string) => ({
  template: `<div style="${docsShell}">${inner}</div>`,
});

export const MeaningRemains: Story = {
  name: '01 Meaning remains',
  parameters: {
    docs: {
      description: {
        story:
          'Video `intro`: design decisions should travel with their meaning. Palettes → semantics → components.',
      },
    },
  },
  render: () =>
    page(`
      <p style="font: 12px monospace; letter-spacing: 2px; color: #143528;">01 / CEDAR SEMANTIC COLOR</p>
      <h1 style="font-family: Stuart, Georgia, serif; font-size: 40px; line-height: 1.1; color: #143528; margin: 12px 0;">
        Color with intent.
      </h1>
      <p style="font-size: 18px; color: #4c473e; max-width: 640px;">
        From a palette of possibilities to components with a shared purpose.
        Every color has a job. The semantic layer makes that job visible.
      </p>
      <div style="display: flex; gap: 12px; align-items: center; font: 13px monospace; margin-top: 16px;">
        <span>PALETTES</span><span>→</span><span>SEMANTICS</span><span>→</span><span>COMPONENTS</span>
      </div>
    `),
};

export const RepeatedDecisions: Story = {
  name: '02 Cost of repeated decisions',
  parameters: {
    docs: {
      description: {
        story:
          'Video `friction`: when intent stays in conversations, every handoff restarts the conversation. Decide. Translate. Repeat.',
      },
    },
  },
  render: () =>
    page(`
      <p style="font: 12px monospace; letter-spacing: 2px; color: #143528;">02 / FRICTION</p>
      <h2 style="font-family: Stuart, Georgia, serif; font-size: 32px; color: #143528;">The same decision. Again.</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px;">
        ${['Design', 'Engineering', 'The next component']
          .map(
            (label) => `
          <div style="border: 1px solid #d7d4ce; border-radius: 12px; padding: 16px; background: #fff;">
            <div style="font: 11px monospace; letter-spacing: 1.5px; color: #143528;">${label.toUpperCase()}</div>
            <div style="width: 40px; height: 40px; background: #143528; border-radius: 8px; margin: 16px 0;"></div>
            <div style="font-size: 18px;">What does this color mean?</div>
            <div style="font: 12px monospace; color: #8e887d; margin-top: 12px;">Decide. Translate. Repeat.</div>
          </div>`,
          )
          .join('')}
      </div>
      <p style="margin-top: 16px; color: #746e63;">Codified decisions help teams spend more time solving the next problem.</p>
    `),
};

export const ThreeCapabilities: Story = {
  name: '03 Three connected capabilities',
  parameters: {
    docs: {
      description: {
        story:
          'Video `pillars`: shared semantic framework, unified design + development system, variables that adapt across platforms.',
      },
    },
  },
  render: () =>
    page(`
      <p style="font: 12px monospace; letter-spacing: 2px; color: #143528;">03 / PILLARS</p>
      <h2 style="font-family: Stuart, Georgia, serif; font-size: 32px; color: #143528;">Three capabilities. One foundation.</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px;">
        <div style="border: 1px solid #385443; background: #143528; color: #f8f7f2; border-radius: 12px; padding: 16px;">
          <div style="font: 12px monospace; color: #e5fd9c;">01</div>
          <div style="font-size: 20px; margin: 8px 0;">Semantic framework</div>
          <div style="color: #e5fd9c;">Shared language</div>
          <p style="color: #c0ccbe; font-size: 14px;">Capture what a design choice means.</p>
        </div>
        <div style="border: 1px solid #385443; background: #143528; color: #f8f7f2; border-radius: 12px; padding: 16px;">
          <div style="font: 12px monospace; color: #e5fd9c;">02</div>
          <div style="font-size: 20px; margin: 8px 0;">Unified system</div>
          <div style="color: #e5fd9c;">Connected decisions</div>
          <p style="color: #c0ccbe; font-size: 14px;">Carry the same meaning from design to code.</p>
        </div>
        <div style="border: 1px solid #385443; background: #143528; color: #f8f7f2; border-radius: 12px; padding: 16px;">
          <div style="font: 12px monospace; color: #e5fd9c;">03</div>
          <div style="font-size: 20px; margin: 8px 0;">Dynamic system</div>
          <div style="color: #e5fd9c;">Adaptable foundations</div>
          <p style="color: #c0ccbe; font-size: 14px;">Use variables across modes and platforms.</p>
        </div>
      </div>
    `),
};

export const SemanticLayer: Story = {
  name: '04 A new layer of meaning',
  parameters: {
    docs: {
      description: {
        story:
          'Video `architecture`: the semantic layer sits between primitives and components. Purpose travels even when implementation changes.',
      },
    },
  },
  render: () =>
    page(`
      <p style="font: 12px monospace; letter-spacing: 2px; color: #143528;">04 / ARCHITECTURE</p>
      <h2 style="font-family: Stuart, Georgia, serif; font-size: 32px; color: #143528;">A new layer of meaning.</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 16px; align-items: start;">
        <div>
          ${[
            'Compositions',
            'Component tokens',
            'Components',
            'Semantic layer ☆ NEW',
            'Primitives',
            'Values',
          ]
            .map(
              (label, i) => `
            <div style="
              margin: 0 auto 8px; padding: 10px; text-align: center; border-radius: 8px; font-size: 15px;
              background: ${i === 3 ? '#255f86; color: #fff' : i > 3 ? '#e7e4dc; color: #143528' : '#e2ebcf; color: #143528'};">
              ${label}
            </div>`,
            )
            .join('')}
        </div>
        <div>
          <div style="font: 11px monospace; letter-spacing: 1.5px; color: #143528;">MEANING REMAINS</div>
          <div style="font-family: Stuart, Georgia, serif; font-size: 28px; color: #143528; margin: 8px 0;">
            What are we trying to communicate?
          </div>
          <p>Design intent → Engineering intent.</p>
          <p style="color: #746e63;">Components and implementations can evolve. The purpose travels with them.</p>
        </div>
      </div>
    `),
};
