import UploadGroup from './UploadGroup.vue';

export default {
  title: 'Components/UploadGroup',
  component: UploadGroup,
};

const args = {
  disabled: false,
  errorText: "This field is mandatory.",
  hasError: false,
  hintText: "Select an option to fill this field.",
  isValid: false,
  label: "Your select label",
  multiple: false,
  required: true,
  validText: "The field is valid !",
};

export const Upload = {
  render: (args) => ({
    components: { UploadGroup },
    setup() {
      return { args };
    },
    template: '<UploadGroup v-bind="args" />',
  }),
  args,
};

export const UploadPdfOnly = {
  render: (args) => ({
    components: { UploadGroup },
    setup() {
      return { args };
    },
    template: '<UploadGroup v-bind="args" />',
  }),
  args: {
    ...args,
    accept: ".pdf"
  },
};

export const UploadDisabled = {
  render: (args) => ({
    components: { UploadGroup },
    setup() {
      return { args };
    },
    template: '<UploadGroup v-bind="args" />',
  }),
  args: {
    ...args,
    disabled: true,
  },
};

export const UploadHasError = {
  render: (args) => ({
    components: { UploadGroup },
    setup() {
      return { args };
    },
    template: '<UploadGroup v-bind="args" />',
  }),
  args: {
    ...args,
    hasError: true,
  },
};

export const UploadSuccessState = {
  render: (args) => ({
    components: { UploadGroup },
    setup() {
      return { args };
    },
    template: '<UploadGroup v-bind="args" />',
  }),
  args: {
    ...args,
    isValid: true,
  },
};

export const UploadMultiple = {
  render: (args) => ({
    components: { UploadGroup },
    setup() {
      return { args };
    },
    template: '<UploadGroup v-bind="args" />',
  }),
  args: {
    ...args,
    multiple: true,
  },
};
