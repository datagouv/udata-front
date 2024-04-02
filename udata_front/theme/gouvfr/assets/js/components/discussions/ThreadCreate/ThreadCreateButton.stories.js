import ThreadCreateButton from "./ThreadCreateButton.vue";

export default {
  title: 'Components/Discussions/Internals/ThreadCreateButton',
  component: ThreadCreateButton,
};

export const DefaultButton = {
  render: (args) => ({
    components: { ThreadCreateButton },
    setup() {
      return { args };
    },
    template: ` <ThreadCreateButton v-bind="args"/>`,
  }),
  args: {},
};


export const PrimaryButton = {
  render: (args) => ({
    components: { ThreadCreateButton },
    setup() {
      return { args };
    },
    template: ` <ThreadCreateButton v-bind="args"/>`,
  }),
  args: {
    primary: true,
  },
};
