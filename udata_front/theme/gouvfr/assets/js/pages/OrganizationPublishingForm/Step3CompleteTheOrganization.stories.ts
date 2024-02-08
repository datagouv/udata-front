import Step3CompleteTheOrganization from './Step3CompleteTheOrganization.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';
import * as Step2 from './Step2DescribeOrganization.stories';


export default {
  title: 'Pages/OrganizationPublishingForm/Step3',
  component: Step3CompleteTheOrganization,
};

const organization = Step2.Step2.args.organization;

const args = {
  organization,
  feedbackUrl: "https://demo.data.gouv.fr/fr/datasets/?q=feedback",
  steps: Stepper.StepperOnSecondStep.args.steps,
  redirectDraftUrl: "https://demo.data.gouv.fr/fr/datasets/?q=draft",
};

export const Step3 = {
  render: (args) => ({
    components: { Step3CompleteTheOrganization },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step3CompleteTheOrganization v-bind="args" />
                </div>`,
  }),
  args,
};
