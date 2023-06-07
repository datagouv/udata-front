import InputGroup from './InputGroup.vue';

export default {
  title: 'Components/InputGroup',
  component: InputGroup,
};

const args = {
  errorText: "This field is mandatory.",
  hasError: false,
  hintText: "Select an option to fill this field.",
  isValid: false,
  label: "Your select label",
  required: true,
  validText: "The field is valid !",
};

export const EmptyInput = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args,
};
