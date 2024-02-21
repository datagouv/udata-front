import type { Meta, StoryObj } from '@storybook/vue3';
import type { Organization } from '../../types';
import Step2DescribeOrganization from './Step2DescribeOrganization.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';
//import { user } from '../../config';


const meta = {
  title: 'Pages/OrganizationPublishingForm/Step2',
  component: Step2DescribeOrganization,
} satisfies Meta<typeof Step2DescribeOrganization>;

export default meta;

const organization: Organization = {
  name: "My new organization",
  business_number_id: "89388527700028",
  acronym: "MNO",
  description: "Its has a required description",
  url: "",
  id: "",
  badges: [],
  created_at: "",
  last_modified: "",
  last_update: "",
  logo: "",
  logo_thumbnail: "",
  page: "",
  deleted: "",
  members: [],
  metrics: {
    datasets: 0,
    followers: 0,
    members: 0,
    reuses: 0,
    views: 0
  },
  slug: "",
  uri: ""
};

const args = {
  organization,
  steps: Stepper.StepperOnSecondStep.args.steps,
  errors: []
};

export const Step2: StoryObj<typeof meta> = {
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
