import UploadModalButton from './UploadModalButton.vue';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Components/UploadModalButton',
  component: UploadModalButton,
  parameters: {
    actions: {
      handles: [
        'click .fr-modal__header fr-btn--close',
        'click .fr-modal__footer button',
        'click .fr-upload-group button[data-fr-js-modal-button]',
      ],
    },
  },
  decorators: [withActions],
} satisfies Meta<typeof UploadModalButton>;

export default meta;

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

export const Upload: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { UploadModalButton },
    setup() {
      return { args };
    },
    template: '<UploadModalButton v-bind="args" />',
  }),
  args,
};


export const UploadDisabled: StoryObj<typeof meta> = {
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

export const UploadHasError: StoryObj<typeof meta> = {
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

export const UploadSuccessState: StoryObj<typeof meta> = {
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

export const UploadMultiple: StoryObj<typeof meta> = {
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
