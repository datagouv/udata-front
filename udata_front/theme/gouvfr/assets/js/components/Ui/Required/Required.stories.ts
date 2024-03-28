import type { Meta, StoryObj } from '@storybook/vue3';
import Required from './Required.vue';

const meta = {
  title: 'Ui/Required',
  component: Required,
} satisfies Meta<typeof Required>;

export default meta;

export const RequiredLabel: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Required },
    setup() {
      return { args };
    },
    template: '<label>Label for a required field<Required v-bind="args" /></label>',
  }),
  args: {
    required: true,
  },
};

export const NonRequiredLabel: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Required },
    setup() {
      return { args };
    },
    template: '<label>Label for a non required field<Required v-bind="args" /></label>',
  }),
  args: {
    required: false,
  },
};
