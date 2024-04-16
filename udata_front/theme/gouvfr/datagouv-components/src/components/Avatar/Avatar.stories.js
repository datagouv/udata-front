import Avatar from "./Avatar.vue";

export default {
  title: 'Components/Discussions/Avatar',
  component: Avatar,
};

const args = {
  /** @type {import("@etalab/data.gouv.fr-components").User} */
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

export const DefaultIdenticonAvatar = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: ` <Avatar v-bind="args"/>`,
  }),
  args,
};


export const StaticAvatar = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: ` <Avatar v-bind="args"/>`,
  }),
  args: userWithAvatarArgs,
};
