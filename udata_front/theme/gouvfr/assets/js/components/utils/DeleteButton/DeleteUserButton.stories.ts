import DeleteUserButton from "./DeleteUserButton.vue";
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: 'Components/Buttons/Delete User Button',
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
    id: "someId",
    full_name: "John Doe",
    avatar_thumbnail: "https://static.data.gouv.fr/avatars/ad/95e60b115a4582b2dcb1eb0ad7e9d3-original.png"
  },
};
