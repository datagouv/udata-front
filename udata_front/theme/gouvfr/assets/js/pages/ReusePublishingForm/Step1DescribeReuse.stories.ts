import type { Meta, StoryObj } from '@storybook/vue3';
import { rest } from 'msw';
import Step1DescribeReuse from './Step1DescribeReuse.vue';
import * as Stepper from '../../components/Form/Stepper/StepperReuse.stories';

const meta = {
  title: 'Pages/ReusePublishingForm/Step1',
  component: Step1DescribeReuse,
} satisfies Meta<typeof Step1DescribeReuse>;

export default meta;

const args = {
  steps: Stepper.StepperOnFirstStep.args.steps,
  errors: [],
};

export const Step1WithNoOrganizations: StoryObj<typeof meta> = {
  parameters: {
    msw: [
      rest.get('*/api/1/me', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({organizations: []}));
      }),
    ],
  },
  render: (args) => ({
    components: { Step1DescribeReuse },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step1DescribeReuse v-bind="args" />
                </div>`,
  }),
  args,
};

export const Step1WithOrganizations: StoryObj<typeof meta> = {
  parameters: {
    msw: [
      rest.get('*/api/1/me', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({organizations: [
          {
            acronym: null,
            badges: [],
            class: "Organization",
            id: "65e9b7cf830c3b5a515ee4ed",
            logo: "https://picsum.photos/200",
            logo_thumbnail: "https://picsum.photos/200",
            name: "My Organization",
            page: "",
            slug: "my-organization",
            uri: "/"
          },
          {
            acronym: null,
            badges: [],
            class: "Organization",
            id: "65e9b7cf830c3b5a515ee4ed",
            logo: "https://picsum.photos/200",
            logo_thumbnail: "https://picsum.photos/200",
            name: "My Second Organization",
            page: "",
            slug: "my-second-organization",
            uri: "/"
          }
        ]}));
      }),
    ],
  },
  render: (args) => ({
    components: { Step1DescribeReuse },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step1DescribeReuse v-bind="args" />
                </div>`,
  }),
  args,
};
