import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import CdrAccordion from './CdrAccordion.vue';
import CdrAccordionGroup from './CdrAccordionGroup.vue';
import CdrText from '../text/CdrText.vue';
import CdrList from '../list/CdrList.vue';
import CdrLink from '../link/CdrLink.vue';
import { headingLevelOptions } from '../../types/componentOptions';

const meta = {
  title: 'Components/Accordion',
  component: CdrAccordion,
  tags: ['autodocs'],
  args: {
    id: 'accordion-1',
    level: 3,
    compact: false,
    borderAligned: false,
    contentSpacing: true,
    label: 'Accordion Label',
    opened: false,
  },
  argTypes: {
    level: {
      control: 'select',
      options: headingLevelOptions,
      description: 'Sets the heading level',
      table: {
        type: { summary: headingLevelOptions.join(' | ') },
        defaultValue: { summary: '3' },
      },
    },
  },
} satisfies Meta<typeof CdrAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'default',
    label: 'A short label',
  },
  render: (args) => ({
    components: { CdrAccordion, CdrText },
    setup() {
      const isOpen = ref(args.opened ?? false);
      watch(
        () => args.opened,
        (newVal) => {
          isOpen.value = newVal ?? false;
        },
      );
      const toggle = () => {
        isOpen.value = !isOpen.value;
      };
      return { args, isOpen, toggle };
    },
    template: `
      <CdrAccordion v-bind="args" :opened="isOpen" @accordion-toggle="toggle">
        <CdrText>
          This is some text. It's in a <strong>CdrText paragraph</strong> element as
          that's how you assign the correct font and line-height for text display on REI.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum fermentum 
          tortor posuere fermentum. Sed interdum vel urna at tempor.
        </CdrText>
      </CdrAccordion>
    `,
  }),
};

export const Compact: Story = {
  args: {
    id: 'compact',
    label: 'Compact accordion',
    compact: true,
  },
  render: (args) => ({
    components: { CdrAccordion, CdrList, CdrLink },
    setup() {
      const isOpen = ref(args.opened ?? false);
      watch(
        () => args.opened,
        (newVal) => {
          isOpen.value = newVal ?? false;
        },
      );
      const toggle = () => {
        isOpen.value = !isOpen.value;
      };
      return { args, isOpen, toggle };
    },
    template: `
      <CdrAccordion v-bind="args" :opened="isOpen" @accordion-toggle="toggle">
        <CdrList modifier="unordered">
          <li><CdrLink href="https://www.rei.com/">REI.com</CdrLink></li>
          <li><CdrLink href="https://www.rei.com/h/adventure-projects">Adventure Projects</CdrLink></li>
          <li><CdrLink href="https://www.rei.com/stewardship">Stewardship</CdrLink></li>
        </CdrList>
      </CdrAccordion>
    `,
  }),
};

export const BorderAligned: Story = {
  args: {
    id: 'border-aligned',
    label: 'Border aligned accordion',
    borderAligned: true,
  },
  render: (args) => ({
    components: { CdrAccordion },
    setup() {
      const isOpen = ref(args.opened ?? false);
      watch(
        () => args.opened,
        (newVal) => {
          isOpen.value = newVal ?? false;
        },
      );
      const toggle = () => {
        isOpen.value = !isOpen.value;
      };
      return { args, isOpen, toggle };
    },
    template: `
      <CdrAccordion v-bind="args" :opened="isOpen" @accordion-toggle="toggle">
        <p>Border aligned accordion content.</p>
      </CdrAccordion>
    `,
  }),
};

export const AccordionGroup: Story = {
  render: () => ({
    components: { CdrAccordion, CdrAccordionGroup, CdrText, CdrList },
    setup() {
      const openAccordions = ref<string[]>([]);

      const toggle = (id: string) => {
        const index = openAccordions.value.indexOf(id);
        if (index > -1) {
          openAccordions.value.splice(index, 1);
        } else {
          openAccordions.value.push(id);
        }
      };

      const isOpened = (id: string) => openAccordions.value.includes(id);

      return { toggle, isOpened };
    },
    template: `
      <CdrAccordionGroup>
        <CdrAccordion 
          id="group-1" 
          :level="3" 
          label="A short label"
          :opened="isOpened('group-1')"
          @accordion-toggle="toggle('group-1')"
        >
          <CdrText>
            This is some text. It's in a <strong>CdrText paragraph</strong> element as
            that's how you assign the correct font and line-height for text display on REI.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </CdrText>
        </CdrAccordion>
        <CdrAccordion 
          id="group-2" 
          :level="3" 
          label="Label with multiple words, so many words in fact that this content may wrap to several lines"
          :opened="isOpened('group-2')"
          @accordion-toggle="toggle('group-2')"
        >
          <CdrList modifier="unordered">
            <li>This is a cdr-list item inside an accordion.</li>
            <li>It includes no extra styling</li>
            <li>I'm adding a bunch of items</li>
            <li>to this list because</li>
            <li>I want to see what it's like</li>
            <li>when animated!</li>
          </CdrList>
        </CdrAccordion>
      </CdrAccordionGroup>
    `,
  }),
};

export const Opened: Story = {
  args: {
    id: 'opened',
    label: 'Initially open',
    opened: true,
  },
  render: (args) => ({
    components: { CdrAccordion },
    setup() {
      const isOpen = ref(args.opened);
      watch(
        () => args.opened,
        (newVal) => {
          isOpen.value = newVal ?? false;
        },
      );
      const toggle = () => {
        isOpen.value = !isOpen.value;
      };
      return { args, isOpen, toggle };
    },
    template: `
      <CdrAccordion v-bind="args" :opened="isOpen" @accordion-toggle="toggle">
        <p>This accordion starts in an open state.</p>
      </CdrAccordion>
    `,
  }),
};

