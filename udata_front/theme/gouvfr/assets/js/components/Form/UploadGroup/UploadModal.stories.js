import UploadModal from './UploadModal.vue';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'Components/UploadModalButton/Internals/UploadModal',
  component: UploadModal,
  parameters: {
    actions: {
      handles: [
        'click .fr-modal__header fr-btn--close',
        'click .fr-modal__footer button',
      ],
    },
  },
  decorators: [withActions],
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
