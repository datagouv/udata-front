import DeleteUserButton from "./DeleteUserButton.vue";
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: 'Buttons/Delete Button',
  component: DeleteUserButton,
  parameters: {
    actions: {
      handles: ['click a'],
    },
  },
  decorators: [withActions],
} satisfies Meta<typeof DeleteUserButton>;

export default meta;

/**
 * #### Delete Button
 * A button to delete something
 */
export const DefaultDeleteUserButton: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DeleteUserButton },
    setup() {
      return { args };
    },
    template: '<DeleteUserButton v-bind="args"/>',
  }),
  args: {
    url: "http://someUrl"
  },
};
