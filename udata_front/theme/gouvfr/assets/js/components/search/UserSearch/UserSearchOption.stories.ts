import { Meta, StoryObj } from "@storybook/vue3";
import UserSearchOption from "./UserSearchOption.vue";
import * as AvatarStories from "../../discussions/Avatar/Avatar.stories";

const meta = {
  title: 'Components/UserSearch/UserSearchOption',
  component: UserSearchOption,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The User Search Option component, part of the User Search component, is the display of one user with its name and avatar."
      }
    }
  },
} satisfies Meta<typeof UserSearchOption>;

export default meta;

export const DefaultUserSearchOption: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { UserSearchOption },
    setup() {
      return { args };
    },
    template: `<UserSearchOption v-bind="args" />`
  }),
  args: {
    user: AvatarStories.DefaultIdenticonAvatar.args.user
  },
};
