import type { Meta, StoryObj } from '@storybook/vue3';
import { QualityItemWarning } from '.';

const meta = {
  title: "Components/Quality/Internals/Quality Item Warning",
  component: QualityItemWarning,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Quality Item Warning, mostly used as a part of the Quality Component, is displayed according to a boolean."
      }
    }
  },
} satisfies Meta<typeof QualityItemWarning>;

export default meta;

export const QualityWarning: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { QualityItemWarning },
    setup() {
      return { args };
    },
    template: '<QualityItemWarning v-bind="args" />',
  }),
  args:{
    qualityItem: false,
    message: "This is a warning",
  } 
};

