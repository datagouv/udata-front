import DeleteButton from "./DeleteButton.vue";
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: 'Buttons/Delete Button',
  component: DeleteButton,
  parameters: {
    actions: {
      handles: ['click a'],
    },
  },
  decorators: [withActions],
} satisfies Meta<typeof DeleteButton>;

export default meta;

/**
 * #### Delete Button
 * A button to delete something
 */
export const DefaultDeleteButton: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DeleteButton },
    setup() {
      return { args };
    },
    template: '<DeleteButton v-bind="args"/>',
  }),
  args: {
    url: "http://someUrl"
  },
};
