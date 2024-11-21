import Step4CompleteThePublication from './Step4CompleteThePublication.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';
import * as CardLG from '../../components/dataset/CardLG.stories';
import { Meta, StoryObj } from '@storybook/vue3';
import { Dataset } from '@datagouv/components/ts';


const meta =  {
  title: 'Pages/PublishingForm/Step4',
  component: Step4CompleteThePublication,
} satisfies Meta<typeof Step4CompleteThePublication>;

export default meta;

const originalDataset = CardLG.CardLGWithOrganizationLogo.args.dataset as Dataset;

const args = {
  originalDataset,
  feedbackUrl: "https://demo.data.gouv.fr/fr/datasets/?q=feedback",
  steps: Stepper.StepperOnSecondStep.args.steps,
  redirectDraftUrl: "https://demo.data.gouv.fr/fr/datasets/?q=draft",
};

export const Step4 : StoryObj<typeof meta> = {
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
