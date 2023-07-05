import Step3AddFiles from './Step3AddFiles.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';


export default {
  title: 'Pages/PublishingForm/Step3',
  component: Step3AddFiles,
};

const args = {
  steps: Stepper.StepperOnSecondStep.args.steps,
};

export const Step3 = {
  render: (args) => ({
    components: { Step3AddFiles },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step3AddFiles v-bind="args" />
                </div>`,
  }),
  args,
};
