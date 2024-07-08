import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/vue3';
import { expect, fn, within, waitFor, userEvent } from '@storybook/test';
import Step1CreateOrJoinOrganization from './Step1CreateOrJoinOrganization.vue';

const meta = {
  title: 'Pages/OrganizationPublishingForm/Step1',
  component: Step1CreateOrJoinOrganization,
  decorators: [withActions],
  args: {
    onStart: fn()
  }
} satisfies Meta<typeof Step1CreateOrJoinOrganization>;

export default meta;

const args = {};

export const Step1: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Step1CreateOrJoinOrganization },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <div class="fr-container">
                    <Step1CreateOrJoinOrganization v-bind="args" />
                  </div>
                </div>`,
  }),
  args,
};

export const Step1WithInteraction: StoryObj<typeof meta> = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByRole('button')).toBeDefined());

    await step('Click', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });

    await waitFor(() => expect(args.onStart).toHaveBeenCalled());
  },
  render: (args) => ({
    components: { Step1CreateOrJoinOrganization },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <div class="fr-container">
                    <Step1CreateOrJoinOrganization v-bind="args" />
                  </div>
                </div>`,
  }),
  args,
};
