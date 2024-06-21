import { withActions } from '@storybook/addon-actions/decorator';
import { expect, userEvent, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import { CopyButton } from '.';

const meta = {
  title: "Components/Copy Button",
  component: CopyButton,
  tags: ['autodocs'],
  parameters: {
    actions: {
      handles: ['click button'],
    },
    docs: {
      description: {
        component: "The Copy Button allows user to copy a pre-defined text. It's best placed next to a disabled input or another text content."
      }
    }
  },
  decorators: [withActions],
} satisfies Meta<typeof CopyButton>;

export default meta;

export const Primary: StoryObj<typeof meta> = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Copy text', async () => {
      await userEvent.click(canvas.getByRole("button"));
    });
    const copiedContent = await navigator.clipboard.readText();
    expect(args.text).toBe(copiedContent);
  },
  render: (args) => ({
    components: { CopyButton },
    setup() {
      return { args };
    },
    template: '<CopyButton :text="args.text" />',
  }),
  args: {
    text: "someTextToCopy"
  }
};
