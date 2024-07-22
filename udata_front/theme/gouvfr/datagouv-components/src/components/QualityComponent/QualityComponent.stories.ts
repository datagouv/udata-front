import type { Meta, StoryObj } from '@storybook/vue3';
import { QualityComponent } from '.';

const meta = {
  title: "Components/Quality/Quality Component",
  component: QualityComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Quality component displays all important datas about the quality of a dataset."
      }
    }
  },
} satisfies Meta<typeof QualityComponent>;

export default meta;

export const Quality: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { QualityComponent },
    setup() {
      return { args };
    },
    template: '<QualityComponent v-bind="args" />',
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

export const QualityScoreWithoutWarning: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { QualityComponent },
    setup() {
      return { args };
    },
    template: '<QualityComponent v-bind="args" />',
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
    },
    showItemWarnings: false,
  }
};