export const NoContentSpacing: Story = {
  args: {
    id: 'no-spacing',
    label: 'No content spacing',
    contentSpacing: false,
  },
  render: (args) => ({
    components: { CdrAccordion, CdrText },
    setup() {
      const isOpen = ref(args.opened ?? false);
      watch(
        () => args.opened,
        (newVal) => {
          isOpen.value = newVal ?? false;
        },
      );
      const toggle = () => {
        isOpen.value = !isOpen.value;
      };
      return { args, isOpen, toggle };
    },
    template: `
      <CdrAccordion v-bind="args" :opened="isOpen" @accordion-toggle="toggle">
        <CdrText>
          This accordion has no padding around content. This is useful when you want to 
          control spacing with custom layouts or when nesting other components that provide 
          their own spacing.
        </CdrText>
      </CdrAccordion>
    `,
  }),
};

export const BorderAlignedGroup: Story = {
  render: () => ({
    components: { CdrAccordion, CdrAccordionGroup },
    setup() {
      interface AccordionItem {
        label: string;
        content: string;
        opened: boolean;
        id: string;
      }

      const grouped = ref<AccordionItem[]>([
        {
          label: 'These are border-aligned',
          content: 'These accordions will only allow one open at a time.',
          opened: false,
          id: 'linked1',
        },
        {
          label: 'And they are also linked',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula, nibh vitae luctus mattis, quam sapien tempus risus, sit amet viverra quam velit a orci.',
          opened: false,
          id: 'linked2',
        },
        {
          label: 'To close others when one is opened',
          content: 'These accordions will only allow one open at a time.',
          opened: false,
          id: 'linked3',
        },
      ]);

      const updateGroup = (index: number) => {
        const opened = grouped.value[index].opened;
        if (opened) {
          grouped.value[index].opened = false;
        } else {
          for (let i = 0; i < grouped.value.length; i++) {
            grouped.value[i].opened = index === i;
          }
        }
      };

      return { grouped, updateGroup };
    },
    template: `
      <CdrAccordionGroup>
        <CdrAccordion
          v-for="(item, index) in grouped"
          :id="item.id"
          :level="3"
          :border-aligned="true"
          :opened="item.opened"
          :key="item.id"
          @accordion-toggle="updateGroup(index)"
        >
          <template #label>{{ item.label }}</template>
          {{ item.content }}
        </CdrAccordion>
      </CdrAccordionGroup>
    `,
  }),
};

export const CompactGroup: Story = {
  render: () => ({
    components: { CdrAccordion, CdrAccordionGroup, CdrList, CdrLink },
    setup() {
      const accordion1 = ref(false);
      const accordion2 = ref(false);

      const toggle1 = () => {
        accordion1.value = !accordion1.value;
      };
      const toggle2 = () => {
        accordion2.value = !accordion2.value;
      };

      return { accordion1, accordion2, toggle1, toggle2 };
    },
    template: `
      <CdrAccordionGroup>
        <CdrAccordion
          id="compact-1"
          :level="3"
          :compact="true"
          :opened="accordion1"
          @accordion-toggle="toggle1"
        >
          <template #label>Compact</template>
          <CdrList modifier="unordered">
            <li><CdrLink href="https://www.rei.com/">REI.com</CdrLink></li>
            <li><CdrLink href="https://www.rei.com/h/adventure-projects">Adventure Projects</CdrLink></li>
            <li><CdrLink href="https://www.rei.com/stewardship">Stewardship</CdrLink></li>
          </CdrList>
        </CdrAccordion>
        <CdrAccordion
          id="compact-2"
          :level="3"
          :compact="true"
          :opened="accordion2"
          @accordion-toggle="toggle2"
        >
          <template #label>Label with multiple words, so many words in fact that this content may wrap to several lines</template>
          <CdrList tag="ol">
            <li>Item one</li>
            <li>Item two</li>
            <li>Hopefully right font size</li>
          </CdrList>
        </CdrAccordion>
      </CdrAccordionGroup>
    `,
  }),
};

export const UnwrappedGroup: Story = {
  render: () => ({
    components: { CdrAccordion, CdrAccordionGroup, CdrText, CdrList },
    setup() {
      const accordion1 = ref(true);
      const accordion2 = ref(false);

      const toggle1 = () => {
        accordion1.value = !accordion1.value;
      };
      const toggle2 = () => {
        accordion2.value = !accordion2.value;
      };

      return { accordion1, accordion2, toggle1, toggle2 };
    },
    template: `
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          This accordion group unwraps at medium and large breakpoints, 
          displaying content in an always-open state.
        </p>
        <CdrAccordionGroup unwrap="@md @lg">
          <CdrAccordion
            id="unwrap-1"
            :level="3"
            :opened="accordion1"
            @accordion-toggle="toggle1"
          >
            <template #label>A short label</template>
            <CdrText>
              This is some text. It's in a <strong>CdrText paragraph</strong> element as
              that's how you assign the correct font and line-height for text display on REI.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </CdrText>
          </CdrAccordion>
          <CdrAccordion
            id="unwrap-2"
            :level="3"
            :opened="accordion2"
            @accordion-toggle="toggle2"
          >
            <template #label>Label with multiple words, so many words in fact that this content may wrap to several lines</template>
            <CdrList modifier="unordered">
              <li>This is a cdr-list item inside an accordion.</li>
              <li>It includes no extra styling</li>
              <li>I'm adding a bunch of items</li>
              <li>to this list because</li>
              <li>I want to see what it's like</li>
              <li>when animated!</li>
            </CdrList>
          </CdrAccordion>
        </CdrAccordionGroup>
      </div>
    `,
  }),
};
