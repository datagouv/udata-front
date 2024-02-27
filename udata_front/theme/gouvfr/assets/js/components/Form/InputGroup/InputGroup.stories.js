import InputGroup from './InputGroup.vue';

export default {
  title: 'Components/InputGroup',
  component: InputGroup,
};

const args = {
  disabled: false,
  errorText: "This field is mandatory.",
  hasError: false,
  hintText: "Select an option to fill this field.",
  isValid: false,
  label: "Your select label",
  required: true,
  validText: "The field is valid !",
};

export const Input = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args,
};

export const InputWithPlaceholder = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args: {
    ...args,
    placeholder: "A placeholder"
  },
};

export const InputHasError = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args: {
    ...args,
    hasError: true,
  },
};

export const InputWarningState = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args: {
    ...args,
    hasWarning: true,
  },
};

export const InputSuccessState = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args: {
    ...args,
    isValid: true,
  },
};

const textareaArgs = {...args, type: "textarea"}

export const Textarea = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args: textareaArgs,
};

export const TextareaWithPlaceholder = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args: {
    ...textareaArgs,
    placeholder: "Some placeholder"
  },
};

export const TextareaHasError = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args: {
    ...textareaArgs,
    hasError: true,
  },
};

export const TextareaSuccessState = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args: {
    ...textareaArgs,
    isValid: true,
  },
};

export const TextareaWarningState = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args: {
    ...textareaArgs,
    hasWarning: true,
  },
};

