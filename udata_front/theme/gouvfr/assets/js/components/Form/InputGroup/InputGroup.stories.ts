import { withActions } from '@storybook/addon-actions/decorator';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import InputGroup, { InputGroupProps } from './InputGroup.vue';

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
  decorators: [withActions],
  args: {
    onChange: fn(),
  }
} satisfies Meta<typeof InputGroup>;

export default meta;

const args: InputGroupProps = {
  disabled: false,
  errorText: "This field is mandatory.",
  hasError: false,
  hintText: "Type something to fill this field.",
  isValid: false,
  label: "Your input label",
  required: true,
  validText: "The field is valid !",
};

export const Input: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args,
};

export const InputWithPlaceholder: StoryObj<typeof meta> = {
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

export const InputHasError: StoryObj<typeof meta> = {
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

export const InputWarningState: StoryObj<typeof meta> = {
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

export const InputSuccessState: StoryObj<typeof meta> = {
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

const textareaArgs: InputGroupProps = {...args, type: "textarea"};

export const Textarea: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args: textareaArgs,
};

export const TextareaWithPlaceholder: StoryObj<typeof meta> = {
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

export const TextareaHasError: StoryObj<typeof meta> = {
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

export const TextareaSuccessState: StoryObj<typeof meta> = {
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

export const TextareaWarningState: StoryObj<typeof meta> = {
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

const markdownArgs: InputGroupProps = {...args, type: "markdown"};

export const MarkdownInput: StoryObj<typeof meta> = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByTestId("markdown-editor")).toBeDefined());

    await step('Type something', async () => {
      await userEvent.type(canvas.getByTestId("markdown-editor"), 'Type something');
    });

    await waitFor(() => expect(args.onChange).toHaveBeenCalled());
  },
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args: markdownArgs,
};

export const DisabledMarkdownInput: StoryObj<typeof meta> = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByTestId("markdown-editor")).toBeDefined());

    await step('Type something', async () => {
      await userEvent.type(canvas.getByTestId("markdown-editor"), 'Type something');
    });

    await waitFor(() => expect(args.onChange).not.toHaveBeenCalled());
  },
  render: (args) => ({
    components: { InputGroup },
    setup() {
      return { args };
    },
    template: '<InputGroup v-bind="args" />',
  }),
  args: {
    ...markdownArgs,
    disabled: true,
  },
};

