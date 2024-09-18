import type { Meta, StoryObj } from "@storybook/vue3";
import Tooltip from "./Tooltip.vue";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;

export const SimpleTooltip: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: ` <Tooltip>
                  Some text with a tooltip shown. The tooltip is placed in the middle of the line because it's a p tag.
                  <template #tooltip>Some text to show in a tooltip.</template>
                </Tooltip>`,
  }),
  args: {},
};
