import type { Meta, StoryObj } from "@storybook/vue3";
import Avatar, {type AvatarProps} from "./Avatar.vue";

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

const args : AvatarProps = {
  user: {
    id: "someUserId",
    first_name: "John",
    last_name: "Doe",
    page: "https://www.dev.data.gouv.fr",
  },
};


const userWithAvatarArgs: AvatarProps = {
  user: {
    id: "someUserId",
    first_name: "John",
    last_name: "Doe",
    avatar: "https://dev-static.data.gouv.fr/avatars/0d/aebc1b126b410aa73701fde285dd76-100.jpg",
    page: "https://www.dev.data.gouv.fr",
  },
};

export const DefaultIdenticonAvatar: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: ` <Avatar v-bind="args"/>`,
  }),
  args,
};


export const StaticAvatar: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: ` <Avatar v-bind="args"/>`,
  }),
  args: userWithAvatarArgs,
};
