import type { Meta, StoryObj } from '@storybook/vue3';
import { AppLink } from ".";

const meta = {
  title: 'Components/AppLink',
  component: AppLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The AppLink blablabla."
      }
    }
  },
} satisfies Meta<typeof AppLink>;

export default meta;

const args = {};

export const SimpleAppLink: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AppLink },
    setup() {
      return { args };
    },
    template: `<AppLink v-bind="args"/>`,
  }),
  args,
};
