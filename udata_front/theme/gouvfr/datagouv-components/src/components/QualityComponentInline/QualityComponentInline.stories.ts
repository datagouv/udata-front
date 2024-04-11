import type { Meta, StoryObj } from '@storybook/vue3';
import { QualityComponentInline } from '.';

const meta = {
  title: "Components/Quality/Quality Component Inline",
  component: QualityComponentInline,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Quality component inline displays all important datas about the quality of a dataset."
      }
    }
  },
} satisfies Meta<typeof QualityComponentInline>;

export default meta;

export const QualityInline: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { QualityComponentInline },
    setup() {
      return { args };
    },
    template: '<QualityComponentInline v-bind="args" />',
  }),
  args:{
    quality: {
      all_resources_available: false,
      dataset_description_quality: false,
      has_open_format: true,
      has_resources: false,
      license: true,
      resources_documentation: true,
      score: 0.9,
      spatial: true,
      temporal_coverage: true,
      update_frequency: true,
      update_fulfilled_in_time: true,
    }
  } 
};
