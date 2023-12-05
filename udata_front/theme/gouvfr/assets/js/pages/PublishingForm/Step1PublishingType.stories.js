import Step1PublishingType from './Step1PublishingType.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';


export default {
  title: 'Pages/PublishingForm/Step1',
  component: Step1PublishingType,
};

const args = {
  steps: Stepper.StepperOnFirstStep.args.steps,
};

export const Step1 = {
  render: (args) => ({
    components: { Step1PublishingType },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step1PublishingType v-bind="args" />
                </div>`,
  }),
  args,
};
