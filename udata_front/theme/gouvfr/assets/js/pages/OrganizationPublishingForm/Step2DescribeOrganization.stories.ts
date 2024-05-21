import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/vue3';
import { within, waitFor, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import type { NewOrganization } from "@etalab/data.gouv.fr-components";
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

const organization: NewOrganization = {
  name: "",
  business_number_id: "",
  acronym: "",
  description: "",
  url: "",
  logo: "",
  logo_thumbnail: "",
  page: "",
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
