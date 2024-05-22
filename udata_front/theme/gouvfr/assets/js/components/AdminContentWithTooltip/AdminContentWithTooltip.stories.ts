import type { Meta, StoryObj } from "@storybook/vue3";
import AdminContentWithTooltip from "./AdminContentWithTooltip.vue";

const meta = {
  title: "Admin/AdminContentWithTooltip",
  component: AdminContentWithTooltip,
} satisfies Meta<typeof AdminContentWithTooltip>;

export default meta;

export const ContentWithTooltip: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminContentWithTooltip },
    setup() {
      return { args };
    },
    template: `<AdminContentWithTooltip v-bind="args">Some text with a tooltip shown. The tooltip is placed in the middle of the line because it's a p tag.</AdminContentWithTooltip>`,
  }),
  args: {},
};
