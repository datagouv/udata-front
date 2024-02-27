import type { Meta, StoryObj } from '@storybook/vue3';
import { withActions } from '@storybook/addon-actions/decorator';
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
  render: (args) => ({
    components: { CopyButton },
    setup() {
      return { args };
    },
    template: '<CopyButton :text="args.text" />',
  }),
  args: {
    text: "someTextToCopy"
  },
  parameters: {
    title: "Copy Button"
  }
};
