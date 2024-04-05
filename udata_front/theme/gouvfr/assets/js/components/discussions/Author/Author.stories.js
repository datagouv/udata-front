import Author from "./Author.vue";

export default {
  title: 'Components/Discussions/Internals/Author',
  component: Author,
};

const args = {
  /** @type {import("@etalab/data.gouv.fr-components").User} */
  author: {
    id: "someUserId",
    first_name: "John",
    last_name: "Doe"
  },
  badge: false,
};

export const SimpleAuthor = {
  render: (args) => ({
    components: { Author },
    setup() {
      return { args };
    },
    template: ` <Author v-bind="args"/>`,
  }),
  args,
};

export const AdminAuthor = {
  render: (args) => ({
    components: { Author },
    setup() {
      return { args };
    },
    template: ` <Author v-bind="args"/>`,
  }),
  args: {
    ...args,
    badge: true,
  },
};
