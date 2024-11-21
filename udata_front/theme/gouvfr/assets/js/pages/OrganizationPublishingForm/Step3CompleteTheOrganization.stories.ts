import type { Meta, StoryObj } from '@storybook/vue3';
import Step3CompleteTheOrganization from './Step3CompleteTheOrganization.vue';
import * as Step2 from './Step2DescribeOrganization.stories';


const meta = {
  title: 'Pages/OrganizationPublishingForm/Step3',
  component: Step3CompleteTheOrganization,
} satisfies Meta<typeof Step3CompleteTheOrganization>;

export default meta;

const organization = Step2.Step2.args.organization;
organization.logo_thumbnail = "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png";
organization.name = 'My organization';
organization.description = 'This is the provided description'

const args = {
  organization,
  datasetLink: "",
  reuseLink: "",
};

export const Step3: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Step3CompleteTheOrganization },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <div class="fr-container">
                    <Step3CompleteTheOrganization v-bind="args" />
                  </div>
                </div>`,
  }),
  args,
};
