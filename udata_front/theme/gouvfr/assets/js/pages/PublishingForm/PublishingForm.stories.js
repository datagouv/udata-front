import { rest } from 'msw';
import PublishingForm from './PublishingForm.vue';

export default {
  title: 'Pages/PublishingForm/Form',
  component: PublishingForm,
};

// 👇 The mocked data that will be used in the story
const TestData = {
  user: {
    userID: 1,
    name: 'Someone',
  },
  document: {
    id: 1,
    userID: 1,
    title: 'Something',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'approved',
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: 'Something',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'approved',
    },
  ],
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
        return res(ctx.json(dataset));
      }),
      rest.post('*/api/1/datasets/:datasetId/upload', async (req, res, ctx) => {
        return res(ctx.json({success: true}));
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
