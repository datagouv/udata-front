import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/vue3';
import { within, waitFor, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Organization } from '../../types';
import Step2DescribeOrganization from './Step2DescribeOrganization.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';


const meta = {
  title: 'Pages/OrganizationPublishingForm/Step2',
  component: Step2DescribeOrganization,
  decorators: [withActions],
  argTypes: {
    onNext: { action: true }
  }
} satisfies Meta<typeof Step2DescribeOrganization>;

export default meta;

const organization: Organization = {
  name: "",
  business_number_id: "",
  acronym: "",
  description: "",
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
  steps: Stepper.StepperOrgaOnSecondStep.args.steps,
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

export const Step2WithInteraction: StoryObj<typeof meta> = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Fill form', async () => {
      await userEvent.type(canvas.getByTestId('nameInput').querySelector('input') as HTMLInputElement, 'My organization');
      await userEvent.type(canvas.getByTestId('siretInput').querySelector('input') as HTMLInputElement, '13002526500013');
      await userEvent.type(canvas.getByTestId('acronymInput').querySelector('input') as HTMLInputElement, 'MYO');
      await userEvent.type(canvas.getByTestId('descriptionInput').querySelector('textarea') as HTMLTextAreaElement, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac mauris faucibus lectus gravida et.');
      await userEvent.type(canvas.getByTestId('websiteInput').querySelector('input') as HTMLInputElement, 'https://data.gouv.fr');
    });

    await userEvent.click(canvas.getByTestId('submitButton'));
    await waitFor(() => expect(args.onNext).toHaveBeenCalled());
  },
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
