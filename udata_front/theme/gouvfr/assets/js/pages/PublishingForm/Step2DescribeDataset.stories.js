import Step2DescribeDataset from './Step2DescribeDataset.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';
import { user } from '../../config';


export default {
  title: 'Pages/PublishingForm/Step2',
  component: Step2DescribeDataset,
};

const originalDataset = {
  title: "My new dataset",
  archived: false,
  private: false,
  page: "",
  acronym: "",
  description: "Its has a required description",
  tags: null,
  license: "",
  frequency: "punctual",
  temporal_coverage: "",
  last_update: new Date(),
  spatial: {
    zones: "",
    granularity: "",
  },
  owner: user,
  quality: {
    all_resources_available: true,
    dataset_description_quality: true,
    has_open_format: true,
    has_resources: true,
    license: true,
    resources_documentation: true,
    score: 1,
    spatial: true,
    temporal_coverage: true,
    update_frequency: true,
    update_fulfilled_in_time: true,
  },
};

const args = {
  originalDataset,
  steps: Stepper.StepperOnSecondStep.args.steps,
};

export const Step2 = {
  render: (args) => ({
    components: { Step2DescribeDataset },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step2DescribeDataset v-bind="args" />
                </div>`,
  }),
  args,
};
