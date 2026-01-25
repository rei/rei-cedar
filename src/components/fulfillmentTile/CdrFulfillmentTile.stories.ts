import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CdrFulfillmentTile from './CdrFulfillmentTile.vue';
import CdrFulfillmentTileIcon from './CdrFulfillmentTileIcon.vue';
import { IconCheckFill, IconErrorFill } from '../icon';

const meta: Meta<typeof CdrFulfillmentTile> = {
  title: 'Components/FulfillmentTile',
  component: CdrFulfillmentTile,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  },
  args: {
    checked: false,
    disabled: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof CdrFulfillmentTile>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrFulfillmentTile },
    setup() {
      return { args };
    },
    template: `
      <CdrFulfillmentTile v-bind="args" class="example__tile">
        <template #header>Ship to address</template>
        <template #body>Today after 2pm</template>
        <template #footer><strong>FREE</strong> - $60 minimum</template>
      </CdrFulfillmentTile>
    `,
    styles: [
      `
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    `,
    ],
  }),
};

export const AllStates: Story = {
  render: () => ({
    components: { CdrFulfillmentTile, CdrFulfillmentTileIcon, IconCheckFill, IconErrorFill },
    template: `
      <div class="example">
        <CdrFulfillmentTile :disabled="true" class="example__tile">
          <template #header>Pick up</template>
          <template #icon-right>
            <CdrFulfillmentTileIcon>
              <IconErrorFill inherit-color />
            </CdrFulfillmentTileIcon>
          </template>
          <template #body>Not offered</template>
        </CdrFulfillmentTile>
        
        <CdrFulfillmentTile class="example__tile">
          <template #header>Ship to address</template>
          <template #body>Today after 2pm</template>
          <template #footer><strong>FREE</strong> - $60 minimum</template>
        </CdrFulfillmentTile>
        
        <CdrFulfillmentTile :checked="true" class="example__tile">
          <template #header>Another option with really long text</template>
          <template #icon-right>
            <CdrFulfillmentTileIcon type="success">
              <IconCheckFill inherit-color />
            </CdrFulfillmentTileIcon>
          </template>
          <template #footer>Footer <strong>content</strong></template>
        </CdrFulfillmentTile>
        
        <CdrFulfillmentTile :loading="true" class="example__tile">
          <template #header>Loading option</template>
        </CdrFulfillmentTile>
      </div>
    `,
    styles: [
      `
      .example {
        display: flex;
        flex-wrap: wrap;
        gap: var(--cdr-space-one-x);
      }
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    `,
    ],
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { CdrFulfillmentTile, CdrFulfillmentTileIcon, IconErrorFill },
    template: `
      <CdrFulfillmentTile :disabled="true" class="example__tile">
        <template #header>Pick up</template>
        <template #icon-right>
          <CdrFulfillmentTileIcon>
            <IconErrorFill inherit-color />
          </CdrFulfillmentTileIcon>
        </template>
        <template #body>Not offered</template>
      </CdrFulfillmentTile>
    `,
    styles: [
      `
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    `,
    ],
  }),
};

export const Checked: Story = {
  render: () => ({
    components: { CdrFulfillmentTile, CdrFulfillmentTileIcon, IconCheckFill },
    template: `
      <CdrFulfillmentTile :checked="true" class="example__tile">
        <template #header>Another option with really long text</template>
        <template #icon-right>
          <CdrFulfillmentTileIcon type="success">
            <IconCheckFill inherit-color />
          </CdrFulfillmentTileIcon>
        </template>
        <template #footer>Footer <strong>content</strong></template>
      </CdrFulfillmentTile>
    `,
    styles: [
      `
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    `,
    ],
  }),
};

export const Loading: Story = {
  render: () => ({
    components: { CdrFulfillmentTile },
    template: `
      <CdrFulfillmentTile :loading="true" class="example__tile">
        <template #header>Loading option</template>
      </CdrFulfillmentTile>
    `,
    styles: [
      `
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    `,
    ],
  }),
};

export const WithBody: Story = {
  render: () => ({
    components: { CdrFulfillmentTile },
    template: `
      <CdrFulfillmentTile class="example__tile">
        <template #header>Ship to address</template>
        <template #body>Today after 2pm</template>
        <template #footer><strong>FREE</strong> - $60 minimum</template>
      </CdrFulfillmentTile>
    `,
    styles: [
      `
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    `,
    ],
  }),
};

export const Interactive: Story = {
  render: () => ({
    components: { CdrFulfillmentTile, CdrFulfillmentTileIcon, IconCheckFill, IconErrorFill },
    setup() {
      const selected = ref('ship');
      return { selected };
    },
    template: `
      <div>
        <div class="example">
          <CdrFulfillmentTile 
            :disabled="true" 
            class="example__tile"
            @click="selected = 'pickup'"
          >
            <template #header>Pick up</template>
            <template #icon-right>
              <CdrFulfillmentTileIcon>
                <IconErrorFill inherit-color />
              </CdrFulfillmentTileIcon>
            </template>
            <template #body>Not offered</template>
          </CdrFulfillmentTile>
          
          <CdrFulfillmentTile 
            :checked="selected === 'ship'"
            class="example__tile example__tile--clickable"
            @click="selected = 'ship'"
          >
            <template #header>Ship to address</template>
            <template #icon-right v-if="selected === 'ship'">
              <CdrFulfillmentTileIcon type="success">
                <IconCheckFill inherit-color />
              </CdrFulfillmentTileIcon>
            </template>
            <template #body>Today after 2pm</template>
            <template #footer><strong>FREE</strong> - $60 minimum</template>
          </CdrFulfillmentTile>
          
          <CdrFulfillmentTile 
            :checked="selected === 'other'"
            class="example__tile example__tile--clickable"
            @click="selected = 'other'"
          >
            <template #header>Another option with really long text</template>
            <template #icon-right v-if="selected === 'other'">
              <CdrFulfillmentTileIcon type="success">
                <IconCheckFill inherit-color />
              </CdrFulfillmentTileIcon>
            </template>
            <template #footer>Footer <strong>content</strong></template>
          </CdrFulfillmentTile>
        </div>
        <p class="example__status">Selected: {{ selected }}</p>
      </div>
    `,
    styles: [
      `
      .example {
        display: flex;
        flex-wrap: wrap;
        gap: var(--cdr-space-one-x);
      }
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
      .example__tile--clickable {
        cursor: pointer;
      }
      .example__status {
        margin-top: 16px;
      }
    `,
    ],
  }),
};
