import ThreadReply from "./ThreadReply.vue";

export default {
  title: 'Internals/Discussions/ThreadReply',
  component: ThreadReply,
};

const args = {
  onSubmit: (value) => {
    console.log(value);
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
      console.log(comment);
      return Promise.reject("Reject Story");
    }
  },
};
