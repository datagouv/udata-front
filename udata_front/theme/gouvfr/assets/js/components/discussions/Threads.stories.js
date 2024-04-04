import Threads from "./Threads.vue";

export default {
  title: 'Components/Discussions',
  component: Threads,
};

const args = {
  subjectId: "5de8f397634f4164071119c5",
  subjectClass: "Dataset",
};

export const DefaultThreads = {
  render: (args) => ({
    components: { Threads },
    setup() {
      return { args };
    },
    template: ` <Threads v-bind="args"/>`,
  }),
  args,
};
