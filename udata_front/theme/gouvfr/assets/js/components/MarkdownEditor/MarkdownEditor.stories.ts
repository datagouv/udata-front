import { withActions } from '@storybook/addon-actions/decorator';
import { expect } from '@storybook/test';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import type { Meta, StoryObj } from '@storybook/vue3';
import MarkdownEditor from './MarkdownEditor.vue';
import { MarkdownEditorProps } from './types';

const meta = {
  title: 'Components/MarkdownEditor',
  component: MarkdownEditor,
  decorators: [withActions],
  argTypes: {
    onChange: { action: true },
    onEditorMounted: { action: true },
  }
} satisfies Meta<typeof MarkdownEditor>;

export default meta;

const args: MarkdownEditorProps = {
  id: "someId",
  value: "",
};

export const SimpleMarkdownEditor = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await waitFor(() => expect(args.onEditorMounted).toHaveBeenCalled());

    await step('Type something', async () => {
      await userEvent.type(canvas.getByTestId("markdown-editor"), 'Type something');
    });

    await waitFor(() => expect(args.onChange).toHaveBeenCalled());
  },
  render: (args) => ({
    components: { MarkdownEditor },
    setup() {
      return { args };
    },
    template: ` <MarkdownEditor v-bind="args">
                </MarkdownEditor>`,
  }),
  args,
} satisfies  StoryObj<typeof meta>;
