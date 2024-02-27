import MarkAsNoSpam, { type MarkAsNoSpamProps } from './MarkAsNoSpam.vue';
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: 'Components/MarkAsNoSpam',
  component: MarkAsNoSpam,
} satisfies Meta<typeof MarkAsNoSpam>;

export default meta;

const args: MarkAsNoSpamProps = {
  spam: {
    status: "potential_spam",
  },
  url: "http://dev.local:7000/dataset/123/spam",
};

export const MarkAsNoSpamShown: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { MarkAsNoSpam },
    setup() {
      return { args };
    },
    template: '<MarkAsNoSpam v-bind="args"/>',
  }),
  args,
};
