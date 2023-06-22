import Step2DescribeDataset from './Step2DescribeDataset.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';


export default {
  title: 'Pages/PublishingForm/Step2',
  component: Step2DescribeDataset,
};

const args = {
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
