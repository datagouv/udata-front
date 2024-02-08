import Step2DescribeOrganization from './Step2DescribeOrganization.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';
//import { user } from '../../config';


export default {
  title: 'Pages/OrganizationPublishingForm/Step2',
  component: Step2DescribeOrganization,
};

const organization = {
  name: "My new organization",
  business_number_id: "89388527700028",
  acronym: "MNO",
  description: "Its has a required description",
  url: "",
};

const args = {
  organization,
  steps: Stepper.StepperOnSecondStep.args.steps,
};

export const Step2 = {
  render: (args) => ({
    components: { Step2DescribeOrganization },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step2DescribeOrganization v-bind="args" />
                </div>`,
  }),
  args,
};
