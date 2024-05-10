import type { Meta, StoryObj } from '@storybook/vue3';
import { QualityScore } from '.';

const meta = {
  title: "Components/Quality/Internals/Quality Score",
  component: QualityScore,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Quality Score displays a score on a meter."
      }
    }
  },
} satisfies Meta<typeof QualityScore>;

export default meta;

export const HighScore: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { QualityScore },
    setup() {
      return { args };
    },
    template: '<QualityScore v-bind="args" />',
  }),
  args:{
    score: 1
  } 
};

export const LowScore: StoryObj<typeof meta> = {
    render: (args) => ({
      components: { QualityScore },
      setup() {
        return { args };
      },
      template: '<QualityScore v-bind="args" />',
    }),
    args:{
      score: 0.3
    } 
  };
