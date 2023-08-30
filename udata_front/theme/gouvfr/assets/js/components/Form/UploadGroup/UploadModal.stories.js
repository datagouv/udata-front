import UploadModal from './UploadModal.vue';

export default {
  title: 'Components/UploadModal',
  component: UploadModal,
};

const args = {
  id: "someId",
  multiple: false,
  class: "fr-modal--opened"
};

export const Upload = {
  render: (args) => ({
    components: { UploadModal },
    setup() {
      return { args };
    },
    template: '<UploadModal v-bind="args" />',
  }),
  args,
};

export const UploadMultiple = {
  render: (args) => ({
    components: { UploadModal },
    setup() {
      return { args };
    },
    template: '<UploadModal v-bind="args" />',
  }),
  args: {
    ...args,
    multiple: true,
  },
};
