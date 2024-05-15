import type { Meta, StoryObj } from '@storybook/vue3';
import RequiredExplanation from './RequiredExplanation.vue';

const meta = {
  title: 'Ui/RequiredExplanation',
  component: RequiredExplanation,
} satisfies Meta<typeof RequiredExplanation>;

export default meta;

export const RequiredExplanationStory: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { RequiredExplanation },
    setup() {
      return { args };
    },
    template: '<RequiredExplanation />',
  }),
  args: {},
};
