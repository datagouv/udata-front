import { rest } from 'msw';
import OrganizationPublishingForm from './OrganizationPublishingForm.vue';

export default {
  title: 'Pages/OrganizationPublishingForm/Form',
  component: OrganizationPublishingForm,
};

const args = {
  redirectDraftUrl: "https://demo.data.gouv.fr/fr/datasets/?q=draft",
};

export const Form = {
  parameters: {
    msw: [
      rest.post('*/api/1/organizations/', async (req, res, ctx) => {
        /** @type {import("../../types").Organization} */
        const body = await req.json();
        /** @type {import("../../types").Organization} */
        const organization = {...body, id: "someId", last_update: new Date()};
        return res(ctx.delay(), ctx.json(organization));
      }),
      rest.post('*/api/1/organizations/:organizationId/logo', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.status(200), ctx.json({"image": "https://picsum.photos/200", "success": true}));
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

export const FormWithFailedRequests = {
  parameters: {
    msw: [
      rest.post('*/api/1/organizations/', async (req, res, ctx) => {
        /** @type {import("../../types").NewDataset} */
        const body = await req.json();
        /** @type {import("../../types").Dataset} */
        const organization = {...body, id: "someId", last_update: new Date()};
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
