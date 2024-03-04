import Step1DescribeReuse from './Step1DescribeReuse.vue';
import * as Stepper from '../../components/Form/Stepper/StepperReuse.stories';


export default {
  title: 'Pages/ReusePublishingForm/Step1',
  component: Step1DescribeReuse,
};

const args = {
  steps: Stepper.StepperOnFirstStep.args.steps,
};

export const Step1 = {
  render: (args) => ({
    components: { Step1DescribeReuse },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step1DescribeReuse v-bind="args" />
                </div>`,
  }),
  args,
};
