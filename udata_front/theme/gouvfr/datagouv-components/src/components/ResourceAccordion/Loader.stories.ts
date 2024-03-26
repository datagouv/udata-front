import type { Meta, StoryObj } from '@storybook/vue3';
import Loader from './Loader.vue';

const meta = {
  title: "Components/Resource/Internals/Loader",
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Loader is shown while resources are loading."
      }
    }
  },
} satisfies Meta<typeof Loader>;

export default meta;

export const ResourceLoader: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Loader },
    setup() {
      return { args };
    },
    template: '<Loader v-bind="args" />',
  }),
  args: {}
};
