import { withActions } from '@storybook/addon-actions/decorator';
import { expect, fn, screen, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import ImageModalButton from './ImageModalButton.vue';

const meta = {
  title: 'Components/MarkdownEditor/Internals/ImageModalButton',
  component: ImageModalButton,
  decorators: [
    withActions,
    (story, ctx) => {
      return {
        components: { story },
        template: `<div style="width: 1200px; height: 800px;"><story /></div>`,
      };
    },
  ],
  args: {
    onSend: fn()
  },
} satisfies Meta<typeof ImageModalButton>;

export default meta;

const args = {};

export const DefaultImageModalButton: StoryObj<typeof meta> = {
  play: async ({ args, step }) => {
    const link = "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a.jpeg";

    await step('Click on button', async () => {
      await userEvent.click(screen.getByTestId("image-modal-button"));
    });

    await step('Type a link', async () => {
      await userEvent.type(screen.getByPlaceholderText("Paste your link..."), link);
    });
    await step('Click on button "add image"', async () => {
      await userEvent.click(screen.getByTestId("add-image-button"));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await waitFor(() => expect(args.onSend).toHaveBeenCalledWith({
        src: link,
        title: "",
        alt: "",
      }), {
        timeout: 5000,
      });
    });

  },
  render: (args) => ({
    components: { ImageModalButton },
    setup() {
      return { args };
    },
    template: '<ImageModalButton v-bind="args" />',
  }),
  args,
};
