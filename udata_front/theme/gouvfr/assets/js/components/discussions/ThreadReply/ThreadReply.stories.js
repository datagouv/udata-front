import ThreadReply from "./ThreadReply.vue";

export default {
  title: 'Components/Discussions/Internals/ThreadReply',
  component: ThreadReply,
};

const args = {
  onSubmit: (value) => {
    return Promise.resolve(value);
  },
};

export const DefaultReply = {
  render: (args) => ({
    components: { ThreadReply },
    setup() {
      return { args };
    },
    template: ` <ThreadReply v-bind="args"/>`,
  }),
  args,
};

export const ErrorDuringReply = {
  render: (args) => ({
    components: { ThreadReply },
    setup() {
      return { args };
    },
    template: ` <ThreadReply v-bind="args"/>`,
  }),
  args: {
    onSubmit (comment) {
      return Promise.reject("Reject Story");
    }
  },
};
