import { rest } from 'msw';
import ReusePublishingForm from './ReusePublishingForm.vue';

export default {
  title: 'Pages/ReusePublishingForm/Form',
  component: ReusePublishingForm,
};

const args = {
  redirectDraftUrl: "https://demo.data.gouv.fr/fr/datasets/?q=draft",
};

export const FormWithNoOrganizations = {
  parameters: {
    msw: [
      rest.get('*/api/1/me', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({organizations: []}));
      }),
      rest.post('*/api/1/reuses/', async (req, res, ctx) => {
        /** @type {import("../../types").NewDataset} */
        const body = await req.json();
        /** @type {import("../../types").Dataset} */
        const reuse = {...body, id: "someId", last_update: new Date()};
        console.log(reuse)
        return res(ctx.delay(), ctx.json(reuse));
      }),
      rest.post('*/api/1/reuses/:reuseId/image', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({success: true}));
      }),
    ],
  },
  render: (args) => ({
    components: { ReusePublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <ReusePublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};

export const FormWithOrganizations = {
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
          }
        ]}));
      }),
      rest.post('*/api/1/reuses/', async (req, res, ctx) => {
        /** @type {import("../../types").NewDataset} */
        const body = await req.json();
        /** @type {import("../../types").Dataset} */
        const reuse = {...body, id: "someId", last_update: new Date()};
        console.log(reuse)
        return res(ctx.delay(), ctx.json(reuse));
      }),
      rest.post('*/api/1/reuses/:reuseId/image', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({success: true}));
      }),
    ],
  },
  render: (args) => ({
    components: { ReusePublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <ReusePublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};

export const FormWithFailedRequests = {
  parameters: {
    msw: [
      rest.get('*/api/1/me', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({organizations: []}));
      }),
      rest.post('*/api/1/reuses/', async (req, res, ctx) => {
        /** @type {import("../../types").NewReuse} */
        const body = await req.json();
        /** @type {import("../../types").Reuse} */
        const reuse = {...body, id: "someId", last_update: new Date()};
        return res(ctx.delay(), ctx.json(reuse));
      }),
      rest.post('*/api/1/reuses/:reuseId/image', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.status(400), ctx.json({error: "Chunk size mismatch"}));
      }),
    ],
  },
  render: (args) => ({
    components: { ReusePublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <ReusePublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};
