import Step1CreateOrJoinOrganization from './Step1CreateOrJoinOrganization.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';


export default {
  title: 'Pages/OrganizationPublishingForm/Step1',
  component: Step1CreateOrJoinOrganization,
};

const args = {
  steps: Stepper.StepperOnFirstStep.args.steps,
};

export const Step1 = {
  render: (args) => ({
    components: { Step1CreateOrJoinOrganization },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step1CreateOrJoinOrganization v-bind="args" />
                </div>`,
  }),
  args,
};

