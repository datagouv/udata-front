import { rest } from 'msw';
import PublishingForm from './PublishingForm.vue';

export default {
  title: 'Pages/PublishingForm/Form',
  component: PublishingForm,
};

const args = {
  redirectDraftUrl: "https://demo.data.gouv.fr/fr/datasets/?q=draft",
};

export const Form = {
  parameters: {
    msw: [
      rest.post('*/api/1/datasets/', async (req, res, ctx) => {
        /** @type {import("../../types").NewDataset} */
        const body = await req.json();
        /** @type {import("../../types").Dataset} */
        const dataset = {...body, id: "someId", last_update: new Date()};
        return res(ctx.delay(), ctx.json(dataset));
      }),
      rest.post('*/api/1/datasets/:datasetId/upload', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({success: true}));
      }),
      rest.post('*/api/1/datasets/:datasetId/resources', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({success: true}));
      }),
    ],
  },
  render: (args) => ({
    components: { PublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <PublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};

export const FormWithFailedRequests = {
  parameters: {
    msw: [
      rest.post('*/api/1/datasets/', async (req, res, ctx) => {
        /** @type {import("../../types").NewDataset} */
        const body = await req.json();
        /** @type {import("../../types").Dataset} */
        const dataset = {...body, id: "someId", last_update: new Date()};
        return res(ctx.delay(), ctx.json(dataset));
      }),
      rest.post('*/api/1/datasets/:datasetId/upload', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.status(400), ctx.json({error: "Chunk size mismatch"}));
      }),
      rest.post('*/api/1/datasets/:datasetId/resources', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.status(400, "This endpoint only supports remote resources"));
      }),
    ],
  },
  render: (args) => ({
    components: { PublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <PublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};
