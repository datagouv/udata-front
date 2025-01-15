import type { Meta, StoryObj } from '@storybook/vue3';
import { Placeholder } from ".";

const meta = {
  title: 'utils/Placeholder',
  component: Placeholder,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "A very simple component that takes a `type` (dataset, reuse, post...) and an optional `src`. If `src` is defined, it simply displays the image (and all props passed are passed to the image). However, if `src` is undefined, it falls back to a placeholder. Don't forget to pass the `alt` prop !"
      }
    }
  },
} satisfies Meta<typeof Placeholder>;

export default meta;

export const PlaceholderWithDataset: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Placeholder },
    setup() {
      return { args };
    },
    template: `<Placeholder v-bind="args" max-height="" />`,
  }),
  args: {
    size: 50,
    type: "dataset",
    alt: "Dataset placeholder"
  },
};

export const PlaceholderWithOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Placeholder },
    setup() {
      return { args };
    },
    template: `<Placeholder v-bind="args" max-height="" />`,
  }),
  args: {
    size: 50,
    type: "organization",
    alt: "Organization placeholder"
  },
};

export const PlaceholderWithLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Placeholder },
    setup() {
      return { args };
    },
    template: `<Placeholder v-bind="args" max-height="" />`,
  }),
  args: {
    size: 50,
    src: "https://demo-static.data.gouv.fr/avatars/92/6284d057ca4279af35e9b62bc62639-100.png",
    type: "organization",
    alt: "Meteo France logo"
  },
};
