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
  },
};


const userWithAvatarArgs = {
  /** @type {import("@etalab/data.gouv.fr-components").User} */
  user: {
    id: "someUserId",
    first_name: "John",
    last_name: "Doe",
    avatar: "https://dev-static.data.gouv.fr/avatars/0d/aebc1b126b410aa73701fde285dd76-100.jpg",
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
