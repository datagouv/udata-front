import type { Meta, StoryObj } from '@storybook/vue3';
import DataservicesSearch from './DataservicesSearch.vue';

const meta = {
  title: 'Components/DataservicesSearch',
  component: DataservicesSearch,
  args: {},
} satisfies Meta<typeof DataservicesSearch>;

export default meta;

export const DataservicesSearchExample: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataservicesSearch },
    setup() {
      return { args };
    },
    template: '<DataservicesSearch v-bind="args"/>',
  }),
  args: {},
};
