import { onBeforeUnmount, onMounted, ref } from "vue";
import ThreadCreate from "./ThreadCreate.vue";

export default {
  title: 'Components/Discussions/Internals/ThreadCreate',
  component: ThreadCreate,
};

const args = {
  subjectId: "someId",
  subjectClass: "someClass",
  onSubmit(discussion) {
    return Promise.resolve("resolved");
  },
}

export const DefaultThreadCreate = {
  render: (args) => ({
    components: { ThreadCreate },
    setup() {
      const create = ref();
      let timeoutId;
      onMounted(() => {
        timeoutId = setTimeout(() => create.value.displayForm(), 500);
      });
      onBeforeUnmount(() => clearTimeout(timeoutId));
      return { args, create };
    },
    template: ` <ThreadCreate ref="create" v-bind="args"/>`,
  }),
  args,
};


export const ThreadCreateWithButton = {
  render: (args) => ({
    components: { ThreadCreate },
    setup() {
      return { args };
    },
    template: ` <ThreadCreate v-bind="args"/>`,
  }),
  args: {
    ...args,
    showCreateButton: true,
  },
};
