import { rest } from 'msw';
import OrganizationPublishingForm from './OrganizationPublishingForm.vue';
import type { Meta, StoryObj } from "@storybook/vue3";
import { Dataset, NewDataset, Organization } from '@etalab/data.gouv.fr-components';

const meta = {
  title: 'Pages/OrganizationPublishingForm/Form',
  component: OrganizationPublishingForm,
} satisfies Meta<typeof OrganizationPublishingForm>;

export default meta;

const args = {};

export const Form: StoryObj<typeof meta> = {
  parameters: {
    msw: [
      rest.post('*/api/1/organizations/', async (req, res, ctx) => {
        const body: Organization = await req.json();
        const organization: Organization = {...body, id: "someId", last_update: new Date()};
        return res(ctx.delay(), ctx.json(organization));
      }),
      rest.post('*/api/1/organizations/:organizationId/logo', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.status(200), ctx.json({"image": "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png", "success": true}));
      }),
    ],
  },
  render: (args) => ({
    components: { OrganizationPublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <OrganizationPublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};

export const FormWithFailedRequests: StoryObj<typeof meta> = {
  parameters: {
    msw: [
      rest.post('*/api/1/organizations/', async (req, res, ctx) => {
        const body: NewDataset = await req.json();
        const organization: Dataset = {...body, id: "someId", last_update: new Date()};
        return res(ctx.delay(), ctx.json(organization));
      }),
      rest.post('*/api/1/organizations/:organizationId/upload', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.status(400), ctx.json({error: "Chunk size mismatch"}));
      }),
    ],
  },
  render: (args) => ({
    components: { OrganizationPublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <OrganizationPublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};
