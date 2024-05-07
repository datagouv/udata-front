import type { Meta, StoryObj } from '@storybook/vue3';
import SelectGroup from './SelectGroup.vue';

const meta = {
  title: 'Components/SelectGroup',
  component: SelectGroup,
} satisfies Meta<typeof SelectGroup>;

export default meta;

const args = {
  disabled: false,
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

export const Select: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { SelectGroup },
    setup() {
      return { args };
    },
    template: '<SelectGroup v-bind="args" />',
  }),
  args,
};

export const SelectWithError: StoryObj<typeof meta> = {
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

export const SelectSuccessState: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { SelectGroup },
    setup() {
      return { args };
    },
    template: '<SelectGroup v-bind="args" />',
  }),
  args: {
    ...args,
    isValid: true,
  },
};

export const DisabledSelect: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { SelectGroup },
    setup() {
      return { args };
    },
    template: '<SelectGroup v-bind="args" />',
  }),
  args: {
    ...args,
    disabled: true,
  },
};
