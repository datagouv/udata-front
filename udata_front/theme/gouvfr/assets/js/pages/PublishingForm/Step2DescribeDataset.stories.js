import Step2DescribeDataset from './Step2DescribeDataset.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';


export default {
  title: 'Pages/PublishingForm/Step2',
  component: Step2DescribeDataset,
};

/** @type {import("../../types").Dataset} */
const originalDataset = {
  title: "",
  acronym: "",
  description: "",
  tags: null,
  license: "",
  frequency: "",
  temporal_coverage: "",
  last_update: null,
  spatial: {
    zones: "",
    granularity: "",
  }
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
