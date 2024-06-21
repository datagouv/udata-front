import { withActions } from '@storybook/addon-actions/decorator';
import { expect, fn, screen, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import ImageModal, { type ImageModalProps } from './ImageModal.vue';

const meta = {
  title: 'Components/MarkdownEditor/Internals/ImageModal',
  component: ImageModal,
  decorators: [withActions],
  args: {
    onSendModal: fn(),
  }
} satisfies Meta<typeof ImageModal>;

export default meta;

const args: ImageModalProps = {
  id: "someId",
};

export const SimpleImageModal = {
  play: async ({ args, step }) => {
    const link = "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a.jpeg";
    await step('Type a link', async () => {
      await userEvent.type(screen.getByPlaceholderText("Paste your link..."), link);
    });

    await step('Add image', async () => {
      await userEvent.click(screen.getByTestId("add-image-button"));
    });

    await waitFor(() => expect(args.onSendModal).toHaveBeenCalledWith({
      src: link,
      title: "",
      alt: "",
    }));
  },
  render: (args) => ({
    components: { ImageModal },
    setup() {
      return { args };
    },
    template: ` <ImageModal class="fr-modal--opened" v-bind="args">
                </ImageModal>`,
  }),
  args,
} satisfies  StoryObj<typeof meta>;


export const SimpleImageModalWithAllFieldsFilled = {
  play: async ({ args, step }) => {
    const link = "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a.jpeg";
    const alt = "data.gouv.fr";
    const title = "Data.gouv.fr logo";
    await step('Type a link', async () => {
      await userEvent.type(screen.getByPlaceholderText("Paste your link..."), link);
    });

    await step('Change accessibility fields', async () => {
      await userEvent.click(screen.getByTestId("summary"));
      await userEvent.type(screen.getByLabelText("Image alternative text"), alt);
      await userEvent.type(screen.getByLabelText("Image title"), title);
    });

    await step('Add image', async () => {
      await userEvent.click(screen.getByTestId("add-image-button"));
    });

    await waitFor(() => expect(args.onSendModal).toHaveBeenCalledWith({
      src: link,
      title,
      alt,
    }));
  },
  render: (args) => ({
    components: { ImageModal },
    setup() {
      return { args };
    },
    template: ` <ImageModal class="fr-modal--opened" v-bind="args">
                </ImageModal>`,
  }),
  args,
} satisfies  StoryObj<typeof meta>;
