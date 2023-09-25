import UploadModalButton from './UploadModalButton.vue';
import UploadModalStories from "./UploadModal.stories";
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'Components/UploadModalButton',
  component: UploadModalButton,
  parameters: {
    actions: {
      handles: [
        ...UploadModalStories.parameters.actions.handles,
        'click .fr-upload-group button[data-fr-js-modal-button]',
      ],
    },
  },
  decorators: [withActions],
};

const args = {
  disabled: false,
  errorText: "This field is mandatory.",
  hasError: false,
  isValid: false,
  label: "Add files",
  multiple: false,
  required: true,
  validText: "The field is valid !",
};

export const Upload = {
  render: (args) => ({
    components: { UploadModalButton },
    setup() {
      return { args };
    },
    template: '<UploadModalButton v-bind="args" />',
  }),
  args,
};


export const UploadDisabled = {
  render: (args) => ({
    components: { UploadModalButton },
    setup() {
      return { args };
    },
    template: '<UploadModalButton v-bind="args" />',
  }),
  args: {
    ...args,
    disabled: true,
  },
};

export const UploadHasError = {
  render: (args) => ({
    components: { UploadModalButton },
    setup() {
      return { args };
    },
    template: '<UploadModalButton v-bind="args" />',
  }),
  args: {
    ...args,
    hasError: true,
  },
};

export const UploadSuccessState = {
  render: (args) => ({
    components: { UploadModalButton },
    setup() {
      return { args };
    },
    template: '<UploadModalButton v-bind="args" />',
  }),
  args: {
    ...args,
    isValid: true,
  },
};

export const UploadMultiple = {
  render: (args) => ({
    components: { UploadModalButton },
    setup() {
      return { args };
    },
    template: '<UploadModalButton v-bind="args" />',
  }),
  args: {
    ...args,
    multiple: true,
  },
};
