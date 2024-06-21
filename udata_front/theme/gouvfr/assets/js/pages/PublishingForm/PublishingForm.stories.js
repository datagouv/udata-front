import { delay, http, HttpResponse } from 'msw';
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
      http.post('*/api/1/datasets/', async ({ request }) => {
        /** @type {import("../../types").NewDataset} */
        const body = await request.json();
        /** @type {import("../../types").Dataset} */
        const dataset = {...body, id: "someId", last_update: new Date()};
        await delay();
        return HttpResponse.json(dataset);
      }),
      http.post('*/api/1/datasets/:datasetId/upload', async () => {
        await delay();
        return HttpResponse.json({ success: true });
      }),
      http.post('*/api/1/datasets/:datasetId/resources', async () => {
        await delay();
        return HttpResponse.json({ success: true });
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
      http.post('*/api/1/datasets/', async ({ request }) => {
        /** @type {import("../../types").NewDataset} */
        const body = await request.json();
        /** @type {import("../../types").Dataset} */
        const dataset = {...body, id: "someId", last_update: new Date()};
        await delay();
        return HttpResponse.json(dataset);
      }),
      http.post('*/api/1/datasets/:datasetId/upload', async () => {
        await delay();
        return HttpResponse.json({ error: "Chunk size mismatch" }, {
          status: 400,
        });
      }),
      http.post('*/api/1/datasets/:datasetId/resources', async () => {
        await delay();
        return new HttpResponse.json({}, {
          status: 400,
          statusText: "This endpoint only supports remote resources",
        });
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
