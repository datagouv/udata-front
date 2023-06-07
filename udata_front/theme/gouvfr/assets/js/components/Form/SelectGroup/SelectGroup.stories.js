import SelectGroup from './SelectGroup.vue';

export default {
  title: 'Components/SelectGroup',
  component: SelectGroup,
};

const args = {
  errorText: "This field is mandatory.",
  hasError: false,
  hintText: "Select an option to fill this field.",
  isValid: false,
  label: "Your select label",
  options: [
    {"label": "Option 1", "value": "1"},
    {"label": "Option 2", "value": "2"},
  ],
  required: true,
  validText: "The field is valid !",
};

export const EmptySelect = {
  render: (args) => ({
    components: { SelectGroup },
    setup() {
      return { args };
    },
    template: '<SelectGroup v-bind="args" />',
  }),
  args,
};

export const SelectInError = {
  render: (args) => ({
    components: { SelectGroup },
    setup() {
      return { args };
    },
    template: '<SelectGroup v-bind="args" />',
  }),
  args: {
    ...args,
    hasError: true,
  },
};
