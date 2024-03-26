import type { Meta, StoryObj } from '@storybook/vue3';
import SchemaLoader from './SchemaLoader.vue';

const meta = {
  title: "Components/Resource/Internals/Schema Loader",
  component: SchemaLoader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Schema loader is shown while schema catalog are loading."
      }
    }
  },
} satisfies Meta<typeof SchemaLoader>;

export default meta;

export const SchemaActionsLoader: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { SchemaLoader },
    setup() {
      return { args };
    },
    template: '<SchemaLoader v-bind="args" />',
  }),
  args: {}
};
