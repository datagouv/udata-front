import type { Meta, StoryObj } from '@storybook/vue3';
import { StatBox } from ".";
import { ref } from 'vue';
import { ComponentProps } from 'vue-component-type-helpers';

const meta = {
  title: 'Components/StatBox',
  component: StatBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: ""
      }
    }
  },
} satisfies Meta<typeof StatBox>;

export default meta;

const args = {
  title: "Views",
  summary: 2652,
  data: {
    "2023-09":0,
    "2023-10":0,
    "2023-11":0,
    "2023-12":0,
    "2024-01":0,
    "2024-02":183,
    "2024-03":538,
    "2024-04":316,
    "2024-05":240,
    "2024-06":228,
    "2024-07":196,
    "2024-08":800,
    "2024-09":130,
  },
  type: "line" as "line",
} satisfies ComponentProps<typeof StatBox>;

export const LineChart: StoryObj<typeof meta> = {
  render: (args: ComponentProps<typeof StatBox>) => ({
    components: { StatBox },
    setup() {
      return { args };
    },
    template: `<StatBox v-bind="args" />`,
  }),
  args,
};

export const BarChart: StoryObj<typeof meta> = {
  render: (args: ComponentProps<typeof StatBox>) => ({
    components: { StatBox },
    setup() {
      return { args };
    },
    template: `<StatBox v-bind="args" />`,
  }),
  args: { ...args, type: 'bar', summary: 24124 },
};

export const NoDataLineChart: StoryObj<typeof meta> = {
  render: (args: ComponentProps<typeof StatBox>) => ({
    components: { StatBox },
    setup() {
      return { args };
    },
    template: `<StatBox v-bind="args" />`,
  }),
  args: { ...args, type: 'line', data: {}, summary: 1.1 },
};


export const OneDataBarChart: StoryObj<typeof meta> = {
  render: (args: ComponentProps<typeof StatBox>) => ({
    components: { StatBox },
    setup() {
      return { args };
    },
    template: `<StatBox v-bind="args" />`,
  }),
  args: { ...args, type: 'bar', data: {
    "2023-09":0,
    "2023-10":0,
    "2023-11":0,
    "2023-12":0,
    "2024-01":0,
    "2024-02":1,
    "2024-03":0,
    "2024-04":0,
    "2024-05":0,
    "2024-06":0,
    "2024-07":0,
    "2024-08":0,
    "2024-09":0,
  }, summary: 1 },
};

export const ToggleChart: StoryObj<typeof meta> = {
  render: (args: ComponentProps<typeof StatBox>) => ({
    components: { StatBox },
    setup() {
      const type = ref('line');
      const toggle = () => {
        if (type.value === 'line') {
          type.value = 'bar';
        } else {
          type.value = 'line';
        }
      };
      return { args, data: args.data, type, toggle };
    },
    template: `<div><StatBox v-bind="args" :data :type /><button class="fr-btn fr-btn--sm fr-mt-2v" @click="toggle">Toggle!</button></div>`,
  }),
  args,
};
