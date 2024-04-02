import type { Meta, StoryObj } from '@storybook/vue3';
import DescriptionTerm from './DescriptionTerm.vue';

const meta = {
  title: "Components/Description List/Description Term",
  component: DescriptionTerm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Description Term is a styled `<dt>` to use in the `<DescriptionList>` component."
      }
    }
  },
} satisfies Meta<typeof DescriptionTerm>;

export default meta;

export const Simple: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DescriptionTerm },
    setup() {
      return { args };
    },
    template: '<dl class="fr-col-2"><DescriptionTerm v-bind="args">The term</DescriptionTerm></dl>',
  }),
  args: {}
};
