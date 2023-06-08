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
