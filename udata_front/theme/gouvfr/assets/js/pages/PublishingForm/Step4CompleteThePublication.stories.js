import Step4CompleteThePublication from './Step4CompleteThePublication.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';
import * as Step2 from './Step2DescribeDataset.stories';


export default {
  title: 'Pages/PublishingForm/Step4',
  component: Step4CompleteThePublication,
};

const originalDataset = Step2.Step2.args.originalDataset;

const args = {
  originalDataset,
  feedbackUrl: "https://demo.data.gouv.fr/fr/datasets/?q=feedback",
  steps: Stepper.StepperOnSecondStep.args.steps,
  redirectDraftUrl: "https://demo.data.gouv.fr/fr/datasets/?q=draft",
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
