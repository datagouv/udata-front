import type { Meta, StoryObj } from '@storybook/vue3';
import Avatar from "./Avatar.vue";
import type { User } from "../../types/users";

const meta = {
  title: 'Components/Discussions/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

const args = {
  user: {
    id: "someUserId",
    first_name: "John",
    last_name: "Doe"
  } as User,
};


const userWithAvatarArgs = {
  user: {
    id: "someUserId",
    first_name: "John",
    last_name: "Doe",
    avatar: "https://demo-static.data.gouv.fr/avatars/92/6284d057ca4279af35e9b62bc62639-100.png",
    avatar_thumbnail: "https://demo-static.data.gouv.fr/avatars/92/6284d057ca4279af35e9b62bc62639-100.png",
  } as User,
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
