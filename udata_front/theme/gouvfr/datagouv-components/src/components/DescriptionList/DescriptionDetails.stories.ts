import type { Meta, StoryObj } from '@storybook/vue3';
import DescriptionDetails from './DescriptionDetails.vue';

const meta = {
  title: "Components/Description List/Description Details",
  component: DescriptionDetails,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Description Details is a styled `<dd>` to use in the `<DescriptionList>` component."
      }
    }
  },
} satisfies Meta<typeof DescriptionDetails>;

export default meta;

export const Simple: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DescriptionDetails },
    setup() {
      return { args };
    },
    template: '<dl class="fr-col-2"><DescriptionDetails v-bind="args">Some content inside the description details</DescriptionDetails></dl>',
  }),
  args: {
    withEllipsis: false
  }
};

export const WithEllipsis: StoryObj<typeof meta> = {
    render: (args) => ({
      components: { DescriptionDetails },
      setup() {
        return { args };
      },
      template: '<dl class="fr-col-2"><DescriptionDetails v-bind="args">Some content inside the description details</DescriptionDetails></dl>',
    }),
    args: {
      withEllipsis: true
    }
  };
