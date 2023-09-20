import Step4CompleteThePublication from './Step4CompleteThePublication.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';


export default {
  title: 'Pages/PublishingForm/Step4',
  component: Step4CompleteThePublication,
};

/** @type {import("../../types").Dataset} */
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
  owner: {
    first_name: "some user",
    last_name: "some name"
  },
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

export const Step4 = {
  render: (args) => ({
    components: { Step4CompleteThePublication },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step4CompleteThePublication v-bind="args" />
                </div>`,
  }),
  args,
};
